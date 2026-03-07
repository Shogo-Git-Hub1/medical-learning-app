/**
 * 科目テーマ定数（サーバー・クライアント両方から利用可能）
 * "use client" を持つ RoadmapPrimitives から分離することで
 * RSC バンドルの不整合を防ぐ。
 */

export type SubjectTheme = {
  main: string;
  border: string;
  grad0: string;
  grad1: string;
  icon: string;
};

export const SUBJECT_THEMES: Record<string, SubjectTheme> = {
  "細胞生物学":  { main: "#4DD0E1", border: "#0097A7", grad0: "#4DD0E1", grad1: "#00ACC1", icon: "🔬" },
  "生化学":      { main: "#FFB74D", border: "#E65100", grad0: "#FFB74D", grad1: "#FB8C00", icon: "⚗️" },
  "組織学":      { main: "#CE93D8", border: "#7B1FA2", grad0: "#CE93D8", grad1: "#AB47BC", icon: "🧫" },
  "解剖学":      { main: "#64B5F6", border: "#1565C0", grad0: "#64B5F6", grad1: "#1E88E5", icon: "🫀" },
  "生理学":      { main: "#81C784", border: "#2E7D32", grad0: "#81C784", grad1: "#43A047", icon: "💓" },
  "免疫学":      { main: "#4DB6AC", border: "#00695C", grad0: "#4DB6AC", grad1: "#00897B", icon: "🛡️" },
  "内分泌学":    { main: "#EF9A9A", border: "#C62828", grad0: "#EF9A9A", grad1: "#E57373", icon: "🦋" },
  "微生物学総論": { main: "#90A4AE", border: "#37474F", grad0: "#90A4AE", grad1: "#607D8B", icon: "🦠" },
  "ウイルス学":  { main: "#F48FB1", border: "#880E4F", grad0: "#F48FB1", grad1: "#EC407A", icon: "🧪" },
  "細菌学":      { main: "#A5D6A7", border: "#1B5E20", grad0: "#A5D6A7", grad1: "#66BB6A", icon: "🔵" },
  "真菌学":      { main: "#BCAAA4", border: "#4E342E", grad0: "#BCAAA4", grad1: "#8D6E63", icon: "🍄" },
  "薬理学":      { main: "#F06292", border: "#880E4F", grad0: "#F06292", grad1: "#E91E63", icon: "💊" },
  "病理学":      { main: "#FF8A65", border: "#BF360C", grad0: "#FF8A65", grad1: "#F4511E", icon: "🩺" },
  "遺伝子医学":  { main: "#9FA8DA", border: "#283593", grad0: "#9FA8DA", grad1: "#5C6BC0", icon: "🧬" },
  "医療倫理":    { main: "#FFD54F", border: "#E65100", grad0: "#FFD54F", grad1: "#FFCA28", icon: "⚖️" },
};

export const DEFAULT_THEME: SubjectTheme = {
  main: "#58CC02", border: "#46A302", grad0: "#58CC02", grad1: "#46A302", icon: "📚",
};
