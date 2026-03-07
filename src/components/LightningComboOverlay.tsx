"use client";

import { useEffect } from "react";

type Props = {
  combo: number;
  onComplete?: () => void;
  /** ミリ秒。この時間後に onComplete を呼び、親が非表示にできる */
  duration?: number;
};

/**
 * 5の倍数コンボ達成時：画面全体に稲妻が走る＋フラッシュ＋「○コンボ！」を大きく一瞬表示
 */
export function LightningComboOverlay({
  combo,
  onComplete,
  duration = 1500,
}: Props) {
  useEffect(() => {
    const t = setTimeout(() => {
      onComplete?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center animate-lightning-overlay-fade-out"
      aria-live="polite"
      aria-label={`${combo} コンボ達成`}
    >
      {/* 画面フラッシュ（淡く短め） */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-yellow-100/60 via-amber-50/30 to-transparent animate-lightning-flash"
        aria-hidden
      />

      {/* 稲妻ボルト：シンプルな stroke パスで自然な形に */}
      <div
        className="absolute top-0 left-1/2 h-[130vh] w-20 animate-lightning-bolt-fall"
        aria-hidden
      >
        <svg
          className="h-full w-full drop-shadow-[0_0_18px_rgba(255,210,0,0.9)]"
          viewBox="0 0 60 520"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* グロー（背景の光輪） */}
          <path
            d="M40 4 L20 258 L34 258 L14 516"
            stroke="rgba(255,240,100,0.35)"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* メインボルト */}
          <path
            d="M40 4 L20 258 L34 258 L14 516"
            stroke="#FFEE44"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* ハイライト（中央の白い芯） */}
          <path
            d="M40 4 L20 258 L34 258 L14 516"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* 「○コンボ！」大きく一瞬表示 */}
      <div className="relative z-10 mt-24 animate-combo-pop-text">
        <span className="text-8xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]">
          {combo} コンボ！
        </span>
      </div>
    </div>
  );
}
