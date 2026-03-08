"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { Question } from "@/types";
import { PushButton } from "@/components/ui/PushButton";
import { CharacterLine } from "@/components/CharacterLine";
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
      className="absolute bottom-3 right-3 p-1.5 rounded-lg transition-colors hover:bg-black/5 active:bg-black/10"
      style={{ color: "rgba(0,0,0,0.22)" }}
      aria-label="この問題を報告する"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    </Link>
  );
}

export type QuizQuestionProps = {
  current: Question;
  selectedId: string | null;
  showFeedback: boolean;
  isCorrect: boolean;
  isLast: boolean;
  lessonId: string;
  lessonTitle: string;
  questionLabelId: string;
  correctOptionText: string | undefined;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  nextButtonRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * 1問分の表示：問題カード・選択肢・正誤フィードバック。
 * - 回答後の「次へ」ボタンは画面下部に固定表示
 * - 解説は「スマート解説」ボタンで折りたたみ展開
 */
export function QuizQuestion({
  current,
  selectedId,
  showFeedback,
  isCorrect,
  isLast,
  lessonId,
  lessonTitle,
  questionLabelId,
  correctOptionText,
  onSelect,
  onNext,
  nextButtonRef,
}: QuizQuestionProps) {
  const [explanationOpen, setExplanationOpen] = useState(false);
  // 正解アニメーションが完了してからキャラクターコメントを表示する（50ms遅延）
  const [showComment, setShowComment] = useState(false);

  // 新しい問題に進んだら解説・コメントを閉じる
  useEffect(() => {
    setExplanationOpen(false);
  }, [current.id]);

  useEffect(() => {
    if (!showFeedback) {
      setShowComment(false);
      return;
    }
    const t = setTimeout(() => setShowComment(true), 50);
    return () => clearTimeout(t);
  }, [showFeedback]);

  return (
    <>
      {/* ─── 問題テキスト ────────────────────────────────────────────── */}
      <div className="relative px-2 pt-4 pb-8">
        <h2
          id={questionLabelId}
          className="text-lg font-semibold text-pastel-ink leading-relaxed font-nunito text-center"
          tabIndex={-1}
        >
          {current.text}
        </h2>
        <ReportQuestionLink
          lessonId={lessonId}
          lessonTitle={lessonTitle}
          questionId={current.id}
          questionText={current.text}
        />
      </div>

      {/* ─── 選択肢リスト ────────────────────────────────────────────── */}
      <ul className="space-y-3" role="group" aria-label="選択肢" aria-describedby={questionLabelId}>
        {current.options.map((opt, optionIndex) => {
          const chosen = selectedId === opt.id;
          const isRight = opt.id === current.correctOptionId;
          const accent = OPTION_ACCENTS[optionIndex % OPTION_ACCENTS.length];
          const optionNumber = optionIndex + 1;
          const { shadowStyle, borderColor, bgColor, barColor, barGlow } = getOptionStyle(
            showFeedback,
            chosen,
            isRight
          );
          const isWrongChosen = showFeedback && chosen && !isRight;
          const isCorrectReveal = showFeedback && isRight;
          const isDimmed = showFeedback && !isRight && !chosen;

          const resolvedBarColor = barColor ?? accent.bar;
          const resolvedBarGlow = barGlow ?? `0 0 8px ${accent.shadow}`;

          return (
            <li key={opt.id}>
              <button
                type="button"
                aria-label={`選択肢 ${optionNumber}: ${opt.text}`}
                onClick={() => onSelect(opt.id)}
                disabled={showFeedback}
                className={[
                  "quiz-option-3d",
                  "w-full rounded-xl overflow-hidden",
                  "flex items-stretch",
                  "font-medium text-pastel-ink",
                  "disabled:cursor-default",
                  isWrongChosen && "animate-feedback-shake",
                  isCorrectReveal && "animate-option-correct-pop",
                  isDimmed && "opacity-55",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  background: bgColor,
                  boxShadow: shadowStyle,
                  border: `2px solid ${borderColor}`,
                  transition: "transform 150ms ease, box-shadow 150ms ease, opacity 200ms ease",
                }}
              >
                {/* 左アクセントバー */}
                {!isDimmed && (
                  <span
                    className={[
                      "w-[5px] flex-shrink-0 rounded-l-[9px] transition-colors duration-300",
                      chosen && "quiz-bar-pop",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      background: `linear-gradient(
                        180deg,
                        rgba(255,255,255,0.38) 0%,
                        rgba(255,255,255,0.08) 45%,
                        rgba(0,0,0,0.12) 100%
                      ), ${resolvedBarColor}`,
                      boxShadow: resolvedBarGlow,
                    }}
                    aria-hidden
                  />
                )}

                {/* テキスト中央配置 */}
                <span className="flex-1 flex items-center justify-center py-4 px-4 text-sm leading-snug text-center min-h-[52px]">
                  {opt.text}
                </span>

                {/* 右アクセントバー */}
                {!isDimmed && (
                  <span
                    className={[
                      "w-[5px] flex-shrink-0 rounded-r-[9px] transition-colors duration-300",
                      chosen && "quiz-bar-pop",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      background: `linear-gradient(
                        180deg,
                        rgba(255,255,255,0.38) 0%,
                        rgba(255,255,255,0.08) 45%,
                        rgba(0,0,0,0.12) 100%
                      ), ${resolvedBarColor}`,
                      boxShadow: resolvedBarGlow,
                    }}
                    aria-hidden
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ─── フィードバックセクション ────────────────────────────────── */}
      {showComment && (
        // pb-24 で固定「次へ」バーに隠れないようにする
        <div className="space-y-3 animate-fade-in-up pb-24">
          {/* キャラクターコメント */}
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

          {/* スマート解説（ボタン＋本文を1つのカードとして結合） */}
          {current.explanation && (
            <div
              className="overflow-hidden transition-all duration-200"
              style={{
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-sm)",
                borderRadius: "12px",
              }}
            >
              {/* ヘッダーボタン */}
              <button
                type="button"
                onClick={() => setExplanationOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-2.5 transition-colors duration-150"
                aria-expanded={explanationOpen}
                aria-controls="quiz-explanation"
              >
                <span
                  className="flex items-center gap-2 text-sm font-semibold font-nunito"
                  style={{ color: "rgba(0,0,0,0.58)" }}
                >
                  <span aria-hidden>⚡</span>
                  スマート解説
                </span>
                <span
                  className="text-xs font-mono transition-transform duration-200"
                  style={{
                    color: "rgba(0,0,0,0.32)",
                    display: "inline-block",
                    transform: explanationOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-hidden
                >
                  ▼
                </span>
              </button>

              {/* 区切り線 */}
              {explanationOpen && (
                <div
                  className="mx-4"
                  style={{ height: "1px", background: "rgba(0,0,0,0.07)" }}
                  aria-hidden
                />
              )}

              {/* 解説本文 */}
              {explanationOpen && (
                <div
                  id="quiz-explanation"
                  className="px-4 pt-3 pb-4 animate-fade-in-up"
                  style={{ boxShadow: "inset 0 2px 6px rgba(0,0,0,0.04)" }}
                >
                  <p className="text-sm text-pastel-ink/75 leading-relaxed">
                    {current.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ─── 固定「次へ」バー ─────────────────────────────────────────── */}
      {showFeedback && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-3"
          style={{
            background: "linear-gradient(to top, #E8ECF2 65%, transparent)",
            paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <PushButton
              type="button"
              ref={nextButtonRef as React.Ref<HTMLButtonElement>}
              onClick={onNext}
              className="w-full"
              aria-label={isLast ? "結果を見る" : "次の問題へ"}
            >
              {isLast ? "結果を見る" : "次へ"}
            </PushButton>
          </div>
        </div>
      )}
    </>
  );
}
