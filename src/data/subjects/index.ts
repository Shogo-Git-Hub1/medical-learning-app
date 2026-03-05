import type { Question, Lesson } from "@/lib/types";
import { anatomyQuestions, anatomyLessons } from "./anatomy";
import { physiologyQuestions, physiologyLessons } from "./physiology";
import { pharmacologyQuestions, pharmacologyLessons } from "./pharmacology";
import { pathologyQuestions, pathologyLessons } from "./pathology";

/** ロードマップでの分野の表示順（難易度・学習の流れ） */
export const SUBJECT_DISPLAY_ORDER = [
  "解剖学",
  "生理学",
  "薬理学",
  "病理学",
] as const;

const allQuestions: Question[] = [
  ...anatomyQuestions,
  ...physiologyQuestions,
  ...pharmacologyQuestions,
  ...pathologyQuestions,
];

const allLessons: Lesson[] = [
  ...anatomyLessons,
  ...physiologyLessons,
  ...pharmacologyLessons,
  ...pathologyLessons,
];

export { allQuestions as subjectQuestions, allLessons as subjectLessons };
