/**
 * レッスンIDのプレフィックス → 科目モジュール情報。
 * getLessonWithQuestionsAsync で dynamic import する際に使用し、
 * レッスンページのクライアントバンドルを科目単位で分割する。
 * モジュール一覧は subjectRegistry を参照する。
 */

import {
  getSubjectModuleInfoByPrefix,
  type SubjectModuleInfo,
} from "./subjectRegistry";

export type { SubjectModuleInfo };

function getPrefix(lessonId: string): string {
  const lastDash = lessonId.lastIndexOf("-");
  if (lastDash <= 0) return lessonId;
  const suffix = lessonId.slice(lastDash + 1);
  if (/^\d+$/.test(suffix)) return lessonId.slice(0, lastDash);
  return lessonId;
}

export function getSubjectModuleInfo(lessonId: string): SubjectModuleInfo | null {
  const prefix = getPrefix(lessonId);
  return getSubjectModuleInfoByPrefix(prefix);
}
