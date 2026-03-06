import type { Question, Lesson } from "@/types";

/** 免疫学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const immunologyQuestions: Question[] = [
  {
    id: "q-immuno-1",
    lessonId: "immunology-1",
    text: "液性免疫を担う主な細胞はどれか。",
    options: [
      { id: "a", text: "B細胞" },
      { id: "b", text: "T細胞" },
      { id: "c", text: "NK細胞" },
      { id: "d", text: "マクロファージ" },
    ],
    correctOptionId: "a",
    explanation: "B細胞は抗体を産生し、液性免疫を担う。T細胞は細胞性免疫を担う。",
    subject: "免疫学",
    order: 1,
  },
];

export const immunologyLessons: Lesson[] = [
  {
    id: "immunology-1",
    title: "免疫学 序論",
    questionIds: ["q-immuno-1"],
    subject: "免疫学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
