import type { Question, Lesson } from "@/types";

/** ウイルス学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const virologyQuestions: Question[] = [
  {
    id: "q-virus-1",
    lessonId: "virology-1",
    text: "ウイルスの増殖に必要な宿主の細胞内構造はどれか。",
    options: [
      { id: "a", text: "リボソーム" },
      { id: "b", text: "核" },
      { id: "c", text: "ミトコンドリア" },
      { id: "d", text: "小胞体" },
    ],
    correctOptionId: "a",
    explanation: "ウイルスは自己のリボソームを持たず、宿主のリボソームを使ってタンパク質を合成する。",
    subject: "ウイルス学",
    order: 1,
  },
];

export const virologyLessons: Lesson[] = [
  {
    id: "virology-1",
    title: "ウイルス学 序論",
    questionIds: ["q-virus-1"],
    subject: "ウイルス学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
    level: 1,
  },
];
