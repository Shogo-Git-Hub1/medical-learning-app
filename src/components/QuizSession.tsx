"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Question } from "@/types";
import { useProgressContext } from "@/contexts/ProgressContext";
import { setLastLessonResult, getXPForCorrect } from "@/lib/progress";
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
  /** 復習セッション限定: 次バッチの残り問題数（0 のとき「次へ」ボタンを非表示） */
  remainingReviewCount?: number;
  /** 復習セッション限定: 「次の復習問題へ」ボタン押下時のコールバック */
  onNextReviewBatch?: () => void;
  /**
   * false を渡すとマウント時のイントロアニメーションをスキップして即クイズを開始する。
   * 復習セッションの 2 バッチ目以降で使用。デフォルト true。
   */
  initialShowIntro?: boolean;
};

export function QuizSession({ questions, lessonId, lessonTitle, lessonLevel = 1, backHref: backHrefProp, remainingReviewCount = 0, onNextReviewBatch, initialShowIntro = true }: Props) {
  const { progress, recordAnswer, completeLesson } = useProgressContext();
  const searchParams = useSearchParams();
  const backHref = backHrefProp ?? resolveBackHref(searchParams?.get("from") ?? "");

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
  const [showIntro, setShowIntro] = useState(initialShowIntro);
  const [introFading, setIntroFading] = useState(false);

  const skipIntro = () => {
    setIntroFading(true);
    setTimeout(() => setShowIntro(false), 300);
  };

  useEffect(() => {
    // initialShowIntro=false のバッチではイントロを表示しないのでタイマー不要
    if (!initialShowIntro) return;
    const fadeTimer = setTimeout(() => setIntroFading(true), 3200);
    const hideTimer = setTimeout(() => setShowIntro(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
    // initialShowIntro はマウント時に固定される値なので deps から除外して安全
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // 間違え直しモード: null のときは全問出題、Set のときはその ID の問題だけ出題。
  // handleRetry で null にリセット、handleRetryWrong でセットする。
  const [wrongQuestionIds, setWrongQuestionIds] = useState<ReadonlySet<string> | null>(null);

  const displayQuestions = useMemo(
    () =>
      (wrongQuestionIds
        ? questions.filter((q) => wrongQuestionIds.has(q.id))
        : questions
      ).map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      })),
    // 【重要】questions ではなく lessonId + shuffleSeed を依存にする。
    // questions を依存に含めると、recordAnswer などでコンテキストが更新された際に
    // 親が再レンダーして questions の参照が変わり、セッション途中で再シャッフルが
    // 起きて「選択した瞬間に別の問題が表示される」バグの原因になる。
    // shuffleSeed・wrongQuestionIds はいずれもリトライ時のみ変更されるため安全。
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessonId, shuffleSeed, wrongQuestionIds]
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
      if (showFeedback) return;
      setSelectedId(optionId);
    },
    [showFeedback]
  );

  const handleConfirm = useCallback(() => {
    if (showFeedback || !selectedId || !current || isSelectInFlight.current) return;
    isSelectInFlight.current = true;
    const correctAnswer = selectedId === current.correctOptionId;
    const comboBefore = getComboFromResults(results);
    const comboAfter = correctAnswer ? comboBefore + 1 : 0;
    setShowFeedback(true);
    setResults((r) => [...r, correctAnswer]);
    if (comboAfter > 0) setMaxCombo((prev) => Math.max(prev, comboAfter));
    if (correctAnswer) {
      const isFirstTime = !progress.questionReviews[current.id]?.everCorrect;
      setEarnedXP((prev) => Math.round((prev + getXPForCorrect(comboAfter, isFirstTime)) * 10) / 10);
    }
    recordAnswer(current.id, correctAnswer, comboAfter);
    if (correctAnswer) playCorrect();
    else playWrong();
  }, [showFeedback, selectedId, current, results, getComboFromResults, recordAnswer]);

  const displayCombo = getComboFromResults(results);
  const [maxCombo, setMaxCombo] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
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
    setWrongQuestionIds(null);
    setShowCompleted(false);
    setShowConfetti(false);
    setShowLightningOverlay(false);
    setIndex(0);
    setSelectedId(null);
    setShowFeedback(false);
    setResults([]);
    setMaxCombo(0);
    setEarnedXP(0);
    setShuffleSeed((s) => s + 1);
    isNextInFlight.current = false;
    isSelectInFlight.current = false;
  }, []);

  // 間違えた問題だけ再挑戦するコールバック。
  // showCompleted 表示中に displayQuestions・results は完全な状態で保持されている。
  const handleRetryWrong = useCallback(() => {
    const ids = new Set(
      displayQuestions
        .filter((_, i) => results[i] === false)
        .map((q) => q.id)
    );
    setWrongQuestionIds(ids);
    setShowCompleted(false);
    setShowConfetti(false);
    setShowLightningOverlay(false);
    setIndex(0);
    setSelectedId(null);
    setShowFeedback(false);
    setResults([]);
    setMaxCombo(0);
    setEarnedXP(0);
    setShuffleSeed((s) => s + 1);
    isNextInFlight.current = false;
    isSelectInFlight.current = false;
  }, [displayQuestions, results]);

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
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

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
      // Enter で確認（選択済み・フィードバック前）
      if (e.key === "Enter" && !showFeedback && selectedId) {
        if ((e.target as Element) === confirmButtonRef.current) return;
        e.preventDefault();
        handleConfirm();
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
    [current, showFeedback, selectedId, handleNext, handleConfirm, handleSelect]
  );

  // ─── 完了画面 ─────────────────────────────────────────────────────────
  if (showCompleted) {
    const correctCount = results.filter(Boolean).length;
    const total = displayQuestions.length;
    const isGoodScore = total > 0 && correctCount >= total * 0.8;
    const wrongCount = total - correctCount;
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
        earnedXP={earnedXP}
        onRetry={handleRetry}
        wrongCount={wrongCount}
        onRetryWrong={wrongCount > 0 ? handleRetryWrong : undefined}
        remainingReviewCount={remainingReviewCount}
        onNextReviewBatch={onNextReviewBatch}
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
  // 問題位置バー用：現在の問題番号ベース（何問目を解いているかを示す）
  const questionPct = displayQuestions.length > 0
    ? Math.round(((index + 1) / displayQuestions.length) * 100)
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

        {/* 問題位置バー（青）：現在何問目かを示す */}
        <div
          className="flex-1 relative h-[9px] rounded-full overflow-hidden"
          style={{ background: "rgba(0,0,0,0.08)" }}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={displayQuestions.length}
          aria-label={`${index + 1} / ${displayQuestions.length} 問目`}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${questionPct}%`,
              background: "linear-gradient(90deg, #1cb0f6 0%, #58d8ff 100%)",
              boxShadow: "0 1px 4px rgba(28,176,246,0.5)",
            }}
          />
        </div>

        {/* コンボバッジ */}
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
        onConfirm={handleConfirm}
        confirmButtonRef={confirmButtonRef}
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
