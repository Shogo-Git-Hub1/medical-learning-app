import type { Question, Lesson } from "@/lib/types";

/** 生理学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const physiologyQuestions: Question[] = [
  {
    id: "q-physio-1",
    lessonId: "physiology-1",
    text: "細胞内でATPを産生する主な細胞小器官はどれか。",
    options: [
      { id: "a", text: "リボソーム" },
      { id: "b", text: "ミトコンドリア" },
      { id: "c", text: "小胞体" },
      { id: "d", text: "ゴルジ体" },
    ],
    correctOptionId: "b",
    explanation:
      "ミトコンドリアは好気性呼吸（クエン酸回路・電子伝達系）によりATPを産生する。",
    subject: "生理学",
    order: 1,
  },
  {
    id: "q-physio-2",
    lessonId: "physiology-1",
    text: "静止膜電位の維持に最も重要なイオンはどれか。",
    options: [
      { id: "a", text: "Na⁺" },
      { id: "b", text: "K⁺" },
      { id: "c", text: "Ca²⁺" },
      { id: "d", text: "Cl⁻" },
    ],
    correctOptionId: "b",
    explanation:
      "細胞内にはK⁺が多く、細胞外にはNa⁺が多い。K⁺の漏れチャネルとNa⁺-K⁺ポンプが静止膜電位（約-70mV）の維持に重要。",
    subject: "生理学",
    order: 2,
  },
  {
    id: "q-physio-3",
    lessonId: "physiology-1",
    text: "酸素解離曲線を右方移動させる要因で正しいのはどれか。",
    options: [
      { id: "a", text: "体温低下" },
      { id: "b", text: "pH上昇" },
      { id: "c", text: "2,3-DPG増加" },
      { id: "d", text: "CO₂分圧低下" },
    ],
    correctOptionId: "c",
    explanation:
      "2,3-DPG（2,3-ジホスホグリセリン酸）の増加、体温上昇、pH低下、CO₂分圧上昇は酸素解離曲線を右方に移動させ、ヘモグロビンの酸素親和性を低下させる。",
    subject: "生理学",
    order: 3,
  },
];

export const physiologyLessons: Lesson[] = [
  {
    id: "physiology-1",
    title: "生理学 細胞",
    questionIds: ["q-physio-1", "q-physio-2", "q-physio-3"],
    subject: "生理学",
    examTag: "医師国家試験",
    order: 3,
    orderInSubject: 1,
  },
];
