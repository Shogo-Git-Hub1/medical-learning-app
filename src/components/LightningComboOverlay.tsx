"use client";

import { useEffect } from "react";

type Props = {
  combo: number;
  onComplete?: () => void;
  /** ミリ秒。この時間後に onComplete を呼び、親が非表示にできる */
  duration?: number;
};

/**
 * 5の倍数コンボ達成時：画面全体に雷が上から下へ降りてくる＋フラッシュ＋「○コンボ！」を大きく一瞬表示
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
      {/* 画面全体フラッシュ（白〜黄）：雷の直撃感 */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-yellow-200/90 to-amber-100/80 animate-lightning-flash"
        aria-hidden
      />

      {/* 稲妻：画面上方から下方へ降りてくる（長い1本の雷・keyframes で translate(-50%, Y) により中央寄せ） */}
      <div
        className="absolute top-0 left-1/2 h-[130vh] w-24 animate-lightning-bolt-fall"
        aria-hidden
      >
        <svg
          className="h-full w-full text-yellow-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
          viewBox="0 0 80 520"
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 縦長の稲妻（上から下へ走るジグザグ） */}
          <path
            d="M40 0 L28 80 L40 80 L22 180 L38 180 L18 280 L42 280 L24 380 L40 380 L20 480 L36 520 L44 520 L24 420 L40 420 L30 320 L16 320 L36 220 L20 220 L40 120 L26 120 L40 0 Z"
            className="opacity-95"
          />
        </svg>
      </div>

      {/* 「○コンボ！」大きく一瞬表示 */}
      <div className="relative z-10 mt-24 animate-combo-pop-text">
        <span className="text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {combo} コンボ！
        </span>
      </div>
    </div>
  );
}
