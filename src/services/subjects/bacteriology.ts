import type { Question, Lesson } from "@/types";

/** 細菌学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const bacteriologyQuestions: Question[] = [
  {
    id: "q-bact-1",
    lessonId: "bacteriology-1",
    text: "グラム陽性菌の細胞壁に特異的に含まれる成分はどれか。",
    options: [
      { id: "a", text: "ペプチドグリカン" },
      { id: "b", text: "テイコ酸" },
      { id: "c", text: "リポ多糖" },
      { id: "d", text: "外膜" },
    ],
    correctOptionId: "b",
    explanation: "テイコ酸はグラム陽性菌の細胞壁に特異的。リポ多糖（LPS）と外膜はグラム陰性菌に特徴的。",
    subject: "細菌学",
    order: 1,
  },
];

export const bacteriologyLessons: Lesson[] = [
  {
    id: "bacteriology-1",
    title: "細菌学 序論",
    questionIds: ["q-bact-1"],
    subject: "細菌学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
