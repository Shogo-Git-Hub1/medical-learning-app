import type { Question, Lesson } from "@/types";

/** 細胞生物学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const cellBiologyQuestions: Question[] = [
  {
    id: "q-cellbio-1",
    lessonId: "cellbiology-1",
    text: "真核細胞の遺伝情報を保持する細胞小器官はどれか。",
    options: [
      { id: "a", text: "核" },
      { id: "b", text: "ミトコンドリア" },
      { id: "c", text: "リボソーム" },
      { id: "d", text: "ゴルジ体" },
    ],
    correctOptionId: "a",
    explanation: "核はDNAを保持し、遺伝情報の保存・複製・転写の場である。",
    subject: "細胞生物学",
    order: 1,
  },
];

export const cellBiologyLessons: Lesson[] = [
  {
    id: "cellbiology-1",
    title: "細胞生物学 序論",
    questionIds: ["q-cellbio-1"],
    subject: "細胞生物学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
