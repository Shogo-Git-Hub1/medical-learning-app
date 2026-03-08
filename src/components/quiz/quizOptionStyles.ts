/** 選択肢ごとのアクセントカラー（Duolingo 6色パレット準拠） */
export const OPTION_ACCENTS = [
  { bar: "#BBF2FF", shadow: "rgba(187,242,255,0.7)" },
  { bar: "#FFB2B2", shadow: "rgba(255,178,178,0.7)" },
  { bar: "#9069CD", shadow: "rgba(144,105,205,0.65)" },
  { bar: "#FFC800", shadow: "rgba(255,200,0,0.7)" },
] as const;

const BASE_SHADOW = "4px 4px 10px rgba(197,202,209,0.7), -4px -4px 10px rgba(255,255,255,0.9)";
const LEDGE = "0 5px 0 rgba(185,190,198,0.75)";

export type OptionStyleResult = {
  shadowStyle: string;
  borderColor: string;
  bgColor: string;
  /** null のときはアクセントカラーをそのまま使う */
  barColor: string | null;
  /** null のときはアクセントのデフォルト shadow を使う */
  barGlow: string | null;
};

/**
 * クイズ選択肢の状態に応じたスタイル（シャドウ・ボーダー・背景・バー色）を返す。
 */
export function getOptionStyle(
  showFeedback: boolean,
  chosen: boolean,
  isRight: boolean
): OptionStyleResult {
  // ✅ 正解（全員に表示）
  if (showFeedback && isRight) {
    return {
      shadowStyle: `${BASE_SHADOW}, 0 0 18px rgba(88,204,2,0.35), ${LEDGE}`,
      borderColor: "rgba(88,204,2,0.28)",
      bgColor: "rgba(228,245,220,0.88)",
      barColor: "#58cc02",
      barGlow: "0 0 14px rgba(88,204,2,0.85), 0 0 28px rgba(88,204,2,0.35)",
    };
  }

  // ❌ 選択したが不正解
  if (showFeedback && chosen && !isRight) {
    return {
      shadowStyle:
        "inset 3px 3px 7px rgba(197,202,209,0.6), inset -3px -3px 7px rgba(255,255,255,0.75)",
      borderColor: "rgba(232,100,100,0.28)",
      bgColor: "rgba(255,210,210,0.68)",
      barColor: "#E86464",
      barGlow: "0 0 14px rgba(232,100,100,0.8), 0 0 24px rgba(232,100,100,0.3)",
    };
  }

  // 選択中（まだ回答前）
  if (!showFeedback && chosen) {
    return {
      shadowStyle: `${BASE_SHADOW}, 0 0 12px rgba(88,204,2,0.3), ${LEDGE}`,
      borderColor: "rgba(88,204,2,0.42)",
      bgColor: "var(--neu-bg)",
      barColor: "#58cc02",
      barGlow: "0 0 8px rgba(88,204,2,0.6)",
    };
  }

  // デフォルト（未選択 / フィードバック後の非正解非選択）
  return {
    shadowStyle: `${BASE_SHADOW}, ${LEDGE}`,
    borderColor: "rgba(185,190,198,0.45)",
    bgColor: "var(--neu-bg)",
    barColor: null,
    barGlow: null,
  };
}
