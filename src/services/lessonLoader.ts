import type { Lesson, Question } from "@/types";
import { getSubjectModuleInfo } from "./subjects/lessonIdToSubjectKey";

export type LessonWithQuestions = { lesson: Lesson; questions: Question[] };

/**
 * レッスンIDに該当する科目モジュールを dynamic import し、レッスンと問題一覧を返す。
 * クライアントで科目単位のコード分割が必要な場合に使用する（例: レッスン遅延読み込み）。
 * 通常のレッスンページは getLessonWithQuestions（同期・全科目）のまま SSG で表示。
 */
export async function getLessonWithQuestionsAsync(lessonId: string): Promise<LessonWithQuestions | null> {
  const info = getSubjectModuleInfo(lessonId);
  if (!info) return null;

  // 拡張子を明示（Vitest/Vite の動的 import 静的解析用）。Next.js も解決可能。
  const mod = await import(
    /* webpackChunkName: "subject-[request]" */ `./subjects/${info.key}.ts`
  ) as Record<string, Lesson[] | Question[]>;

  const lessons = mod[info.lessonsExport] as Lesson[] | undefined;
  const questions = mod[info.questionsExport] as Question[] | undefined;
  if (!lessons || !questions) return null;

  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;

  const questionMap = new Map(questions.map((q) => [q.id, q]));
  const lessonQuestions = lesson.questionIds
    .map((id) => questionMap.get(id))
    .filter((q): q is Question => q != null)
    .sort((a, b) => a.order - b.order);

  return { lesson, questions: lessonQuestions };
}
