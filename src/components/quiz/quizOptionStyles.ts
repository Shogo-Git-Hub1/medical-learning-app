/** 選択肢ごとのアクセントカラー（Duolingo 6色パレット準拠） */
export const OPTION_ACCENTS = [
  { bar: "#BBF2FF", shadow: "rgba(187,242,255,0.7)" },
  { bar: "#FFB2B2", shadow: "rgba(255,178,178,0.7)" },
  { bar: "#9069CD", shadow: "rgba(144,105,205,0.65)" },
  { bar: "#FFC800", shadow: "rgba(255,200,0,0.7)" },
] as const;

/** デフォルト選択肢のボトムレッジ（Duolingo 式 3D） */
const LEDGE = "0 4px 0 #d1d5db";

export type OptionStyleResult = {
  shadowStyle: string;
  borderColor: string;
  bgColor: string;
  /** 使用しない（後方互換のため残す） */
  barColor: string | null;
  /** 使用しない（後方互換のため残す） */
  barGlow: string | null;
};

/**
 * クイズ選択肢の状態に応じたスタイル（シャドウ・ボーダー・背景）を返す。
 * フラット白背景デザイン（Duolingo 準拠）。
 */
export function getOptionStyle(
  showFeedback: boolean,
  chosen: boolean,
  isRight: boolean
): OptionStyleResult {
  // ✅ 正解（全員に表示）
  if (showFeedback && isRight) {
    return {
      shadowStyle: "0 4px 0 rgba(70,163,2,0.55)",
      borderColor: "#58cc02",
      bgColor: "#d7ffb8",
      barColor: null,
      barGlow: null,
    };
  }

  // ❌ 選択したが不正解
  if (showFeedback && chosen && !isRight) {
    return {
      shadowStyle: "0 4px 0 rgba(180,50,50,0.25)",
      borderColor: "#ea2b2b",
      bgColor: "#ffd6d6",
      barColor: null,
      barGlow: null,
    };
  }

  // 選択中（まだ回答前） → Duolingo ブルー
  if (!showFeedback && chosen) {
    return {
      shadowStyle: "0 4px 0 rgba(28,176,246,0.5)",
      borderColor: "#1cb0f6",
      bgColor: "#f0f9ff",
      barColor: null,
      barGlow: null,
    };
  }

  // デフォルト（未選択 / フィードバック後の非正解非選択）
  return {
    shadowStyle: LEDGE,
    borderColor: "#e5e7eb",
    bgColor: "#ffffff",
    barColor: null,
    barGlow: null,
  };
}
