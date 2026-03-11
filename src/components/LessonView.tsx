"use client";

import { useMemo, useEffect } from "react";
import { shuffle } from "@/lib/utils";
import { setLastSubject } from "@/lib/progress";
import type { Lesson, Question } from "@/types";
import { QuizSession } from "./QuizSession";

type Props = {
  lesson: Lesson;
  questions: Question[];
};

/** レッスン問題をランダムな順番で出題する */
export function LessonView({ lesson, questions }: Props) {
  useEffect(() => {
    if (lesson.subject) setLastSubject(lesson.subject);
  }, [lesson.subject]);

  const shuffledQuestions = useMemo(() => {
    return shuffle(questions);
  }, [questions]);

  return (
    <QuizSession
      questions={shuffledQuestions}
      lessonId={lesson.id}
      lessonTitle={lesson.title}
      lessonLevel={lesson.level}
    />
  );
}
