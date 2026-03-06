import type { Question, Lesson } from "@/types";

/** 微生物学総論 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const microbiologyQuestions: Question[] = [
  {
    id: "q-micro-1",
    lessonId: "microbiology-1",
    text: "原核生物に分類されるのはどれか。",
    options: [
      { id: "a", text: "細菌" },
      { id: "b", text: "真菌" },
      { id: "c", text: "原虫" },
      { id: "d", text: "ウイルス" },
    ],
    correctOptionId: "a",
    explanation: "細菌は核膜のない原核生物。真菌・原虫は真核生物。ウイルスは非細胞性の微生物である。",
    subject: "微生物学総論",
    order: 1,
  },
];

export const microbiologyLessons: Lesson[] = [
  {
    id: "microbiology-1",
    title: "微生物学総論 序論",
    questionIds: ["q-micro-1"],
    subject: "微生物学総論",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
