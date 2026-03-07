"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
import { getNextLessonAfter } from "@/services/lessonService";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizComplete } from "@/components/quiz/QuizComplete";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";

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

  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const displayQuestions = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      })),
    // レッスン切替時もシャッフルし直すため lessonId を依存に含める（eslint は未使用と判断するため無効化）
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, lessonId]
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

  const handleSelect = useCallback(
    (optionId: string) => {
      if (showFeedback || !current) return;
      const correctAnswer = optionId === current.correctOptionId;
      const comboBefore = getComboFromResults(results);
      const comboAfter = correctAnswer ? comboBefore + 1 : 0;
      setSelectedId(optionId);
      setShowFeedback(true);
      setResults((r) => [...r, correctAnswer]);
      recordAnswer(current.id, correctAnswer, comboAfter);
      if (correctAnswer) playCorrect();
      else playWrong();
    },
    [showFeedback, current, results, getComboFromResults, recordAnswer]
  );

  const displayCombo = getComboFromResults(results);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLightningOverlay, setShowLightningOverlay] = useState(false);

  useEffect(() => {
    if (showFeedback && isCorrect && displayCombo >= 5 && displayCombo % 5 === 0) {
      setShowLightningOverlay(true);
      const t = setTimeout(() => setShowLightningOverlay(false), 1500);
      return () => clearTimeout(t);
    } else {
      setShowLightningOverlay(false);
    }
  }, [showFeedback, isCorrect, displayCombo]);

  const handleNext = useCallback(() => {
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
  }, [isLast, results, displayQuestions.length, lessonId, completeLesson]);

  const questionRegionRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!current) return;
    questionRegionRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (showFeedback && nextButtonRef.current) {
      nextButtonRef.current.focus({ preventScroll: true });
    }
  }, [showFeedback, index, results.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!current) return;
      if (e.key === "Enter" && showFeedback) {
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
    <Link
      href={backHref}
      aria-label="レッスンを終了する"
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
    </Link>
  );

  // ─── イントロ画面 ─────────────────────────────────────────────────────
  if (showIntro) {
    return (
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
    );
  }

  const questionPositionId = "quiz-question-position";
  const questionLabelId = "quiz-question-label";
  const correctAnswerCount = results.filter(Boolean).length;
  const progressPct = displayQuestions.length > 0
    ? Math.round((correctAnswerCount / displayQuestions.length) * 100)
    : 0;

  // ─── クイズ本体 ──────────────────────────────────────────────────────
  return (
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
          aria-valuenow={correctAnswerCount}
          aria-valuemin={0}
          aria-valuemax={displayQuestions.length}
          aria-label={`正解 ${correctAnswerCount} / ${displayQuestions.length}`}
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
          ) : (
            <span
              className="text-[10px] font-mono hidden sm:inline"
              style={{ color: "rgba(0,0,0,0.2)" }}
              aria-hidden
            >
              1〜4
            </span>
          )}
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
        displayCombo={displayCombo}
        lessonId={lessonId}
        lessonTitle={lessonTitle}
        questionLabelId={questionLabelId}
        correctOptionText={correct?.text}
        onSelect={handleSelect}
        onNext={handleNext}
        nextButtonRef={nextButtonRef}
      />
    </div>
  );
}
