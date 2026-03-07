"use client";

import type { ReactNode } from "react";

const ACCENT_STYLES = {
  success: "linear-gradient(90deg, transparent, rgba(88,204,2,0.55), transparent)",
  successGlow:
    "linear-gradient(90deg, transparent, #58CC02, transparent)",
  error: "linear-gradient(90deg, transparent, rgba(232,100,100,0.6), transparent)",
  neutral: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)",
} as const;

const CONTAINER_CLASSES = {
  card: "neu-card rounded-2xl relative overflow-hidden",
  "card-lg": "neu-card-lg rounded-3xl relative overflow-hidden",
  inset: "neu-inset rounded-2xl relative overflow-hidden",
} as const;

export type CardWithAccentVariant = "success" | "error" | "neutral";
export type CardWithAccentContainer = "card" | "card-lg" | "inset";

export type CardWithAccentProps = {
  /** 上部アクセントラインの色（inset の場合は非表示） */
  variant?: CardWithAccentVariant;
  /** カードのスタイル */
  container?: CardWithAccentContainer;
  /** 成功系でグロー付きラインにする（完了カードなど） */
  accentGlow?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * neu-card / neu-card-lg / neu-inset と上部アクセントラインをまとめた共有コンポーネント。
 * エラー表示・レッスンヘッダー・クイズカードなどで共通利用する。
 */
export function CardWithAccent({
  variant = "neutral",
  container = "card",
  accentGlow = false,
  className = "",
  children,
}: CardWithAccentProps) {
  const containerClass = CONTAINER_CLASSES[container];
  const showLine = container !== "inset" && variant !== "neutral";
  const lineStyle =
    variant === "success" && accentGlow
      ? ACCENT_STYLES.successGlow
      : variant === "success"
        ? ACCENT_STYLES.success
        : variant === "error"
          ? ACCENT_STYLES.error
          : ACCENT_STYLES.neutral;

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      {showLine && (
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full md:left-8 md:right-8"
          style={{
            background: lineStyle,
            ...(variant === "success" && accentGlow && {
              boxShadow: "0 0 14px rgba(88,204,2,0.55)",
            }),
          }}
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
