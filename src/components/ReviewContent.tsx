"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { loadProgress } from "@/lib/progress";
import {
  getDueReviewQuestionsSortedByOldest,
  REVIEW_BATCH_SIZE,
} from "@/services/lessonService";
import { QuizSession } from "@/components/QuizSession";
import type { Question } from "@/types";

export function ReviewContent() {
  const [batchQuestions, setBatchQuestions] = useState<Question[] | null>(null);
  const [remainingCount, setRemainingCount] = useState(0);
  // key をインクリメントすることで QuizSession を完全に再マウントしてバッチを切り替える
  const [sessionKey, setSessionKey] = useState(0);

  const loadBatch = useCallback(() => {
    const { progress } = loadProgress();
    const allDue = getDueReviewQuestionsSortedByOldest(progress);
    const batch = allDue.slice(0, REVIEW_BATCH_SIZE);
    setBatchQuestions(batch);
    setRemainingCount(Math.max(0, allDue.length - batch.length));
  }, []);

  useEffect(() => {
    loadBatch();
  }, [loadBatch]);

  // QuizComplete の「次の復習問題へ」ボタンから呼ばれる
  const handleNextBatch = useCallback(() => {
    loadBatch();
    setSessionKey((k) => k + 1);
  }, [loadBatch]);

  if (batchQuestions === null) {
    return (
      <div className="neu-inset rounded-2xl p-10 text-center animate-fade-in-up">
        <p className="text-pastel-ink/70 text-sm font-nunito">読み込み中…</p>
      </div>
    );
  }

  if (batchQuestions.length === 0) {
    return (
      <div className="neu-inset rounded-2xl p-10 text-center space-y-3 animate-fade-in-up">
        <p className="text-5xl select-none">✅</p>
        <p className="font-bold text-pastel-ink text-base font-nunito">今日の復習は完了です</p>
        <p className="text-sm text-pastel-ink/50">また明日確認しよう</p>
        <Link
          href="/"
          className="inline-block mt-3 text-sm font-bold font-nunito"
          style={{ color: "var(--pastel-primary)" }}
        >
          ホームに戻る →
        </Link>
      </div>
    );
  }

  return (
    <QuizSession
      key={sessionKey}
      questions={batchQuestions}
      lessonId="review"
      lessonTitle={`復習セッション（${batchQuestions.length}問）`}
      backHref="/"
      remainingReviewCount={remainingCount}
      onNextReviewBatch={handleNextBatch}
      initialShowIntro={sessionKey === 0}
    />
  );
}
