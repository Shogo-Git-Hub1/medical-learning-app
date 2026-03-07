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

/** 選択肢ごとのアクセントカラー（Duolingo 6色パレット準拠） */
const OPTION_ACCENTS = [
  { bar: "#BBF2FF", shadow: "rgba(187,242,255,0.6)" }, // 水色
  { bar: "#FFB2B2", shadow: "rgba(255,178,178,0.6)" }, // ピンク
  { bar: "#9069CD", shadow: "rgba(144,105,205,0.5)" }, // パープル
  { bar: "#FFC800", shadow: "rgba(255,200,0,0.6)" },   // イエロー
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
      className="text-[10px] font-mono text-pastel-ink/30 hover:text-pastel-ink/60 transition-colors"
    >
      // 問題を報告
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

  const questionIdsKey = questions.map((q) => q.id).join(",");
  const displayQuestions = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      })),
    [lessonId, questionIdsKey] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const current = displayQuestions[index];
  const isLast = index === displayQuestions.length - 1;
  const correct = current?.options.find((o) => o.id === current.correctOptionId);
  const isCorrect = selectedId === current?.correctOptionId;

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
      <div className="neu-inset rounded-2xl p-8 text-center">
        <p className="font-mono text-sm text-pastel-ink/50">// このレッスンには問題がありません</p>
        <PushButton href="/roadmap" variant="primary" className="mt-6">
          ロードマップに戻る
        </PushButton>
      </div>
    );
  }

  // ─── 完了画面 ───────────────────────────────────────────────────────
  if (showCompleted) {
    const correctCount = results.filter(Boolean).length + (isCorrect ? 1 : 0);
    const total = displayQuestions.length;
    const isGoodScore = total > 0 && correctCount >= total * 0.8;
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return (
      <div className="space-y-6 animate-fade-in-up">
        <ConfettiEffect active={showConfetti} duration={3000} />

        {/* 完了カード */}
        <div className="neu-card-lg rounded-3xl p-8 text-center relative overflow-hidden">
          {/* グロートップライン */}
          <div
            className="absolute top-0 left-8 right-8 h-0.5 rounded-b-full"
            style={{
              background: "linear-gradient(90deg, transparent, #58CC02, transparent)",
              boxShadow: "0 0 14px rgba(88,204,2,0.55)",
            }}
            aria-hidden
          />

          <p className="text-[10px] font-mono text-pastel-primary/55 tracking-[0.2em] mb-5 uppercase">
            // Lesson Complete
          </p>
          <h2 className="text-lg font-bold text-pastel-ink font-nunito">{lessonTitle}</h2>

          {/* スコア */}
          <div className="mt-6 mb-2 flex flex-col items-center gap-1">
            <span
              className="text-6xl font-bold font-nunito text-pastel-primary"
              style={{ textShadow: "0 0 20px rgba(88,204,2,0.55), 0 0 40px rgba(88,204,2,0.2)" }}
            >
              {pct}%
            </span>
            <span className="text-sm text-pastel-ink/50 font-mono mt-1">
              {correctCount} / {total} 問正解
            </span>
          </div>

          {/* スコアバー */}
          <div className="mt-4 px-4">
            <ProgressBar
              current={correctCount}
              total={total}
              variant="quiz"
              showLabel={false}
            />
          </div>
        </div>

        <CharacterLine
          characterId="shirin"
          lineKey={isGoodScore ? "lessonCompleteGood" : "lessonComplete"}
          size="sm"
        />

        <div className="flex gap-3">
          <PushButton href="/roadmap" className="flex-1">
            ロードマップへ
          </PushButton>
          <PushButton href="/" variant="outline" className="flex-1">
            ホーム
          </PushButton>
        </div>
      </div>
    );
  }

  // ─── クイズ本体 ──────────────────────────────────────────────────────
  return (
    <div className="space-y-5 animate-fade-in-up">
      {showLightningOverlay && (
        <LightningComboOverlay
          key={displayCombo}
          combo={displayCombo}
          onComplete={() => setShowLightningOverlay(false)}
          duration={1500}
        />
      )}

      {/* ヘッダー：問題番号・コンボ・進捗 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-pastel-ink/35 tracking-widest">
            Q {index + 1} / {displayQuestions.length}
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

      {/* 問題カード */}
      <div className="neu-card-lg rounded-2xl p-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(88,204,2,0.55), transparent)",
          }}
          aria-hidden
        />
        <h2 className="text-lg font-semibold text-pastel-ink leading-relaxed font-nunito">
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
      </div>

      {/* 選択肢 */}
      <ul className="space-y-3">
        {current.options.map((opt, optionIndex) => {
          const chosen = selectedId === opt.id;
          const isRight = opt.id === current.correctOptionId;
          const accent = OPTION_ACCENTS[optionIndex % OPTION_ACCENTS.length];

          // 状態ごとにシャドウ・ボーダー・背景を決定
          let shadowStyle = "var(--neu-shadow-sm)";
          let borderColor = "transparent";
          let bgColor = "var(--neu-bg)";

          if (showFeedback && isRight) {
            shadowStyle = "var(--neu-shadow-sm), 0 0 16px rgba(88,204,2,0.45)";
            borderColor = "rgba(88,204,2,0.55)";
            bgColor = "rgba(232,245,224,0.75)";
          } else if (showFeedback && chosen && !isRight) {
            shadowStyle =
              "inset 3px 3px 7px rgba(197,202,209,0.6), inset -3px -3px 7px rgba(255,255,255,0.75)";
            borderColor = "rgba(232,100,100,0.55)";
            bgColor = "rgba(255,210,210,0.5)";
          } else if (!showFeedback && chosen) {
            shadowStyle = "var(--neu-shadow-sm), 0 0 12px rgba(88,204,2,0.3)";
            borderColor = "rgba(88,204,2,0.5)";
          }

          const isWrongChosen = showFeedback && chosen && !isRight;
          const isCorrectReveal = showFeedback && isRight;

          return (
            <li key={opt.id}>
              <button
                onClick={() => handleSelect(opt.id)}
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
                {/* 選択肢アクセントバー */}
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

      {/* フィードバックパネル */}
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

          {/* XP・解説パネル */}
          <div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-inset)",
            }}
          >
            {/* カラーアクセントライン */}
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
              <p className="text-sm font-mono text-pastel-ink/55">// コンボが途切れました</p>
            )}
            {current.explanation && (
              <p className="mt-2 text-sm text-pastel-ink/70 leading-relaxed">
                {current.explanation}
              </p>
            )}
          </div>

          <PushButton type="button" onClick={handleNext} className="w-full">
            {isLast ? "結果を見る" : "次へ →"}
          </PushButton>
        </div>
      )}
    </div>
  );
}
