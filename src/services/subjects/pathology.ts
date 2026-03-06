import type { Question, Lesson } from "@/types";

/** 病理学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const pathologyQuestions: Question[] = [
  {
    id: "q-path-1",
    lessonId: "pathology-1",
    text: "壊死のうち、凝固壊死が起こりやすい臓器はどれか。",
    options: [
      { id: "a", text: "心臓" },
      { id: "b", text: "脳" },
      { id: "c", text: "膵臓" },
      { id: "d", text: "肝臓" },
    ],
    correctOptionId: "a",
    explanation:
      "心臓・脾・腎などは凝固壊死を起こしやすい。脳は液化壊死、膵臓は脂肪壊死を起こしやすい。",
    subject: "病理学",
    order: 1,
  },
  {
    id: "q-path-2",
    lessonId: "pathology-1",
    text: "肉芽組織に含まれる細胞でないのはどれか。",
    options: [
      { id: "a", text: "線維芽細胞" },
      { id: "b", text: "血管内皮細胞" },
      { id: "c", text: "好中球" },
      { id: "d", text: "赤血球" },
    ],
    correctOptionId: "d",
    explanation:
      "肉芽組織は線維芽細胞、血管内皮細胞（新生血管）、炎症細胞（好中球・マクロファージなど）からなる。赤血球は血管内に存在する血球であり、肉芽組織の構成細胞ではない。",
    subject: "病理学",
    order: 2,
  },
];

export const pathologyLessons: Lesson[] = [
  {
    id: "pathology-1",
    title: "病理学 序論",
    questionIds: ["q-path-1", "q-path-2"],
    subject: "病理学",
    examTag: "医師国家試験",
    order: 5,
    orderInSubject: 1,
  },
];
