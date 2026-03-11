"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { Question } from "@/types";
import { PushButton } from "@/components/ui/PushButton";
import { getOptionStyle } from "@/components/quiz/quizOptionStyles";

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
  onConfirm: () => void;
  confirmButtonRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * 1問分の表示：問題カード・選択肢・正誤フィードバック。
 * - 回答後のフィードバック・スマート解説・「次へ」ボタンは画面下部の固定バーに統合
 * - 正解時は緑、不正解時は赤のバー背景
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
  onConfirm,
  confirmButtonRef,
}: QuizQuestionProps) {
  const [explanationOpen, setExplanationOpen] = useState(false);

  // 新しい問題に進んだら解説を閉じる
  useEffect(() => {
    setExplanationOpen(false);
  }, [current.id]);

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
          const optionNumber = optionIndex + 1;
          const { shadowStyle, borderColor, bgColor } = getOptionStyle(
            showFeedback,
            chosen,
            isRight
          );
          const isWrongChosen = showFeedback && chosen && !isRight;
          const isCorrectReveal = showFeedback && isRight;
          const isDimmed = showFeedback && !isRight && !chosen;

          return (
            <li key={opt.id}>
              <button
                type="button"
                aria-label={`選択肢 ${optionNumber}: ${opt.text}`}
                onClick={() => onSelect(opt.id)}
                disabled={showFeedback}
                className={[
                  "quiz-option-3d",
                  "w-full rounded-2xl",
                  "flex items-center justify-center",
                  "font-medium text-pastel-ink",
                  "disabled:cursor-default",
                  isWrongChosen && "animate-feedback-shake",
                  isCorrectReveal && "animate-option-correct-pop",
                  isDimmed && "opacity-50",
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
                <span className="py-4 px-5 text-sm leading-snug text-center min-h-[52px] flex items-center">
                  {opt.text}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* 解答確認バー：選択済みでフィードバック前のみ表示 */}
      {selectedId !== null && !showFeedback && (
        <>
          <div className="h-24" aria-hidden />
          <div
            className="fixed bottom-0 left-0 right-0 z-20 animate-slide-up"
            style={{
              background: "#ffffff",
              borderTop: "2px solid rgba(0,0,0,0.07)",
              paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)",
            }}
          >
            <div className="max-w-2xl mx-auto px-4 pt-4">
              <button
                type="button"
                ref={confirmButtonRef as React.Ref<HTMLButtonElement>}
                onClick={onConfirm}
                className="w-full rounded-xl min-h-[48px] py-3 px-5 font-semibold text-white transition-all duration-150 active:translate-y-1 active:transition-none select-none"
                style={{
                  background: "#58cc02",
                  boxShadow: "0 4px 0 #46a302",
                }}
              >
                解答する
              </button>
            </div>
          </div>
        </>
      )}

      {/* スペーサー：固定バーに隠れないようにする */}
      {showFeedback && <div className="h-56" aria-hidden />}

      {/* ─── 固定フィードバックバー ──────────────────────────────────── */}
      {showFeedback && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 animate-slide-up"
          style={{
            background: isCorrect ? "#d7ffb8" : "#ffd6d6",
            borderTop: `2px solid ${isCorrect ? "rgba(88,167,0,0.35)" : "rgba(234,43,43,0.3)"}`,
            paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)",
          }}
        >
          <div className="max-w-2xl mx-auto px-4 pt-4 space-y-3">
            {/* フィードバックラベル */}
            <div className="flex items-center gap-2.5 animate-feedback-pop">
              <span
                aria-hidden
                style={{
                  color: isCorrect ? "#58a700" : "#ea2b2b",
                  fontSize: "1.4rem",
                  lineHeight: 1,
                }}
              >
                {isCorrect ? "✓" : "✗"}
              </span>
              <div>
                <p
                  className="font-bold font-nunito text-base leading-tight"
                  style={{ color: isCorrect ? "#58a700" : "#ea2b2b" }}
                >
                  {isCorrect ? "正解！" : "不正解..."}
                </p>
                {!isCorrect && correctOptionText && (
                  <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.5)" }}>
                    正解は「{correctOptionText}」
                  </p>
                )}
              </div>
            </div>

            {/* スマート解説（ボタン＋本文を1つのカードとして結合） */}
            {current.explanation && (
              <div
                className="overflow-hidden"
                style={{
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-sm)",
                  borderRadius: "12px",
                }}
              >
                {/* ヘッダーボタン */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !explanationOpen;
                    setExplanationOpen(next);
                    if (next) window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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

            {/* 次へボタン：正解時はPrimary（緑）、不正解時は赤塗りつぶし */}
            {isCorrect ? (
              <PushButton
                type="button"
                ref={nextButtonRef as React.Ref<HTMLButtonElement>}
                onClick={onNext}
                className="w-full"
                aria-label={isLast ? "結果を見る" : "次の問題へ"}
              >
                {isLast ? "結果を見る" : "次へ"}
              </PushButton>
            ) : (
              <button
                type="button"
                ref={nextButtonRef as React.Ref<HTMLButtonElement>}
                onClick={onNext}
                aria-label={isLast ? "結果を見る" : "次の問題へ"}
                className="w-full rounded-xl min-h-[48px] py-3 px-5 font-semibold text-white transition-all duration-150 active:translate-y-1 active:transition-none select-none"
                style={{
                  background: "#ea2b2b",
                  boxShadow: "0 4px 0 #b91c1c",
                }}
              >
                {isLast ? "結果を見る" : "次へ"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
