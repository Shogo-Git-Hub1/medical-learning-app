/**
 * ナビゲーターキャラクターのデータ・台詞・進化ロジック
 * 仕様: docs/CHARACTERS.md
 */

import type {
  CharacterId,
  CharacterLineKey,
  CharacterProfile,
  CharacterStage,
  RegiShirinStage,
  SkarunStage,
} from "@/types/characters";

/** 3人分のプロフィール */
export const CHARACTER_PROFILES: Record<CharacterId, CharacterProfile> = {
  skurun: {
    id: "skurun",
    name: "スカルン",
    role: "癒やし・共感",
    description:
      "レジ先生の人体模型に魂が宿った存在。自分の骨の名前を忘れる抜けた愛されキャラ。",
  },
  regi: {
    id: "regi",
    name: "レジ先生",
    role: "論理・解説",
    description:
      "ぶかぶかの白衣がトレードマークの研修医。クールで教え上手だが、まだ半人前でドジな一面も。",
  },
  shirin: {
    id: "shirin",
    name: "シリンちゃん",
    role: "鼓舞・スケジュール",
    description:
      "特大の注射器ペンを持ったナース。明るくパワフルで、学習のペースメーカー。",
  },
};

/** スカルンのレベル→ステージ（Lv.1〜4=bone, 5〜9=muscle, 10〜19=nerve, 20〜=full） */
const SKARUN_LEVEL_THRESHOLDS: { level: number; stage: SkarunStage }[] = [
  { level: 20, stage: "full" },
  { level: 10, stage: "nerve" },
  { level: 5, stage: "muscle" },
  { level: 1, stage: "bone" },
];

/** レジ・シリンのレベル→ステージ（Lv.1〜9=trainee, 10〜=full） */
const REGI_SHIRIN_LEVEL_THRESHOLD = 10;

/** 3人並び画像（左→スカルン、中央→レジ先生、右→シリンちゃん） */
export const NAVIGATORS_IMAGE_PATH = "/characters/navigators.png";

/** キャラクターの画像内での並び順（スプライト用） */
export const CHARACTER_ORDER: CharacterId[] = ["skurun", "regi", "shirin"];

/**
 * ユーザーレベルからキャラクターの見た目ステージを返す
 */
export function getCharacterStage(
  characterId: CharacterId,
  userLevel: number
): CharacterStage {
  const level = Math.max(1, userLevel);
  if (characterId === "skurun") {
    const entry = SKARUN_LEVEL_THRESHOLDS.find((e) => level >= e.level);
    return (entry?.stage ?? "bone") as SkarunStage;
  }
  return level >= REGI_SHIRIN_LEVEL_THRESHOLD ? "full" : "trainee";
}

/**
 * 台詞リスト（キー → キャラID → 文言の配列。複数ある場合はランダムで1つ選ぶ想定）
 */
type LineEntry = Partial<Record<CharacterId, string[]>>;

const LINES: Record<CharacterLineKey, LineEntry> = {
  homeGreeting: {
    skurun: ["今日も一緒に頑張ろう！", "えへへ、ぼくも勉強するよ！"],
    shirin: ["今日も一緒に頑張ってメモるよ！", "ここはテストに出るよ！"],
  },
  quizCorrect: {
    skurun: [
      "正解！！ よくやった！",
      "正解！！ ナイス！",
      "その通り！！ すごい！",
      "正解！！ その調子！",
      "バッチリ！！",
      "正解！！ いいね！",
      "ピンポン！！ 正解！",
      "正解！！ さすが！",
    ],
  },
  quizWrong: {
    skurun: [
      "うわぁ…一緒に復習しよう！",
      "大丈夫、次は覚えよう！",
      "えへへ、ぼくもよく間違えるよ…",
    ],
    regi: ["正解は「{correct}」だ。次は覚えておこう。"],
  },
  lessonComplete: {
    shirin: ["おつかれさま！ ここテストに出るよ！", "おつかれさま！ また一緒にやろうね！"],
  },
  lessonCompleteGood: {
    shirin: ["すごい！！ その調子！！", "ほぼ全問正解！！ さすが！！"],
    skurun: ["やったね！！ バラバラになって喜んでる！！"],
  },
  roadmapHint: {
    shirin: ["次はここをやろう！", "このレッスン、おすすめだよ！"],
    skurun: ["ここ、一緒にやろう！"],
  },
  browseRecommend: {
    shirin: ["シリンちゃんのオススメ"],
  },
  contactThanks: {
    shirin: ["報告ありがとう！ 助かるよ！"],
    regi: ["報告ありがとう。確認する。"],
  },
  regiExplanation: {
    regi: ["正解は「{correct}」です。"],
  },
};

/**
 * 指定キー・キャラの台詞を1つ取得（複数ある場合はランダム）
 * プレースホルダー {correct}, {explanation} は呼び出し側で置換すること
 */
export function getCharacterLine(
  lineKey: CharacterLineKey,
  characterId: CharacterId,
  replacements?: { correct?: string; explanation?: string }
): string {
  const entry = LINES[lineKey][characterId];
  const list = Array.isArray(entry) ? entry : entry ? [entry] : [];
  const raw =
    list.length > 0 ? list[Math.floor(Math.random() * list.length)] : "";
  if (!replacements) return raw;
  let out = raw;
  if (replacements.correct !== undefined)
    out = out.replace(/\{correct\}/g, replacements.correct);
  if (replacements.explanation !== undefined)
    out = out.replace(/\{explanation\}/g, replacements.explanation);
  return out;
}

/**
 * 正解時メッセージ（スカルン・複数から1つ）。既存 QuizSession の CORRECT_MESSAGES と同等
 */
export function getQuizCorrectMessage(): string {
  return getCharacterLine("quizCorrect", "skurun");
}

/**
 * 不正解時メッセージ（スカルン）
 */
export function getQuizWrongMessage(): string {
  return getCharacterLine("quizWrong", "skurun");
}

/**
 * レジ先生の解説用台詞（正解テキストを埋め込む）
 */
export function getRegiExplanationLine(correctText: string): string {
  return getCharacterLine("regiExplanation", "regi", { correct: correctText });
}
