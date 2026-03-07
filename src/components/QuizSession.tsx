"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import type { Question } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { getXPForCorrect } from "@/lib/progress";
import { shuffle } from "@/lib/utils";
import { PushButton } from "@/components/ui/PushButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LightningComboOverlay } from "@/components/LightningComboOverlay";
import { CharacterLine } from "@/components/CharacterLine";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { playCorrect, playWrong, playComplete } from "@/lib/sounds";

/** 選択肢ごとのパステル背景（デザインガイドの6色ベース） */
const OPTION_PASTEL_CLASSES = [
  "!bg-pastel-blue/80 !border-pastel-blue/60",
  "!bg-pastel-pink/70 !border-pastel-pink/50",
  "!bg-[#9069CD]/25 !border-pastel-purple/40",
  "!bg-[#FFC800]/20 !border-[#FFC800]/50",
] as const;

function ReportQuestionLink({
  lessonId,
  lessonTitle,
  questionId,
  questionText,
}: {
  lessonId: string;
  lessonTitle: string;
  questionId: string;
  questionText: string;
}) {
  const params = new URLSearchParams({
    report: "1",
    lessonId,
    lessonTitle,
    questionId,
    questionText: questionText.slice(0, 120),
  });
  return (
    <Link
      href={`/contact?${params.toString()}`}
      className="text-xs text-pastel-ink/60 hover:text-pastel-ink underline"
    >
      この問題を報告
    </Link>
  );
}

type Props = {
  questions: Question[];
  lessonId: string;
  lessonTitle: string;
};

export function QuizSession({ questions, lessonId, lessonTitle }: Props) {
  const { recordAnswer, completeLesson } = useProgress();
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  /** 各問題の選択肢の表示順をランダムにする（レッスン・問題セットが変わったときだけ再計算） */
  const questionIdsKey = questions.map((q) => q.id).join(",");
  const displayQuestions = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      })),
    [lessonId, questionIdsKey] // eslint-disable-line react-hooks/exhaustive-deps -- questions を直指定すると参照変動で毎回シャッフルされるため ID 文字列で比較
  );

  const current = displayQuestions[index];
  const isLast = index === displayQuestions.length - 1;
  const correct = current?.options.find((o) => o.id === current.correctOptionId);
  const isCorrect = selectedId === current?.correctOptionId;

  /** 末尾から連続した正解の数（Duolingo風コンボ） */
  const getComboFromResults = (r: boolean[]) => {
    let count = 0;
    for (let i = r.length - 1; i >= 0 && r[i]; i--) count++;
    return count;
  };

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    const correctAnswer = optionId === current.correctOptionId;
    const comboBefore = getComboFromResults(results);
    const comboAfter = correctAnswer ? comboBefore + 1 : 0;
    setSelectedId(optionId);
    setShowFeedback(true);
    setResults((r) => [...r, correctAnswer]);
    recordAnswer(current.id, correctAnswer, comboAfter);
    if (correctAnswer) playCorrect();
    else playWrong();
  };

  /** 表示用：現在の連続正解コンボ数（直前の結果まで） */
  const displayCombo = getComboFromResults(results);

  const [showCompleted, setShowCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  /** 5の倍数コンボ達成時の雷オーバーレイ（画面全体・一瞬表示） */
  const [showLightningOverlay, setShowLightningOverlay] = useState(false);

  useEffect(() => {
    if (
      showFeedback &&
      isCorrect &&
      displayCombo >= 5 &&
      displayCombo % 5 === 0
    ) {
      setShowLightningOverlay(true);
      const t = setTimeout(() => setShowLightningOverlay(false), 1500);
      return () => clearTimeout(t);
    } else {
      setShowLightningOverlay(false);
    }
  }, [showFeedback, isCorrect, displayCombo]);

  const handleNext = () => {
    if (isLast) {
      completeLesson(lessonId);
      setShowCompleted(true);
      setShowConfetti(true);
      playComplete();
    } else {
      setIndex((i) => i + 1);
      setSelectedId(null);
      setShowFeedback(false);
    }
  };

  if (displayQuestions.length === 0) {
    return (
      <div className="rounded-xl border-2 border-pastel-orange bg-pastel-rose/50 p-6 text-center text-pastel-ink">
        <p className="font-medium">このレッスンには問題がありません。</p>
        <PushButton href="/roadmap" variant="primary" className="mt-4">
          ロードマップに戻る
        </PushButton>
      </div>
    );
  }

  // 全問終了（「結果を見る」クリック後）
  if (showCompleted) {
    const correctCount = results.filter(Boolean).length + (isCorrect ? 1 : 0);
    const total = displayQuestions.length;
    const isGoodScore = total > 0 && correctCount >= total * 0.8;

    return (
      <div className="space-y-6">
        <ConfettiEffect active={showConfetti} duration={3000} />
        <div className="rounded-xl border-2 border-pastel-primary bg-pastel-mint p-6 text-center">
          <h2 className="text-xl font-bold text-pastel-ink">レッスン完了</h2>
          <p className="mt-2 text-pastel-ink/80">{lessonTitle}</p>
          <p className="mt-4 text-2xl font-bold text-pastel-primary-dark">
            {correctCount} / {total} 問正解
          </p>
        </div>
        <CharacterLine
          characterId="shirin"
          lineKey={isGoodScore ? "lessonCompleteGood" : "lessonComplete"}
          size="sm"
        />
        <div className="flex justify-center gap-4">
          <PushButton href="/roadmap">ロードマップに戻る</PushButton>
          <PushButton href="/" variant="outline">ホーム</PushButton>
        </div>
      </div>
    );
  }

  // 1問の表示（白背景）
  return (
    <div className="min-h-[60vh] rounded-2xl bg-white p-4 sm:p-6 -mx-4 sm:-mx-0 space-y-6">
      {showLightningOverlay && (
        <LightningComboOverlay
          key={displayCombo}
          combo={displayCombo}
          onComplete={() => setShowLightningOverlay(false)}
          duration={1500}
        />
      )}
      <div className="text-pastel-ink">
        <ProgressBar
          current={results.filter(Boolean).length}
          total={displayQuestions.length}
          label="正解"
          variant="quiz"
          className="mb-1"
          labelClassName="text-pastel-ink"
        />
        <div className="flex items-center justify-end">
          {displayCombo >= 1 && (
            <div
              className="flex items-center gap-1 rounded-full bg-amber-400/90 px-3 py-1 text-sm font-semibold text-pastel-ink"
              aria-label={`${displayCombo} 連続正解`}
            >
              <span aria-hidden>🔥</span>
              <span>{displayCombo} コンボ</span>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-xl border-2 border-pastel-border bg-white/98 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-pastel-ink leading-relaxed">
          {current.text}
        </h2>
        <div className="mt-4 text-right">
          <ReportQuestionLink
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            questionId={current.id}
            questionText={current.text}
          />
        </div>
        <ul className="mt-6 space-y-3">
          {current.options.map((opt, optionIndex) => {
            const chosen = selectedId === opt.id;
            const isRight = opt.id === current.correctOptionId;
            const optionVariant: "option" | "optionCorrect" | "optionWrong" =
              showFeedback && isRight
                ? "optionCorrect"
                : showFeedback && chosen && !isRight
                  ? "optionWrong"
                  : "option";
            const pastelClass = OPTION_PASTEL_CLASSES[optionIndex % OPTION_PASTEL_CLASSES.length];
            const chosenOrFeedbackClass =
              showFeedback && isRight
                ? ""
                : showFeedback && chosen && !isRight
                  ? ""
                : !showFeedback && chosen
                  ? "!border-pastel-primary !bg-pastel-mint/80"
                  : pastelClass;
            const isWrongChosen = showFeedback && chosen && !isRight;
            const isCorrectChosen = showFeedback && isRight;
            return (
              <li key={opt.id}>
                <PushButton
                  variant={optionVariant}
                  onClick={() => handleSelect(opt.id)}
                  disabled={showFeedback}
                  className={`${chosenOrFeedbackClass} ${isWrongChosen ? "animate-feedback-shake" : ""} ${isCorrectChosen ? "animate-option-correct-pop" : ""}`}
                >
                  {opt.text}
                </PushButton>
              </li>
            );
          })}
        </ul>
      </div>

      {showFeedback && (
        <div className="space-y-4">
          {isCorrect ? (
            <CharacterLine
              characterId="skurun"
              lineKey="quizCorrect"
              variant="correct"
              size="sm"
              className="animate-feedback-pop"
            />
          ) : (
            <>
              <CharacterLine
                characterId="skurun"
                lineKey="quizWrong"
                variant="wrong"
                size="sm"
              />
              {correct?.text && (
                <CharacterLine
                  characterId="regi"
                  lineKey="regiExplanation"
                  replacements={{ correct: correct.text }}
                  size="sm"
                />
              )}
            </>
          )}
          <div
            className={`rounded-xl border-2 p-4 ${
              isCorrect ? "border-pastel-success bg-pastel-mint" : "border-pastel-error bg-pastel-rose"
            }`}
          >
            {isCorrect && (
              <p className="text-sm text-pastel-primary-dark">
                +{getXPForCorrect(displayCombo)} XP
                {displayCombo >= 2 && (
                  <span className="ml-1 text-pastel-primary-dark/80">
                    （{displayCombo} コンボ！ コンボボーナス）
                  </span>
                )}
              </p>
            )}
            {!isCorrect && displayCombo >= 1 && (
              <p className="text-sm text-pastel-ink/80">コンボが途切れました。</p>
            )}
            {current.explanation && (
              <p className="mt-2 text-sm text-pastel-ink/80">{current.explanation}</p>
            )}
          </div>
          <PushButton type="button" onClick={handleNext} className="w-full">
            {isLast ? "結果を見る" : "次へ"}
          </PushButton>
        </div>
      )}
    </div>
  );
}

