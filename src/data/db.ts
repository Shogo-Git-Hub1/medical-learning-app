import type { QuestionDatabase } from "@/lib/types";
import { subjectQuestions, subjectLessons, SUBJECT_DISPLAY_ORDER } from "./subjects";

/**
 * 構造化された問題データベース
 * 分野ごとに data/subjects/*.ts で管理し、ここで集約
 */
export const questionDb: QuestionDatabase = {
  questions: subjectQuestions,
  lessons: subjectLessons,
};

/** 問題ID → 問題のマップ（検索用） */
export function getQuestionsById(ids: string[]) {
  const map = new Map(questionDb.questions.map((q) => [q.id, q]));
  return ids
    .map((id) => map.get(id))
    .filter((q): q is NonNullable<typeof q> => q != null)
    .sort((a, b) => a.order - b.order);
}

/** レッスンIDでレッスンとその問題一覧を取得 */
export function getLessonWithQuestions(lessonId: string) {
  const lesson = questionDb.lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  const questions = getQuestionsById(lesson.questionIds);
  return { lesson, questions };
}

/** 全レッスンを取得（分野順・分野内は orderInSubject 順） */
export function getAllLessons() {
  const bySubject = getLessonsGroupedBySubject();
  const result: typeof questionDb.lessons = [];
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lessons = bySubject[subject];
    if (lessons) result.push(...lessons);
  }
  return result;
}

/**
 * 分野ごとにレッスンをまとめ、各分野内は orderInSubject（難易度順）でソート
 * ロードマップで「解剖学 → 生理学 → …」の連なりを表示するために使用
 */
export function getLessonsGroupedBySubject(): Record<string, typeof questionDb.lessons> {
  const map: Record<string, typeof questionDb.lessons> = {};
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lessons = questionDb.lessons
      .filter((l) => l.subject === subject)
      .sort((a, b) => a.orderInSubject - b.orderInSubject);
    if (lessons.length > 0) map[subject] = lessons;
  }
  return map;
}

/** 科目でフィルタしたレッスン一覧（分野内は orderInSubject 順） */
export function getLessonsBySubject(subject: string | null) {
  const all = getAllLessons();
  if (!subject) return all;
  return all.filter((l) => l.subject === subject);
}

/** 試験タグでフィルタしたレッスン一覧 */
export function getLessonsByExamTag(examTag: string | null) {
  const all = getAllLessons();
  if (!examTag) return all;
  return all.filter((l) => l.examTag === examTag);
}

/** 科目＋試験タグの両方でフィルタ（指定がなければその条件は無視） */
export function getLessonsFiltered(subject: string | null, examTag: string | null) {
  let list = getAllLessons();
  if (subject) list = list.filter((l) => l.subject === subject);
  if (examTag) list = list.filter((l) => l.examTag === examTag);
  return list;
}

/** 実際に使われている科目一覧（レッスンから抽出） */
export function getSubjectsInUse(): string[] {
  const set = new Set(questionDb.lessons.map((l) => l.subject).filter(Boolean));
  return [...set] as string[];
}

/** 実際に使われている試験タグ一覧（レッスンから抽出） */
export function getExamTagsInUse(): string[] {
  const set = new Set(questionDb.lessons.map((l) => l.examTag).filter(Boolean));
  return [...set] as string[];
}

export { SUBJECT_DISPLAY_ORDER };
