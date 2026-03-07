"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";
import {
  getQuestionsById,
  getDueReviewQuestionIdsThatExist,
} from "@/services/lessonService";
import { QuizSession } from "@/components/QuizSession";
import type { Question } from "@/types";

export function ReviewContent() {
  const [questions, setQuestions] = useState<Question[] | null>(null);

  useEffect(() => {
    const { progress } = loadProgress();
    const dueIds = getDueReviewQuestionIdsThatExist(progress);
    setQuestions(getQuestionsById(dueIds));
  }, []);

  if (questions === null) {
    return (
      <div className="neu-inset rounded-2xl p-10 text-center animate-fade-in-up">
        <p className="text-pastel-ink/70 text-sm font-nunito">読み込み中…</p>
      </div>
    );
  }

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
