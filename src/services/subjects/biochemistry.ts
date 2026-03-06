import type { Question, Lesson } from "@/types";

/** 生化学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const biochemistryQuestions: Question[] = [
  {
    id: "q-biochem-1",
    lessonId: "biochemistry-1",
    text: "糖質の代謝経路のうち、解糖系の最終産物はどれか。",
    options: [
      { id: "a", text: "ピルビン酸" },
      { id: "b", text: "アセチルCoA" },
      { id: "c", text: "乳酸" },
      { id: "d", text: "クエン酸" },
    ],
    correctOptionId: "a",
    explanation: "解糖系はグルコースをピルビン酸まで分解する。嫌気的条件下ではピルビン酸は乳酸に還元される。",
    subject: "生化学",
    order: 1,
  },
];

export const biochemistryLessons: Lesson[] = [
  {
    id: "biochemistry-1",
    title: "生化学 序論",
    questionIds: ["q-biochem-1"],
    subject: "生化学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
