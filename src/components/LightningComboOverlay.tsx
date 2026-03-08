"use client";

import { useEffect } from "react";

type Props = {
  combo: number;
  onComplete?: () => void;
  /** ミリ秒。この時間後に onComplete を呼び、親が非表示にできる */
  duration?: number;
};

/**
 * 5の倍数コンボ達成時：
 * - 黄色い放射状フラッシュ
 * - リングバーストが中心から展開
 * - コンボ数字が飛び出し、「コンボ！」がフェードイン
 */
export function LightningComboOverlay({
  combo,
  onComplete,
  duration = 1200,
}: Props) {
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onComplete]);

  return (
    <>
      <style>{`
        @keyframes combo-ring-burst {
          0%   { transform: translate(-50%, -50%) scale(0.15); opacity: 0.95; }
          65%  { opacity: 0.55; }
          100% { transform: translate(-50%, -50%) scale(3.4); opacity: 0; }
        }
        @keyframes combo-num {
          0%   { transform: translateY(36px) scale(0.55); opacity: 0; }
          32%  { transform: translateY(-10px) scale(1.12); opacity: 1; }
          52%  { transform: translateY(0) scale(1); }
          78%  { opacity: 1; }
          100% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes combo-label {
          0%   { transform: scale(0.75); opacity: 0; }
          28%  { transform: scale(1.1); opacity: 1; }
          50%  { transform: scale(1); }
          78%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-[100] pointer-events-none animate-lightning-overlay-fade-out"
        aria-live="polite"
        aria-label={`${combo} コンボ達成`}
      >
        {/* 背景フラッシュ（放射状グラデーション） */}
        <div
          className="absolute inset-0 animate-lightning-flash"
          style={{
            background:
              "radial-gradient(ellipse at 50% 42%, rgba(255,230,60,0.68) 0%, rgba(255,200,0,0.28) 45%, transparent 70%)",
          }}
          aria-hidden
        />

        {/* リングバースト */}
        <div
          className="absolute"
          style={{
            top: "43%",
            left: "50%",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            border: "3px solid rgba(255,222,0,0.9)",
            boxShadow:
              "0 0 32px rgba(255,200,0,0.65), inset 0 0 24px rgba(255,200,0,0.35)",
            animation: "combo-ring-burst 0.5s ease-out 0.05s forwards",
          }}
          aria-hidden
        />

        {/* コンボテキスト */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ marginTop: "4vh" }}
        >
          <span
            className="font-nunito"
            style={{
              fontSize: "7rem",
              fontWeight: 1200,
              lineHeight: 1,
              color: "#fff",
              textShadow:
                "0 0 36px rgba(255,222,0,1), 0 0 72px rgba(255,180,0,0.65), 0 4px 28px rgba(0,0,0,0.6)",
              animation: "combo-num 1.1s ease-out forwards",
            }}
            aria-hidden
          >
            {combo}
          </span>
          <span
            className="font-nunito"
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#fff",
              textShadow:
                "0 0 22px rgba(255,222,0,0.95), 0 2px 16px rgba(0,0,0,0.55)",
              animation: "combo-label 1.1s ease-out 0.15s forwards",
            }}
            aria-hidden
          >
            コンボ！
          </span>
        </div>
      </div>
    </>
  );
}
