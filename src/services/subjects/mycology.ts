import type { Question, Lesson } from "@/types";

/** 真菌学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const mycologyQuestions: Question[] = [
  {
    id: "q-myco-1",
    lessonId: "mycology-1",
    text: "真菌の細胞壁の主要構成成分はどれか。",
    options: [
      { id: "a", text: "ペプチドグリカン" },
      { id: "b", text: "キチン" },
      { id: "c", text: "セルロース" },
      { id: "d", text: "リポ多糖" },
    ],
    correctOptionId: "b",
    explanation: "真菌の細胞壁は主にキチンとβ-グルカンからなる。ペプチドグリカンは細菌、セルロースは植物に多い。",
    subject: "真菌学",
    order: 1,
  },
];

export const mycologyLessons: Lesson[] = [
  {
    id: "mycology-1",
    title: "真菌学 序論",
    questionIds: ["q-myco-1"],
    subject: "真菌学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
