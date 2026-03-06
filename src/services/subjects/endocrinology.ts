import type { Question, Lesson } from "@/types";

/** 内分泌学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const endocrinologyQuestions: Question[] = [
  {
    id: "q-endo-1",
    lessonId: "endocrinology-1",
    text: "血糖値を上昇させるホルモンはどれか。",
    options: [
      { id: "a", text: "インスリン" },
      { id: "b", text: "グルカゴン" },
      { id: "c", text: "ソマトスタチン" },
      { id: "d", text: "GIP" },
    ],
    correctOptionId: "b",
    explanation: "グルカゴンは膵α細胞から分泌され、肝臓でグリコーゲン分解・糖新生を促進し血糖を上昇させる。",
    subject: "内分泌学",
    order: 1,
  },
];

export const endocrinologyLessons: Lesson[] = [
  {
    id: "endocrinology-1",
    title: "内分泌学 序論",
    questionIds: ["q-endo-1"],
    subject: "内分泌学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
