"use client";

import { useMemo, useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";
import { getQuestionsById } from "@/services/lessonService";
import { shuffle } from "@/lib/utils";
import { setLastSubject } from "@/lib/progress";
import type { Lesson, Question } from "@/types";
import { QuizSession } from "./QuizSession";

type Props = {
  lesson: Lesson;
  questions: Question[];
};

/** レッスン問題の先頭に今日復習すべき問題を混ぜ、問題順をランダムにする */
export function LessonView({ lesson, questions }: Props) {
  const { getDueReviewQuestionIds } = useProgress();

  useEffect(() => {
    if (lesson.subject) setLastSubject(lesson.subject);
  }, [lesson.subject]);

  const shuffledQuestions = useMemo(() => {
    const dueIds = getDueReviewQuestionIds();
    let list: Question[] = questions;
    if (dueIds.length > 0) {
      const lessonIds = new Set(questions.map((q) => q.id));
      const reviewQuestions = getQuestionsById(dueIds).filter(
        (q) => !lessonIds.has(q.id)
      );
      if (reviewQuestions.length > 0) list = [...reviewQuestions, ...questions];
    }
    return shuffle(list);
  }, [questions, getDueReviewQuestionIds]);

  return (
    <QuizSession
      questions={shuffledQuestions}
      lessonId={lesson.id}
      lessonTitle={lesson.title}
      lessonLevel={lesson.level}
    />
  );
}
