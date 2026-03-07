"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getQuestionsById } from "@/services/lessonService";
import { QuizSession } from "@/components/QuizSession";

export function ReviewContent() {
  const { getDueReviewQuestionIds } = useProgress();
  const dueIds = getDueReviewQuestionIds();
  const questions = getQuestionsById(dueIds);

  if (questions.length === 0) {
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
      questions={questions}
      lessonId="review"
      lessonTitle={`復習セッション（${questions.length}問）`}
    />
  );
}
