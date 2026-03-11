import type { QuestionDatabase, Lesson, Question } from "@/types";
import { getToday } from "@/lib/progress";
import type { UserProgress, LastLessonResult } from "@/lib/progress";
import { subjectQuestions, subjectLessons, SUBJECT_DISPLAY_ORDER } from "./subjects";

/** 復習セッションで一度に出題する問題数 */
export const REVIEW_BATCH_SIZE = 10;

/**
 * 構造化された問題データベース
 * 分野ごとに services/subjects/*.ts で管理し、ここで集約
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

/**
 * 今日復習対象の問題を nextReview が古い順（最も長く放置されたものを優先）で返す。
 * 復習セッションのバッチ表示と、ホームの件数カウントの両方で使用する唯一の正規ロジック。
 */
export function getDueReviewQuestionsSortedByOldest(progress: UserProgress): Question[] {
  const today = getToday();
  // nextReview が古い順にソートした ID リストを作成
  const sortedIds = Object.entries(progress.questionReviews)
    .filter(([, r]) => r.nextReview <= today)
    .sort(([, a], [, b]) => a.nextReview.localeCompare(b.nextReview))
    .map(([id]) => id);
  // DB に存在する問題のみ取得。ソート順を維持するため getQuestionsById（order ソート）は使わない
  const questionMap = new Map(questionDb.questions.map((q) => [q.id, q]));
  return sortedIds
    .map((id) => questionMap.get(id))
    .filter((q): q is NonNullable<typeof q> => q != null);
}

/**
 * 今日復習対象かつ問題DBに存在する問題ID一覧。
 * ホームの件数表示で使用。getDueReviewQuestionsSortedByOldest の薄いラッパー。
 */
export function getDueReviewQuestionIdsThatExist(progress: UserProgress): string[] {
  return getDueReviewQuestionsSortedByOldest(progress).map((q) => q.id);
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

/** ロードマップの段階（1〜15） */
export const ROADMAP_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

/**
 * 分野ごとにレッスンをまとめ、各分野内は level → orderInSubject 順でソート
 * ロードマップで「解剖学 → 生理学 → …」の連なりとレベル1〜15を表示するために使用
 */
export function getLessonsGroupedBySubject(): Record<string, typeof questionDb.lessons> {
  const map: Record<string, typeof questionDb.lessons> = {};
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lessons = questionDb.lessons
      .filter((l) => l.subject === subject)
      .sort((a, b) => (a.level - b.level) || (a.orderInSubject - b.orderInSubject));
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

/**
 * ロードマップ順で、指定レッスンの直後のレッスンを返す。
 * review や存在しない lessonId の場合は null。最後のレッスンの次も null。
 */
export function getNextLessonAfter(lessonId: string): (typeof questionDb.lessons)[0] | null {
  if (lessonId === "review") return null;
  const grouped = getLessonsGroupedBySubject();
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lessons = grouped[subject] ?? [];
    const idx = lessons.findIndex((l) => l.id === lessonId);
    if (idx !== -1 && idx < lessons.length - 1) return lessons[idx + 1];
  }
  return null;
}

export type LessonState = { done: boolean; locked: boolean };

/**
 * レッスン一覧と完了IDから、各レッスンの done / locked 状態を返す。
 * SubjectRoadmap と SubjectNodes で同じロジックを共有する。
 */
export function getLessonStates(lessons: Lesson[], completedIds: string[]): LessonState[] {
  return lessons.map((lesson, i) => {
    const done = completedIds.includes(lesson.id);
    const allPrevDone =
      i === 0 || lessons.slice(0, i).every((l) => completedIds.includes(l.id));
    return { done, locked: !allPrevDone };
  });
}

/**
 * 現在取り組むべきレッスンのインデックス（0-based）。
 * すべて完了またはすべてロックの場合は -1。
 */
export function getCurrentLessonIndex(lessons: Lesson[], completedIds: string[]): number {
  const states = getLessonStates(lessons, completedIds);
  return states.findIndex((s) => !s.done && !s.locked);
}

/** 実際に使われている科目一覧（SUBJECT_DISPLAY_ORDER 順） */
export function getSubjectsInUse(): string[] {
  const set = new Set(questionDb.lessons.map((l) => l.subject).filter(Boolean));
  return SUBJECT_DISPLAY_ORDER.filter((s) => set.has(s));
}

/** 実際に使われている試験タグ一覧（レッスンから抽出） */
export function getExamTagsInUse(): string[] {
  const set = new Set(questionDb.lessons.map((l) => l.examTag).filter(Boolean));
  return [...set] as string[];
}

// ─── 推薦レッスン（今日のレッスン表示用） ───────────────────────────────────────
export type Recommendation =
  | { kind: "next" | "retry"; lesson: Lesson; subject: string; lastAccuracy?: number }
  | { kind: "mastered"; subject: string; nextSubject: string | null }
  | { kind: "allDone" };

/**
 * ロードマップ順で最初の未完了レッスンを返す。
 */
export function firstUncompleted(
  progress: UserProgress,
  grouped: Record<string, Lesson[]>
): Recommendation {
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lessons = grouped[subject] ?? [];
    for (let i = 0; i < lessons.length; i++) {
      if (progress.completedLessonIds.includes(lessons[i].id)) continue;
      const allPrevDone =
        i === 0 || lessons.slice(0, i).every((l) => progress.completedLessonIds.includes(l.id));
      if (allPrevDone) return { kind: "next", lesson: lessons[i], subject };
    }
  }
  return { kind: "allDone" };
}

/**
 * 前回結果と進捗から、今日おすすめのレッスン（次・リトライ・科目修了・全完了）を返す。
 */
export function findRecommendedLesson(
  progress: UserProgress,
  lastResult: LastLessonResult | null
): Recommendation {
  const grouped = getLessonsGroupedBySubject();
  if (!lastResult) return firstUncompleted(progress, grouped);

  const { lessonId, accuracy } = lastResult;
  let foundLesson: Lesson | null = null;
  let foundSubject: string | null = null;
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lesson = (grouped[subject] ?? []).find((l) => l.id === lessonId);
    if (lesson) {
      foundLesson = lesson;
      foundSubject = subject;
      break;
    }
  }

  if (!foundLesson || !foundSubject) return firstUncompleted(progress, grouped);

  if (accuracy < 0.8) {
    if (progress.completedLessonIds.includes(foundLesson.id)) {
      return firstUncompleted(progress, grouped);
    }
    return { kind: "retry", lesson: foundLesson, subject: foundSubject, lastAccuracy: accuracy };
  }

  const nextLesson = getNextLessonAfter(lessonId);
  if (!nextLesson) {
    const nextSubjectIdx = SUBJECT_DISPLAY_ORDER.findIndex((s) => s === foundSubject) + 1;
    const nextSubject =
      nextSubjectIdx < SUBJECT_DISPLAY_ORDER.length ? SUBJECT_DISPLAY_ORDER[nextSubjectIdx] : null;
    return { kind: "mastered", subject: foundSubject, nextSubject };
  }
  if (progress.completedLessonIds.includes(nextLesson.id)) {
    return firstUncompleted(progress, grouped);
  }
  return { kind: "next", lesson: nextLesson, subject: foundSubject };
}

export { SUBJECT_DISPLAY_ORDER };
