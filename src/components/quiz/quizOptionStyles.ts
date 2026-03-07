/** 選択肢ごとのアクセントカラー（Duolingo 6色パレット準拠） */
export const OPTION_ACCENTS = [
  { bar: "#BBF2FF", shadow: "rgba(187,242,255,0.6)" },
  { bar: "#FFB2B2", shadow: "rgba(255,178,178,0.6)" },
  { bar: "#9069CD", shadow: "rgba(144,105,205,0.5)" },
  { bar: "#FFC800", shadow: "rgba(255,200,0,0.6)" },
] as const;

/**
 * クイズ選択肢の状態に応じたスタイル（シャドウ・ボーダー・背景）を返す。
 * QuizSession の選択肢表示で共通利用する。
 */
export function getOptionStyle(
  showFeedback: boolean,
  chosen: boolean,
  isRight: boolean
): { shadowStyle: string; borderColor: string; bgColor: string } {
  if (showFeedback && isRight) {
    return {
      shadowStyle: "var(--neu-shadow-sm), 0 0 16px rgba(88,204,2,0.45)",
      borderColor: "rgba(88,204,2,0.55)",
      bgColor: "rgba(232,245,224,0.75)",
    };
  }
  if (showFeedback && chosen && !isRight) {
    return {
      shadowStyle:
        "inset 3px 3px 7px rgba(197,202,209,0.6), inset -3px -3px 7px rgba(255,255,255,0.75)",
      borderColor: "rgba(232,100,100,0.55)",
      bgColor: "rgba(255,210,210,0.5)",
    };
  }
  if (!showFeedback && chosen) {
    return {
      shadowStyle: "var(--neu-shadow-sm), 0 0 12px rgba(88,204,2,0.3)",
      borderColor: "rgba(88,204,2,0.5)",
      bgColor: "var(--neu-bg)",
    };
  }
  return {
    shadowStyle: "var(--neu-shadow-sm)",
    borderColor: "transparent",
    bgColor: "var(--neu-bg)",
  };
}
