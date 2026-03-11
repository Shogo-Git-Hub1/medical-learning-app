import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        // デザインガイドの6色
        primary: { DEFAULT: "#58CC02", dark: "#46A302" }, // Lime Green
        yellow: "#FFC800", // Golden Yellow（ストリーク・ハイライト）
        "pastel-pink": "#FFB2B2", // Light Pink / Peach
        gray: "#AFAFAF", // Medium Gray（枠・補助）
        "pastel-blue": "#BBF2FF", // Light Blue / Cyan
        "pastel-purple": "#9069CD", // Medium Purple
        // セマンティック（上記6色をベースにマッピング）
        streak: "#FFC800",
        xp: "#BBF2FF",
        pastel: {
          primary: "#58CC02",
          "primary-dark": "#46A302",
          blue: "#BBF2FF",
          "blue-dark": "#7DD9ED",
          cream: "#FFFBF5",
          ink: "#3C3C3C",
          border: "#E5E7EB",
          card: "#FFFFFF",
          slate: "#E8E8E8",
          mint: "#E8F5E0",
          rose: "#FFB2B2",
          success: "#58CC02",
          error: "#E88A8A",
          orange: "#FFC800",
          "orange-dark": "#E6B800",
        },
        /** クリーン白背景 */
        neu: "#ffffff",
        /** 藍色：クイズ画面の背景（視認性向上） */
        indigo: {
          quiz: "#1a365d",
          "quiz-soft": "#234e70",
        },
      },
      keyframes: {
        "feedback-pop": {
          "0%": { transform: "scale(0.92)", opacity: "0.6" },
          "60%": { transform: "scale(1.03)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "feedback-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-6px)" },
          "30%": { transform: "translateX(6px)" },
          "45%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-2px)" },
        },
        "lightning-flash": {
          "0%": { opacity: "0" },
          "15%": { opacity: "0.85" },
          "35%": { opacity: "0.6" },
          "100%": { opacity: "0" },
        },
        "lightning-bolt": {
          "0%": { opacity: "0", transform: "translateY(-20px) scale(0.8)" },
          "20%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "80%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0.3", transform: "translateY(4px) scale(1)" },
        },
        "combo-pop-text": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "25%": { opacity: "1", transform: "scale(1.15)" },
          "40%": { opacity: "1", transform: "scale(1)" },
          "70%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.05)" },
        },
        "lightning-overlay-fade-out": {
          "0%, 70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        /** 正解した選択肢がポンと前に出る（フラット ledge スタイル対応） */
        "option-correct-pop": {
          "0%": { transform: "scale(1) translateY(0)", boxShadow: "0 4px 0 rgba(70,163,2,0.55)" },
          "35%": { transform: "scale(1.06) translateY(-6px)", boxShadow: "0 8px 20px rgba(70,163,2,0.25)" },
          "70%": { transform: "scale(1.02) translateY(-3px)", boxShadow: "0 5px 12px rgba(70,163,2,0.18)" },
          "100%": { transform: "scale(1.02) translateY(-2px)", boxShadow: "0 4px 0 rgba(70,163,2,0.55)" },
        },
        /** 雷が上から下へ降りてくる（ボルト本体の移動） */
        "lightning-bolt-fall": {
          "0%": { transform: "translate(-50%, -100%)", opacity: "0" },
          "8%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translate(-50%, 100%)", opacity: "0.4" },
        },
        /** スカルン：不正解時・カタカタ震えて落ち込む */
        "character-skurun-shake": {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "10%": { transform: "translateX(-2px) rotate(-1deg)" },
          "20%": { transform: "translateX(2px) rotate(1deg)" },
          "30%": { transform: "translateX(-2px) rotate(-1deg)" },
          "40%": { transform: "translateX(2px) rotate(1deg)" },
          "50%": { transform: "translateX(-1px) rotate(-0.5deg)" },
          "60%": { transform: "translateX(1px) rotate(0.5deg)" },
          "70%": { transform: "translateX(-1px) rotate(-0.5deg)" },
          "80%": { transform: "translateX(1px) rotate(0.5deg)" },
          "90%": { transform: "translateX(-1px) rotate(0deg)" },
        },
        /** スカルン：正解時・バラバラになって喜ぶ（弾む＋軽く揺れる） */
        "character-skurun-happy": {
          "0%": { transform: "scale(1) translateY(0)" },
          "25%": { transform: "scale(1.15) translateY(-4px)" },
          "50%": { transform: "scale(1.08) translateY(2px)" },
          "75%": { transform: "scale(1.12) translateY(-2px)" },
          "100%": { transform: "scale(1.05) translateY(0)" },
        },
        /** キャラクター：待機時・ゆっくり浮遊 */
        "character-idle-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        /** シリン：元気に軽く弾む（ロードマップ・レッスン完了など） */
        "character-shirin-bounce": {
          "0%, 100%": { transform: "scale(1) translateY(0)" },
          "40%": { transform: "scale(1.05) translateY(-2px)" },
          "70%": { transform: "scale(1.02) translateY(1px)" },
        },
        /** 近未来UI: 下からフェードイン */
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /** 近未来UI: カードのスケール付きフェードイン */
        "card-enter": {
          from: { opacity: "0", transform: "translateY(14px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        /** グリーングロウのパルス（白背景対応） */
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(88,204,2,0.3), 0 2px 8px rgba(0,0,0,0.08)" },
          "50%": { boxShadow: "0 0 22px rgba(88,204,2,0.65), 0 0 44px rgba(88,204,2,0.2), 0 2px 8px rgba(0,0,0,0.08)" },
        },
        /** ロード中…のドット点滅 */
        "dot-blink": {
          "0%, 70%, 100%": { opacity: "0" },
          "35%": { opacity: "1" },
        },
      },
      animation: {
        "feedback-pop": "feedback-pop 0.4s ease-out forwards",
        "feedback-shake": "feedback-shake 0.5s ease-in-out forwards",
        "lightning-flash": "lightning-flash 1.2s ease-out forwards",
        "lightning-bolt": "lightning-bolt 1.2s ease-out forwards",
        "combo-pop-text": "combo-pop-text 1.2s ease-out forwards",
        "lightning-overlay-fade-out": "lightning-overlay-fade-out 1.5s ease-out forwards",
        "option-correct-pop": "option-correct-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "lightning-bolt-fall": "lightning-bolt-fall 1.1s ease-in forwards",
        "character-skurun-shake": "character-skurun-shake 0.6s ease-in-out forwards",
        "character-skurun-happy": "character-skurun-happy 0.5s ease-out forwards",
        "character-idle-float": "character-idle-float 2.5s ease-in-out infinite",
        "character-shirin-bounce": "character-shirin-bounce 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "card-enter": "card-enter 0.45s cubic-bezier(0.22,1,0.36,1) forwards",
        "pulse-glow": "pulse-glow 2.8s ease-in-out infinite",
        "dot-blink": "dot-blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
