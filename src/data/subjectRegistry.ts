/**
 * 科目の表示名・テーマを一覧で定義する唯一のソース。
 * 新規科目追加時はここに1件追加し、services/subjects の index と lessonIdToSubjectKey は
 * この REGISTRY を参照する。
 */

export type SubjectTheme = {
  main: string;
  border: string;
  grad0: string;
  grad1: string;
  icon: string;
};

export type SubjectRegistryEntry = {
  /** ファイル名（拡張子なし）。services のモジュールキーに使用 */
  key: string;
  /** レッスンIDのプレフィックス（例: cellbiology, genetic-medicine） */
  prefix: string;
  /** ロードマップなどの表示名（日本語） */
  displayName: string;
  /** カード・ロードマップ用の色・アイコン */
  theme: SubjectTheme;
};

export const DEFAULT_THEME: SubjectTheme = {
  main: "#58CC02",
  border: "#46A302",
  grad0: "#58CC02",
  grad1: "#46A302",
  icon: "📚",
};

/** 表示順に並んだ科目一覧。新規科目はここに1件追加する */
export const SUBJECT_REGISTRY: SubjectRegistryEntry[] = [
  {
    key: "cell-biology",
    prefix: "cellbiology",
    displayName: "細胞生物学",
    theme: { main: "#4DD0E1", border: "#0097A7", grad0: "#4DD0E1", grad1: "#00ACC1", icon: "🔬" },
  },
  {
    key: "biochemistry",
    prefix: "biochemistry",
    displayName: "生化学",
    theme: { main: "#FFB74D", border: "#E65100", grad0: "#FFB74D", grad1: "#FB8C00", icon: "⚗️" },
  },
  {
    key: "histology",
    prefix: "histology",
    displayName: "組織学",
    theme: { main: "#CE93D8", border: "#7B1FA2", grad0: "#CE93D8", grad1: "#AB47BC", icon: "🧫" },
  },
  {
    key: "anatomy",
    prefix: "anatomy",
    displayName: "解剖学",
    theme: { main: "#64B5F6", border: "#1565C0", grad0: "#64B5F6", grad1: "#1E88E5", icon: "🫀" },
  },
  {
    key: "physiology",
    prefix: "physiology",
    displayName: "生理学",
    theme: { main: "#81C784", border: "#2E7D32", grad0: "#81C784", grad1: "#43A047", icon: "💓" },
  },
  {
    key: "immunology",
    prefix: "immunology",
    displayName: "免疫学",
    theme: { main: "#4DB6AC", border: "#00695C", grad0: "#4DB6AC", grad1: "#00897B", icon: "🛡️" },
  },
  {
    key: "endocrinology",
    prefix: "endocrinology",
    displayName: "内分泌学",
    theme: { main: "#EF9A9A", border: "#C62828", grad0: "#EF9A9A", grad1: "#E57373", icon: "🦋" },
  },
  {
    key: "microbiology",
    prefix: "microbiology",
    displayName: "微生物学総論",
    theme: { main: "#90A4AE", border: "#37474F", grad0: "#90A4AE", grad1: "#607D8B", icon: "🦠" },
  },
  {
    key: "virology",
    prefix: "virology",
    displayName: "ウイルス学",
    theme: { main: "#F48FB1", border: "#880E4F", grad0: "#F48FB1", grad1: "#EC407A", icon: "🧪" },
  },
  {
    key: "bacteriology",
    prefix: "bacteriology",
    displayName: "細菌学",
    theme: { main: "#A5D6A7", border: "#1B5E20", grad0: "#A5D6A7", grad1: "#66BB6A", icon: "🔵" },
  },
  {
    key: "mycology",
    prefix: "mycology",
    displayName: "真菌学",
    theme: { main: "#BCAAA4", border: "#4E342E", grad0: "#BCAAA4", grad1: "#8D6E63", icon: "🍄" },
  },
  {
    key: "pharmacology",
    prefix: "pharmacology",
    displayName: "薬理学",
    theme: { main: "#F06292", border: "#880E4F", grad0: "#F06292", grad1: "#E91E63", icon: "💊" },
  },
  {
    key: "pathology",
    prefix: "pathology",
    displayName: "病理学",
    theme: { main: "#FF8A65", border: "#BF360C", grad0: "#FF8A65", grad1: "#F4511E", icon: "🩺" },
  },
  {
    key: "genetic-medicine",
    prefix: "genetic-medicine",
    displayName: "遺伝子医学",
    theme: { main: "#9FA8DA", border: "#283593", grad0: "#9FA8DA", grad1: "#5C6BC0", icon: "🧬" },
  },
  {
    key: "medical-ethics",
    prefix: "medical-ethics",
    displayName: "医療倫理",
    theme: { main: "#FFD54F", border: "#E65100", grad0: "#FFD54F", grad1: "#FFCA28", icon: "⚖️" },
  },
];

/** ロードマップでの分野の表示順（REGISTRY の並び） */
export const SUBJECT_DISPLAY_ORDER = SUBJECT_REGISTRY.map((r) => r.displayName) as readonly string[];

/** 表示名 → テーマ（既存の @/data/subjectThemes の API 互換） */
export const SUBJECT_THEMES: Record<string, SubjectTheme> = Object.fromEntries(
  SUBJECT_REGISTRY.map((r) => [r.displayName, r.theme])
);
