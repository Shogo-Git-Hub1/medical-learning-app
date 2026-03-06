import type { Question, Lesson } from "@/types";

/** 遺伝子医学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const geneticMedicineQuestions: Question[] = [
  {
    id: "q-genetic-1",
    lessonId: "genetic-medicine-1",
    text: "常染色体優性遺伝の特徴として正しいのはどれか。",
    options: [
      { id: "a", text: "両親のどちらかが罹患者であれば子に50%の確率で発症" },
      { id: "b", text: "男女で発症率に差がある" },
      { id: "c", text: "近親婚で発症率が上昇する" },
      { id: "d", text: "保因者では症状が発現しない" },
    ],
    correctOptionId: "a",
    explanation: "常染色体優性遺伝では、罹患者の子はヘテロ接合で50%の確率で罹患遺伝子を受け継ぎ発症する。",
    subject: "遺伝子医学",
    order: 1,
  },
];

export const geneticMedicineLessons: Lesson[] = [
  {
    id: "genetic-medicine-1",
    title: "遺伝子医学 序論",
    questionIds: ["q-genetic-1"],
    subject: "遺伝子医学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
