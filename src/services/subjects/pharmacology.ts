import type { Question, Lesson } from "@/types";

/** 薬理学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const pharmacologyQuestions: Question[] = [
  {
    id: "q-pharma-1",
    lessonId: "pharmacology-1",
    text: "アンジオテンシン変換酵素（ACE）阻害薬の主な適応はどれか。",
    options: [
      { id: "a", text: "狭心症" },
      { id: "b", text: "高血圧・心不全" },
      { id: "c", text: "不整脈" },
      { id: "d", text: "気管支喘息" },
    ],
    correctOptionId: "b",
    explanation:
      "ACE阻害薬はレニン-アンジオテンシン系を抑制し、降圧と心負荷軽減により高血圧・心不全に用いられる。",
    subject: "薬理学",
    order: 1,
  },
  {
    id: "q-pharma-2",
    lessonId: "pharmacology-1",
    text: "ワルファリンの作用機序として正しいのはどれか。",
    options: [
      { id: "a", text: "ビタミンK依存性凝固因子の合成阻害" },
      { id: "b", text: "トロンビン直接阻害" },
      { id: "c", text: "Xa因子直接阻害" },
      { id: "d", text: "血小板凝集阻害" },
    ],
    correctOptionId: "a",
    explanation:
      "ワルファリンはビタミンK拮抗薬であり、肝でのビタミンK依存性凝固因子（II, VII, IX, X）の合成を阻害する。",
    subject: "薬理学",
    order: 2,
  },
];

export const pharmacologyLessons: Lesson[] = [
  {
    id: "pharmacology-1",
    title: "薬理学 基礎",
    questionIds: ["q-pharma-1", "q-pharma-2"],
    subject: "薬理学",
    examTag: "医師国家試験",
    order: 4,
    orderInSubject: 1,
    level: 1,
  },
];
