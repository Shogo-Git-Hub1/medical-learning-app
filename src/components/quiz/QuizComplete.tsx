"use client";

import type { Lesson } from "@/types";
import { PushButton } from "@/components/ui/PushButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CardWithAccent } from "@/components/ui/CardWithAccent";
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
};

/**
 * クイズ完了画面。スコア表示・次のレッスン／リトライ／ホームへのCTA。
 */
export function QuizComplete({
  lessonTitle,
  lessonId,
  correctCount,
  total,
  isGoodScore,
  showConfetti,
  nextLesson,
}: QuizCompleteProps) {
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <ConfettiEffect active={showConfetti} duration={3000} />

      <CardWithAccent variant="success" container="card-lg" accentGlow className="p-8 text-center">
        <p className="text-[10px] font-mono text-pastel-primary/55 tracking-[0.2em] mb-5 uppercase">
          {"// Lesson Complete"}
        </p>
        <h2 className="text-lg font-bold text-pastel-ink font-nunito">{lessonTitle}</h2>

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

        <div className="mt-4 px-4">
          <ProgressBar
            current={correctCount}
            total={total}
            variant="quiz"
            showLabel={false}
          />
        </div>
      </CardWithAccent>

      <CharacterLine
        characterId="shirin"
        lineKey={isGoodScore ? "lessonCompleteGood" : "lessonComplete"}
        size="sm"
      />

      <div className="space-y-3">
        {isGoodScore && nextLesson ? (
          <PushButton href={`/lesson/${nextLesson.id}?from=/subjects`} className="w-full">
            次のレッスンへ →
          </PushButton>
        ) : !isGoodScore && lessonId !== "review" ? (
          <PushButton href={`/lesson/${lessonId}?from=/subjects`} className="w-full">
            もう一度挑戦 →
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
  );
}
