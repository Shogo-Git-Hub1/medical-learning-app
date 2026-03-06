import type { Question, Lesson } from "@/types";

/** 解剖学 — 難易度順に orderInSubject を 1, 2, 3... で並べる */
export const anatomyQuestions: Question[] = [
  {
    id: "q-anatomy-1",
    lessonId: "anatomy-1",
    text: "ヒトの体で最も多くの骨が存在する部位はどれか。",
    options: [
      { id: "a", text: "頭蓋" },
      { id: "b", text: "手" },
      { id: "c", text: "脊柱" },
      { id: "d", text: "足" },
    ],
    correctOptionId: "b",
    explanation:
      "手（手根骨・中手骨・指骨を含む）は片手で27個の骨があり、両手で54個。足も同様に多いが、手の方が指の分だけ多い。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-anatomy-2",
    lessonId: "anatomy-1",
    text: "大脳の運動野（一次運動野）が存在する脳葉はどれか。",
    options: [
      { id: "a", text: "前頭葉" },
      { id: "b", text: "頭頂葉" },
      { id: "c", text: "側頭葉" },
      { id: "d", text: "後頭葉" },
    ],
    correctOptionId: "a",
    explanation: "一次運動野は前頭葉の中心前回にあり、随意運動の指令を出す。",
    subject: "解剖学",
    order: 2,
  },
  {
    id: "q-anatomy-3",
    lessonId: "anatomy-1",
    text: "心臓で房室弁が存在する部位の組み合わせとして正しいのはどれか。",
    options: [
      { id: "a", text: "左心房と左心室の間、右心房と右心室の間" },
      { id: "b", text: "左心室と大動脈の間、右心室と肺動脈の間" },
      { id: "c", text: "大静脈と右心房の間" },
      { id: "d", text: "肺静脈と左心房の間" },
    ],
    correctOptionId: "a",
    explanation:
      "房室弁は心房と心室の間にあり、左は僧帽弁、右は三尖弁。大血管との間にあるのは半月弁。",
    subject: "解剖学",
    order: 3,
  },
  {
    id: "q-anatomy-4",
    lessonId: "anatomy-1",
    text: "横隔膜の大動脈裂孔を通過するのはどれか。",
    options: [
      { id: "a", text: "食道" },
      { id: "b", text: "大動脈" },
      { id: "c", text: "奇静脈" },
      { id: "d", text: "迷走神経" },
    ],
    correctOptionId: "b",
    explanation: "大動脈裂孔は第12胸椎の高さにあり、大動脈と胸管が通過する。食道は食道裂孔を通過する。",
    subject: "解剖学",
    order: 4,
  },
  {
    id: "q-anatomy-5",
    lessonId: "anatomy-2",
    text: "関節の分類で橈骨手根関節はどれに属するか。",
    options: [
      { id: "a", text: "球関節" },
      { id: "b", text: "楕円関節" },
      { id: "c", text: "蝶番関節" },
      { id: "d", text: "車軸関節" },
    ],
    correctOptionId: "b",
    explanation: "橈骨手根関節（手関節）は楕円関節で、屈伸・外転・内転が可能。",
    subject: "解剖学",
    order: 1,
  },
  {
    id: "q-anatomy-6",
    lessonId: "anatomy-2",
    text: "脊柱で最も可動性が大きい部位はどれか。",
    options: [
      { id: "a", text: "頸椎" },
      { id: "b", text: "胸椎" },
      { id: "c", text: "腰椎" },
      { id: "d", text: "仙椎" },
    ],
    correctOptionId: "a",
    explanation: "頸椎は可動性が大きく、特に環椎・軸椎の回旋や頸椎全体の屈伸が可能。胸椎は肋骨で可動性が制限される。",
    subject: "解剖学",
    order: 2,
  },
];

export const anatomyLessons: Lesson[] = [
  {
    id: "anatomy-1",
    title: "解剖学 序論",
    questionIds: ["q-anatomy-1", "q-anatomy-2", "q-anatomy-3", "q-anatomy-4"],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 1,
    orderInSubject: 1,
  },
  {
    id: "anatomy-2",
    title: "解剖学 骨・関節の基礎",
    questionIds: ["q-anatomy-5", "q-anatomy-6"],
    subject: "解剖学",
    examTag: "医師国家試験",
    order: 2,
    orderInSubject: 2,
  },
];
