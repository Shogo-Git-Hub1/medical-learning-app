"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Question } from "@/types";
import { useProgressContext } from "@/contexts/ProgressContext";
import { setLastLessonResult } from "@/lib/progress";
import { shuffle, getStableCharacterIndex } from "@/lib/utils";
import { PushButton } from "@/components/ui/PushButton";
import { LightningComboOverlay } from "@/components/LightningComboOverlay";
import { playCorrect, playWrong, playComplete } from "@/lib/sounds";
import { getSessionIntroLine } from "@/data/characters";
import type { CharacterId } from "@/types/characters";
import { getNextLessonAfter, getLessonWithQuestions } from "@/services/lessonService";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizComplete } from "@/components/quiz/QuizComplete";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizExitSheet } from "@/components/quiz/QuizExitSheet";

const ALL_CHARACTER_IDS: CharacterId[] = ["skurun", "regi", "shirin"];

/** `from` クエリパラメータから戻り先 href を決定する（オープンリダイレクト対策あり） */
function resolveBackHref(from: string): string {
  if (!from.startsWith("/")) return "/subjects";
  if (from.startsWith("/subjects")) return from;
  if (from.startsWith("/browse")) return "/browse";
  return "/subjects";
}

type Props = {
  questions: Question[];
  lessonId: string;
  lessonTitle: string;
  lessonLevel?: number;
  /** 戻り先を明示的に指定する場合（指定がなければ ?from= クエリから解決） */
  backHref?: string;
};

export function QuizSession({ questions, lessonId, lessonTitle, lessonLevel = 1, backHref: backHrefProp }: Props) {
  const { recordAnswer, completeLesson } = useProgressContext();
  const searchParams = useSearchParams();
  const backHref = backHrefProp ?? resolveBackHref(searchParams.get("from") ?? "");

  // セッションイントロ（lessonId から決定的にキャラを選び、SSR/クライアントでハイドレーション不一致を防ぐ）
  const introCharacter = useMemo(
    () =>
      ALL_CHARACTER_IDS[
        getStableCharacterIndex(lessonId, ALL_CHARACTER_IDS.length)
      ],
    [lessonId]
  );
  const introLine = useMemo(
    () => getSessionIntroLine(introCharacter, lessonTitle, lessonLevel, questions.length),
    [introCharacter, lessonTitle, lessonLevel, questions.length]
  );
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);

  const skipIntro = () => {
    setIntroFading(true);
    setTimeout(() => setShowIntro(false), 300);
  };

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIntroFading(true), 3200);
    const hideTimer = setTimeout(() => setShowIntro(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // 離脱確認シートの開閉
  const [showExitSheet, setShowExitSheet] = useState(false);

  // 科目ロードマップへのリンク（lessonId から科目を逆引き。見つからなければ backHref にフォールバック）
  const subjectHref = useMemo(() => {
    const subject = getLessonWithQuestions(lessonId)?.lesson.subject;
    return subject ? `/subjects/${subject}` : backHref;
  }, [lessonId, backHref]);

  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  // リトライ時にシャッフルを再実行するためのシード。
  // lessonId のみを依存にしていると再挑戦時に同じ選択肢順になるため、
  // handleRetry でインクリメントして再シャッフルを明示的に発火させる。
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const displayQuestions = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      })),
    // 【重要】questions ではなく lessonId + shuffleSeed を依存にする。
    // questions を依存に含めると、recordAnswer などでコンテキストが更新された際に
    // 親が再レンダーして questions の参照が変わり、セッション途中で再シャッフルが
    // 起きて「選択した瞬間に別の問題が表示される」バグの原因になる。
    // shuffleSeed はリトライ時のみインクリメントされるため安全。
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessonId, shuffleSeed]
  );

  const current = displayQuestions[index];
  const isLast = index === displayQuestions.length - 1;
  const correct = current?.options.find((o) => o.id === current.correctOptionId);
  const isCorrect = selectedId === current?.correctOptionId;

  const getComboFromResults = useCallback((r: boolean[]) => {
    let count = 0;
    for (let i = r.length - 1; i >= 0 && r[i]; i--) count++;
    return count;
  }, []);

  // handleSelect の二重呼び出し（連打など）を防ぐフラグ。
  // フィードバックが非表示になった（次問に進んだ）タイミングでリセットする。
  const isSelectInFlight = useRef(false);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (showFeedback || !current || isSelectInFlight.current) return;
      isSelectInFlight.current = true;
      const correctAnswer = optionId === current.correctOptionId;
      const comboBefore = getComboFromResults(results);
      const comboAfter = correctAnswer ? comboBefore + 1 : 0;
      setSelectedId(optionId);
      setShowFeedback(true);
      setResults((r) => [...r, correctAnswer]);
      if (comboAfter > 0) setMaxCombo((prev) => Math.max(prev, comboAfter));
      recordAnswer(current.id, correctAnswer, comboAfter);
      if (correctAnswer) playCorrect();
      else playWrong();
    },
    [showFeedback, current, results, getComboFromResults, recordAnswer]
  );

  const displayCombo = getComboFromResults(results);
  const [maxCombo, setMaxCombo] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLightningOverlay, setShowLightningOverlay] = useState(false);

  useEffect(() => {
    if (showFeedback && isCorrect && displayCombo >= 5 && displayCombo % 5 === 0) {
      setShowLightningOverlay(true);
      const t = setTimeout(() => setShowLightningOverlay(false), 1200);
      return () => clearTimeout(t);
    } else {
      setShowLightningOverlay(false);
    }
  }, [showFeedback, isCorrect, displayCombo]);

  // handleNext の二重呼び出し（Enterキーリピートなど）を防ぐフラグ。
  // フィードバック非表示になったタイミングで useEffect がリセットする。
  const handleRetry = useCallback(() => {
    setShowCompleted(false);
    setShowConfetti(false);
    setShowLightningOverlay(false);
    setIndex(0);
    setSelectedId(null);
    setShowFeedback(false);
    setResults([]);
    setMaxCombo(0);
    setShuffleSeed((s) => s + 1);
    isNextInFlight.current = false;
    isSelectInFlight.current = false;
  }, []);

  const isNextInFlight = useRef(false);

  const handleNext = useCallback(() => {
    // フィードバック未表示時の誤発火を防ぐ（showFeedback=false のまま次問に進まないよう）
    if (!showFeedback) return;
    if (isNextInFlight.current) return;
    isNextInFlight.current = true;
    if (isLast) {
      // results には handleSelect 時点で最終回答が追加済みのため + (isCorrect ? 1 : 0) は不要
      const correctCount = results.filter(Boolean).length;
      const accuracy = displayQuestions.length > 0 ? correctCount / displayQuestions.length : 0;
      setLastLessonResult(lessonId, accuracy);
      completeLesson(lessonId);
      setShowCompleted(true);
      setShowConfetti(true);
      playComplete();
    } else {
      setIndex((i) => i + 1);
      setSelectedId(null);
      setShowFeedback(false);
    }
  }, [showFeedback, isLast, results, displayQuestions.length, lessonId, completeLesson]);

  const questionRegionRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!current) return;
    questionRegionRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    // フィードバックが消えたら（次問に進んだら）両ロックを解除する
    if (!showFeedback) {
      isNextInFlight.current = false;
      isSelectInFlight.current = false;
    }
  }, [showFeedback]);

  useEffect(() => {
    if (!showFeedback) return;
    // requestAnimationFrame で 1 フレーム遅延させることで、
    // 選択肢を押したキーイベント（Enter/Space）のバブルが完全に解決してから
    // "次へ"ボタンにフォーカスを移す。これにより、キー押しっぱなしリピートで
    // 即座に "次へ" が発火するのを防ぐ。
    const raf = requestAnimationFrame(() => {
      nextButtonRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [showFeedback, index, results.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!current) return;
      if (e.key === "Enter" && showFeedback) {
        // "次へ"ボタン自身の Enter キーはブラウザのネイティブ click で処理済み。
        // バブルアップによる handleNext の二重呼び出しを防ぐ。
        if ((e.target as Element) === nextButtonRef.current) return;
        e.preventDefault();
        handleNext();
        return;
      }
      if (!showFeedback && ["1", "2", "3", "4"].includes(e.key)) {
        const optionIndex = Number(e.key) - 1;
        if (optionIndex < current.options.length) {
          e.preventDefault();
          handleSelect(current.options[optionIndex].id);
        }
      }
    },
    [current, showFeedback, handleNext, handleSelect]
  );

  // ─── 完了画面 ─────────────────────────────────────────────────────────
  if (showCompleted) {
    const correctCount = results.filter(Boolean).length;
    const total = displayQuestions.length;
    const isGoodScore = total > 0 && correctCount >= total * 0.8;
    return (
      <QuizComplete
        lessonTitle={lessonTitle}
        lessonId={lessonId}
        correctCount={correctCount}
        total={total}
        isGoodScore={isGoodScore}
        showConfetti={showConfetti}
        nextLesson={getNextLessonAfter(lessonId)}
        maxCombo={maxCombo}
        onRetry={handleRetry}
      />
    );
  }

  // ─── 問題なし ─────────────────────────────────────────────────────────
  if (displayQuestions.length === 0) {
    return (
      <div className="neu-inset rounded-2xl p-8 text-center">
        <p className="font-mono text-sm text-pastel-ink/50">{"// このレッスンには問題がありません"}</p>
        <PushButton href="/subjects" variant="primary" className="mt-6">
          科目一覧に戻る
        </PushButton>
      </div>
    );
  }

  // ─── × ボタン（イントロ・問題両フェーズ共通） ─────────────────────────
  const CloseButton = (
    <button
      type="button"
      aria-label="レッスンを終了する"
      onClick={() => setShowExitSheet(true)}
      className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150 active:scale-95"
      style={{
        background: "rgba(0,0,0,0.07)",
        color: "rgba(0,0,0,0.38)",
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );

  // ─── イントロ画面 ─────────────────────────────────────────────────────
  if (showIntro) {
    return (
      <>
        <div className="space-y-4 animate-fade-in-up">
          {/* イントロヘッダー：×ボタン + レッスンタイトル */}
          <div className="flex items-center gap-3 pt-1">
            {CloseButton}
            <span
              className="text-sm font-bold font-nunito truncate"
              style={{ color: "rgba(0,0,0,0.28)" }}
            >
              {lessonTitle}
            </span>
          </div>

          <QuizIntro
            introCharacter={introCharacter}
            introLine={introLine}
            introFading={introFading}
            onSkip={skipIntro}
          />
        </div>

        {/* 離脱確認ボトムシート（イントロ中も表示可能） */}
        {showExitSheet && (
          <QuizExitSheet
            onResume={() => setShowExitSheet(false)}
            exitHref={subjectHref}
            remainingCount={displayQuestions.length}
          />
        )}
      </>
    );
  }

  const questionPositionId = "quiz-question-position";
  const questionLabelId = "quiz-question-label";
  const correctAnswerCount = results.filter(Boolean).length;
  // 回答済み問題数ベース：答えれば常にバーが前進する（正誤に関わらず進捗感を維持）
  const progressPct = displayQuestions.length > 0
    ? Math.round((results.length / displayQuestions.length) * 100)
    : 0;

  // ─── クイズ本体 ──────────────────────────────────────────────────────
  return (
    <>
    <div
      className="space-y-5 animate-fade-in-up"
      ref={questionRegionRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={`クイズ: ${lessonTitle}`}
      aria-describedby={questionPositionId}
    >
      {showLightningOverlay && (
        <LightningComboOverlay
          key={displayCombo}
          combo={displayCombo}
          onComplete={() => setShowLightningOverlay(false)}
          duration={1500}
        />
      )}

      {/* ヘッダー：× ボタン + プログレスバー + コンボ */}
      <div className="flex items-center gap-3 pt-1">
        {/* × ボタン */}
        {CloseButton}

        {/* プログレスバー */}
        <div
          className="flex-1 relative h-[14px] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={results.length}
          aria-valuemin={0}
          aria-valuemax={displayQuestions.length}
          aria-label={`${results.length} / ${displayQuestions.length} 問回答済み`}
          style={{
            background: "rgba(0,0,0,0.08)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, #58cc02 0%, #89e219 100%)",
              boxShadow: "0 2px 8px rgba(88,204,2,0.45), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          />
        </div>

        {/* コンボバッジ or キーボードヒント */}
        <div className="flex-shrink-0 w-14 flex justify-end">
          {displayCombo >= 1 ? (
            <div
              className="flex items-center gap-1 rounded-full px-2.5 py-1"
              style={{
                background: "rgba(255,200,0,0.12)",
                border: "1.5px solid rgba(255,200,0,0.35)",
              }}
              aria-label={`${displayCombo}連続正解`}
            >
              <span aria-hidden className="text-sm leading-none">🔥</span>
              <span className="text-xs font-bold font-nunito" style={{ color: "#d97706" }}>
                {displayCombo}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* アクセシビリティ用：問題番号の読み上げ */}
      <span id={questionPositionId} className="sr-only">
        {index + 1}問目、全{displayQuestions.length}問中
      </span>

      <QuizQuestion
        current={current}
        selectedId={selectedId}
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        isLast={isLast}
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        questionLabelId={questionLabelId}
        correctOptionText={correct?.text}
        onSelect={handleSelect}
        onNext={handleNext}
        nextButtonRef={nextButtonRef}
      />

    </div>

    {/* 離脱確認ボトムシート（animate-fade-in-up の transform 外に置かないと fixed が正しく効かない） */}
    {showExitSheet && (
      <QuizExitSheet
        onResume={() => setShowExitSheet(false)}
        exitHref={subjectHref}
        remainingCount={displayQuestions.length - index}
      />
    )}
    </>
  );
}
