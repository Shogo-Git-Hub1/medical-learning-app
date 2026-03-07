"use client";

import React from "react";
import Link from "next/link";
import type { Question } from "@/types";
import { PushButton } from "@/components/ui/PushButton";
import { CardWithAccent } from "@/components/ui/CardWithAccent";
import { CharacterLine } from "@/components/CharacterLine";
import { getXPForCorrect } from "@/lib/progress";
import { getOptionStyle, OPTION_ACCENTS } from "@/components/quiz/quizOptionStyles";

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
      className="text-[10px] font-mono text-pastel-ink/30 hover:text-pastel-ink/60 transition-colors"
      aria-label="この問題を報告する"
    >
      この問題を報告
    </Link>
  );
}

export type QuizQuestionProps = {
  current: Question;
  selectedId: string | null;
  showFeedback: boolean;
  isCorrect: boolean;
  isLast: boolean;
  displayCombo: number;
  lessonId: string;
  lessonTitle: string;
  questionLabelId: string;
  correctOptionText: string | undefined;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  nextButtonRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * 1問分の表示：問題カード・選択肢・正誤フィードバックパネル。
 * 問題数が増えても1問あたりのレンダリングは独立して最適化しやすい。
 */
export function QuizQuestion({
  current,
  selectedId,
  showFeedback,
  isCorrect,
  isLast,
  displayCombo,
  lessonId,
  lessonTitle,
  questionLabelId,
  correctOptionText,
  onSelect,
  onNext,
  nextButtonRef,
}: QuizQuestionProps) {
  return (
    <>
      <CardWithAccent variant="success" container="card-lg" className="rounded-2xl p-6">
        <h2
          id={questionLabelId}
          className="text-lg font-semibold text-pastel-ink leading-relaxed font-nunito"
          tabIndex={-1}
        >
          {current.text}
        </h2>
        <div className="mt-3 flex justify-end">
          <ReportQuestionLink
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            questionId={current.id}
            questionText={current.text}
          />
        </div>
      </CardWithAccent>

      <ul className="space-y-3" role="group" aria-label="選択肢" aria-describedby={questionLabelId}>
        {current.options.map((opt, optionIndex) => {
          const chosen = selectedId === opt.id;
          const isRight = opt.id === current.correctOptionId;
          const accent = OPTION_ACCENTS[optionIndex % OPTION_ACCENTS.length];
          const optionNumber = optionIndex + 1;
          const { shadowStyle, borderColor, bgColor } = getOptionStyle(showFeedback, chosen, isRight);
          const isWrongChosen = showFeedback && chosen && !isRight;
          const isCorrectReveal = showFeedback && isRight;

          return (
            <li key={opt.id}>
              <button
                type="button"
                aria-label={`選択肢 ${optionNumber}: ${opt.text}`}
                onClick={() => onSelect(opt.id)}
                disabled={showFeedback}
                className={[
                  "w-full rounded-xl px-4 py-3.5 text-left font-medium text-pastel-ink",
                  "flex items-center gap-3 transition-all duration-150",
                  "disabled:cursor-default",
                  !showFeedback && "hover:scale-[1.01] active:scale-[0.98]",
                  isWrongChosen && "animate-feedback-shake",
                  isCorrectReveal && "animate-option-correct-pop",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  background: bgColor,
                  boxShadow: shadowStyle,
                  border: `1.5px solid ${borderColor}`,
                }}
              >
                <span
                  className="w-1.5 h-7 rounded-full flex-shrink-0 transition-opacity duration-200"
                  style={{
                    background: accent.bar,
                    boxShadow: `0 0 7px ${accent.shadow}`,
                    opacity: showFeedback && !isRight ? 0.35 : 1,
                  }}
                  aria-hidden
                />
                <span className="flex-1 text-sm leading-snug">{opt.text}</span>
                {showFeedback && isRight && (
                  <span
                    className="text-pastel-primary font-bold text-base"
                    style={{ textShadow: "0 0 10px rgba(88,204,2,0.65)" }}
                  >
                    ✓
                  </span>
                )}
                {showFeedback && chosen && !isRight && (
                  <span className="text-pastel-error font-bold text-base">✗</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {showFeedback && (
        <div className="space-y-4 animate-fade-in-up">
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
              {correctOptionText && (
                <CharacterLine
                  characterId="regi"
                  lineKey="regiExplanation"
                  replacements={{ correct: correctOptionText }}
                  size="sm"
                />
              )}
            </>
          )}

          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-inset)",
            }}
          >
            <div
              className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full"
              style={{
                background: isCorrect
                  ? "linear-gradient(90deg, transparent, rgba(88,204,2,0.7), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(232,100,100,0.7), transparent)",
              }}
              aria-hidden
            />
            {isCorrect && (
              <p
                className="text-sm font-bold font-mono text-pastel-primary"
                style={{ textShadow: "0 0 8px rgba(88,204,2,0.4)" }}
              >
                +{getXPForCorrect(displayCombo)} XP
                {displayCombo >= 2 && (
                  <span className="ml-2 font-normal text-pastel-primary/65">
                    ({displayCombo} コンボボーナス)
                  </span>
                )}
              </p>
            )}
            {!isCorrect && displayCombo >= 1 && (
              <p className="text-sm font-mono text-pastel-ink/55">{"// コンボが途切れました"}</p>
            )}
            {current.explanation && (
              <p className="mt-2 text-sm text-pastel-ink/70 leading-relaxed">
                {current.explanation}
              </p>
            )}
          </div>

          <PushButton
            type="button"
            ref={nextButtonRef as React.Ref<HTMLButtonElement>}
            onClick={onNext}
            className="w-full"
            aria-label={isLast ? "結果を見る" : "次の問題へ"}
          >
            {isLast ? "結果を見る" : "次へ →"}
          </PushButton>
        </div>
      )}
    </>
  );
}
