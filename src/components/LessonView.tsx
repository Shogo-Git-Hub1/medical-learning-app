"use client";

import { useMemo } from "react";
import { useProgress } from "@/hooks/useProgress";
import { getQuestionsById } from "@/services/lessonService";
import type { Lesson, Question } from "@/types";
import { QuizSession } from "./QuizSession";

type Props = {
  lesson: Lesson;
  questions: Question[];
};

/** レッスン問題の先頭に、今日復習すべき問題を混ぜる */
export function LessonView({ lesson, questions }: Props) {
  const { getDueReviewQuestionIds } = useProgress();

  const questionsWithReview = useMemo(() => {
    const dueIds = getDueReviewQuestionIds();
    if (dueIds.length === 0) return questions;

    const lessonIds = new Set(questions.map((q) => q.id));
    const reviewQuestions = getQuestionsById(dueIds).filter(
      (q) => !lessonIds.has(q.id)
    );
    if (reviewQuestions.length === 0) return questions;

    return [...reviewQuestions, ...questions];
  }, [questions, getDueReviewQuestionIds]);

  return (
    <QuizSession
      questions={questionsWithReview}
      lessonId={lesson.id}
      lessonTitle={lesson.title}
    />
  );
}
