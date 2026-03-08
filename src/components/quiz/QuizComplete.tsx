"use client";

import { useState, useEffect } from "react";
import type { Lesson } from "@/types";
import { PushButton } from "@/components/ui/PushButton";
import { CharacterLine } from "@/components/CharacterLine";
import { ConfettiEffect } from "@/components/ConfettiEffect";

export type QuizCompleteProps = {
  lessonTitle: string;
  lessonId: string;
  correctCount: number;
  total: number;
  isGoodScore: boolean;
  showConfetti: boolean;
  /** ロードマップ順の次のレッスン（getNextLessonAfter の戻り値） */
  nextLesson: Lesson | null;
  /** セッション中の最大連続正解数 */
  maxCombo?: number;
  /** もう一度挑戦ボタン押下時のコールバック */
  onRetry?: () => void;
};

/** 正答率からスター数（1〜3）を計算 */
function getStarCount(pct: number): 1 | 2 | 3 {
  if (pct >= 80) return 3;
  if (pct >= 60) return 2;
  return 1;
}

/** 0 → target へのカウントアップアニメーション */
function useCountUp(target: number, durationMs = 900, delayMs = 350): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    let rafId: number;
    const startTimeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setValue(Math.round(eased * target));
        if (t < 1) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }, delayMs);
    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [target, durationMs, delayMs]);
  return value;
}

/**
 * クイズ完了画面。
 * - スター評価（1〜3）をアニメーション付きで表示
 * - 正答率を 0% からカウントアップ
 * - 最大コンボを表示（3以上のとき）
 * - 次のレッスン／もう一度挑戦／ホームへのCTA
 */
export function QuizComplete({
  lessonTitle,
  lessonId,
  correctCount,
  total,
  isGoodScore,
  showConfetti,
  nextLesson,
  maxCombo = 0,
  onRetry,
}: QuizCompleteProps) {
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const displayPct = useCountUp(pct, 900, 350);
  const starCount = getStarCount(pct);

  return (
    <>
      <style>{`
        @keyframes star-pop {
          0%   { transform: scale(0) rotate(-24deg); opacity: 0; }
          62%  { transform: scale(1.28) rotate(7deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes score-glow-pulse {
          0%, 100% { text-shadow: 0 0 22px rgba(88,204,2,0.52), 0 0 44px rgba(88,204,2,0.22); }
          50%       { text-shadow: 0 0 34px rgba(88,204,2,0.78), 0 0 64px rgba(88,204,2,0.38); }
        }
        @keyframes combo-badge-in {
          0%   { transform: scale(0.7) translateY(8px); opacity: 0; }
          70%  { transform: scale(1.06) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="space-y-6 animate-fade-in-up">
        <ConfettiEffect active={showConfetti} duration={3000} />

        {/* ─── スコアセクション ─────────────────────────────────── */}
        <div className="text-center space-y-5 pt-6">
          {/* レッスン名 */}
          <p className="text-sm font-semibold font-nunito text-pastel-ink/38 truncate px-6">
            {lessonTitle}
          </p>

          {/* スター評価 */}
          <div
            className="flex justify-center gap-3"
            role="img"
            aria-label={`評価: ${starCount} / 3スター`}
          >
            {([0, 1, 2] as const).map((i) => {
              const filled = i < starCount;
              return (
                <span
                  key={i}
                  style={{
                    fontSize: "2.75rem",
                    display: "inline-block",
                    color: filled ? "#FFD700" : "rgba(0,0,0,0.12)",
                    filter: filled
                      ? "drop-shadow(0 0 9px rgba(255,200,0,0.75))"
                      : "none",
                    animation: `star-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${360 + i * 165}ms both`,
                  }}
                  aria-hidden
                >
                  ★
                </span>
              );
            })}
          </div>

          {/* スコア */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-end gap-1 leading-none">
              <span
                className="font-bold font-nunito text-pastel-primary"
                style={{
                  fontSize: "5.75rem",
                  lineHeight: 1,
                  textShadow:
                    "0 0 22px rgba(88,204,2,0.52), 0 0 44px rgba(88,204,2,0.22)",
                  animation: "score-glow-pulse 2.2s ease-in-out 1.3s infinite",
                }}
                aria-label={`${pct}パーセント`}
              >
                {displayPct}
              </span>
              <span
                className="font-bold font-nunito text-pastel-primary pb-2"
                style={{
                  fontSize: "2.5rem",
                  opacity: 0.72,
                  textShadow: "0 0 16px rgba(88,204,2,0.4)",
                }}
                aria-hidden
              >
                %
              </span>
            </div>
            <span className="text-sm text-pastel-ink/45 font-mono">
              {correctCount} / {total} 問正解
            </span>
          </div>

          {/* 最大コンボバッジ（3以上のとき表示） */}
          {maxCombo >= 3 && (
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
              style={{
                background: "rgba(255,200,0,0.12)",
                border: "1.5px solid rgba(255,200,0,0.38)",
                animation: "combo-badge-in 0.5s cubic-bezier(0.34,1.56,0.64,1) 1.1s both",
              }}
            >
              <span aria-hidden className="text-base leading-none">🔥</span>
              <span
                className="text-sm font-bold font-nunito"
                style={{ color: "#d97706" }}
              >
                最大コンボ {maxCombo}
              </span>
            </div>
          )}
        </div>

        {/* ─── キャラクターコメント ──────────────────────────────── */}
        <CharacterLine
          characterId="shirin"
          lineKey={isGoodScore ? "lessonCompleteGood" : "lessonComplete"}
          size="sm"
        />

        {/* ─── CTAボタン ────────────────────────────────────────── */}
        <div className="space-y-3">
          {isGoodScore && nextLesson ? (
            <PushButton
              href={`/lesson/${nextLesson.id}?from=/subjects`}
              className="w-full"
            >
              次のレッスンへ
            </PushButton>
          ) : !isGoodScore && lessonId !== "review" ? (
            <PushButton
              onClick={onRetry}
              className="w-full"
            >
              もう一度挑戦
            </PushButton>
          ) : null}

          <div className="flex gap-3">
            <PushButton href="/subjects" variant="outline" className="flex-1">
              科目一覧へ
            </PushButton>
            <PushButton href="/" variant="outline" className="flex-1">
              ホーム
            </PushButton>
          </div>
        </div>
      </div>
    </>
  );
}
