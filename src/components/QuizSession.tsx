"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import type { Question } from "@/types";
import { useProgressContext } from "@/contexts/ProgressContext";
import { setLastLessonResult } from "@/lib/progress";
import { shuffle, getStableCharacterIndex } from "@/lib/utils";
import { PushButton } from "@/components/ui/PushButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LightningComboOverlay } from "@/components/LightningComboOverlay";
import { playCorrect, playWrong, playComplete } from "@/lib/sounds";
import { getSessionIntroLine } from "@/data/characters";
import type { CharacterId } from "@/types/characters";
import { getNextLessonAfter } from "@/services/lessonService";
import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizComplete } from "@/components/quiz/QuizComplete";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";

const ALL_CHARACTER_IDS: CharacterId[] = ["skurun", "regi", "shirin"];

type Props = {
  questions: Question[];
  lessonId: string;
  lessonTitle: string;
  lessonLevel?: number;
};

export function QuizSession({ questions, lessonId, lessonTitle, lessonLevel = 1 }: Props) {
  const { recordAnswer, completeLesson } = useProgressContext();

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
      const correctCount = results.filter(Boolean).length + (isCorrect ? 1 : 0);
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
  }, [isLast, isCorrect, results, displayQuestions.length, lessonId, completeLesson]);

  const questionRegionRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!current) return;
    questionRegionRef.current?.focus({ preventScroll: true });
    // 問題が切り替わったときのみフォーカス。current を依存に含めると参照変動で毎問実行されるため index のみ
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

  if (showIntro) {
    return (
      <QuizIntro
        introCharacter={introCharacter}
        introLine={introLine}
        introFading={introFading}
        onSkip={skipIntro}
      />
    );
  }

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

  if (showCompleted) {
    const correctCount = results.filter(Boolean).length + (isCorrect ? 1 : 0);
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

  const questionPositionId = "quiz-question-position";
  const questionLabelId = "quiz-question-label";

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

      {/* ヘッダー：問題番号・コンボ・進捗・キーボード操作のヒント */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-1">
          <span
            id={questionPositionId}
            className="text-[10px] font-mono text-pastel-ink/35 tracking-widest"
            aria-hidden="false"
          >
            Q {index + 1} / {displayQuestions.length}
          </span>
          <span className="text-[10px] font-mono text-pastel-ink/30 hidden sm:inline" aria-hidden>
            1〜4で選択、Enterで次へ
          </span>
          {displayCombo >= 1 && (
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-sm), 0 0 10px rgba(255,200,0,0.35)",
              }}
              aria-label={`${displayCombo} 連続正解`}
            >
              <span aria-hidden>🔥</span>
              <span className="text-sm font-bold text-pastel-ink font-mono">{displayCombo}</span>
              <span className="text-xs text-pastel-ink/50">コンボ</span>
            </div>
          )}
        </div>
        <ProgressBar
          current={results.filter(Boolean).length}
          total={displayQuestions.length}
          label="正解"
          variant="quiz"
        />
      </div>

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
