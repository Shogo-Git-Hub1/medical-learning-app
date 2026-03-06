import type { Question, Lesson } from "@/types";

/** 組織学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const histologyQuestions: Question[] = [
  {
    id: "q-hist-1",
    lessonId: "histology-1",
    text: "上皮組織の分類で、血管壁の内側を覆う単層の上皮はどれか。",
    options: [
      { id: "a", text: "単層扁平上皮" },
      { id: "b", text: "単層立方上皮" },
      { id: "c", text: "単層円柱上皮" },
      { id: "d", text: "重層扁平上皮" },
    ],
    correctOptionId: "a",
    explanation: "血管の内腔を覆う内皮は単層扁平上皮である。物質の透過に適している。",
    subject: "組織学",
    order: 1,
  },
];

export const histologyLessons: Lesson[] = [
  {
    id: "histology-1",
    title: "組織学 序論",
    questionIds: ["q-hist-1"],
    subject: "組織学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
