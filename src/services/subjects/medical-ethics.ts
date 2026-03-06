import type { Question, Lesson } from "@/types";

/** 医療倫理 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const medicalEthicsQuestions: Question[] = [
  {
    id: "q-ethics-1",
    lessonId: "medical-ethics-1",
    text: "医療における「インフォームド・コンセント」で最も重要な要素はどれか。",
    options: [
      { id: "a", text: "医師の専門的判断の説明" },
      { id: "b", text: "患者の理解に基づく同意" },
      { id: "c", text: "家族の同意" },
      { id: "d", text: "診療録への記載" },
    ],
    correctOptionId: "b",
    explanation: "インフォームド・コンセントは、十分な説明を受けた上で患者が理解し、自発的に同意することが本質である。",
    subject: "医療倫理",
    order: 1,
  },
];

export const medicalEthicsLessons: Lesson[] = [
  {
    id: "medical-ethics-1",
    title: "医療倫理 序論",
    questionIds: ["q-ethics-1"],
    subject: "医療倫理",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
