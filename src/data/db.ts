import type { QuestionDatabase } from "@/lib/types";

/**
 * 構造化された問題データベース
 * のちに API / Supabase 等に差し替え可能
 */
export const questionDb: QuestionDatabase = {
  questions: [
    {
      id: "q-anatomy-1",
      lessonId: "1",
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
      lessonId: "1",
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
      lessonId: "1",
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
      id: "q-physio-1",
      lessonId: "2",
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
      lessonId: "2",
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
      id: "q-pharma-1",
      lessonId: "3",
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
  ],
  lessons: [
    { id: "1", title: "解剖学 序論", questionIds: ["q-anatomy-1", "q-anatomy-2", "q-anatomy-3"], subject: "解剖学", examTag: "医師国家試験", order: 1 },
    { id: "2", title: "生理学 細胞", questionIds: ["q-physio-1", "q-physio-2"], subject: "生理学", examTag: "医師国家試験", order: 2 },
    { id: "3", title: "薬理学 基礎", questionIds: ["q-pharma-1"], subject: "薬理学", examTag: "医師国家試験", order: 3 },
  ],
};

/** 問題ID → 問題のマップ（検索用） */
export function getQuestionsById(ids: string[]) {
  const map = new Map(questionDb.questions.map((q) => [q.id, q]));
  return ids
    .map((id) => map.get(id))
    .filter((q): q is NonNullable<typeof q> => q != null)
    .sort((a, b) => a.order - b.order);
}

/** レッスンIDでレッスンとその問題一覧を取得 */
export function getLessonWithQuestions(lessonId: string) {
  const lesson = questionDb.lessons.find((l) => l.id === lessonId);
  if (!lesson) return null;
  const questions = getQuestionsById(lesson.questionIds);
  return { lesson, questions };
}

/** 全レッスンをロードマップ順で取得 */
export function getAllLessons() {
  return [...questionDb.lessons].sort((a, b) => a.order - b.order);
}

/** 科目でフィルタしたレッスン一覧 */
export function getLessonsBySubject(subject: string | null) {
  const all = getAllLessons();
  if (!subject) return all;
  return all.filter((l) => l.subject === subject);
}

/** 試験タグでフィルタしたレッスン一覧 */
export function getLessonsByExamTag(examTag: string | null) {
  const all = getAllLessons();
  if (!examTag) return all;
  return all.filter((l) => l.examTag === examTag);
}

/** 科目＋試験タグの両方でフィルタ（指定がなければその条件は無視） */
export function getLessonsFiltered(subject: string | null, examTag: string | null) {
  let list = getAllLessons();
  if (subject) list = list.filter((l) => l.subject === subject);
  if (examTag) list = list.filter((l) => l.examTag === examTag);
  return list;
}

/** 実際に使われている科目一覧（レッスンから抽出） */
export function getSubjectsInUse(): string[] {
  const set = new Set(questionDb.lessons.map((l) => l.subject).filter(Boolean));
  return [...set] as string[];
}

/** 実際に使われている試験タグ一覧（レッスンから抽出） */
export function getExamTagsInUse(): string[] {
  const set = new Set(questionDb.lessons.map((l) => l.examTag).filter(Boolean));
  return [...set] as string[];
}
