"use client";

type Variant = "quiz" | "roadmap";

type Props = {
  /** 現在の値（例: 解いた問題数） */
  current: number;
  /** 最大値（例: 全問題数） */
  total: number;
  /** ラベル（例: "問題" → "問題 3 / 10"） */
  label?: string;
  /** クイズ用 / ロードマップ用でデザインを切り替え */
  variant?: Variant;
  /** 見た目: バーのみ / ラベル付き（デフォルト） */
  showLabel?: boolean;
  /** 追加のクラス名（ラッパー用） */
  className?: string;
  /** ラベル・パーセント表示の文字色（例: 暗い背景で text-white） */
  labelClassName?: string;
};

/** 立体感のあるトラック（窪んだ溝） */
const trackClass =
  "h-4 w-full overflow-hidden rounded-full border border-pastel-border/80 " +
  "bg-pastel-slate shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]";

/** クイズ用: 鮮やかな青のバー（立体感・pastel パレットのみ使用） */
const quizFillClass =
  "h-full rounded-full bg-pastel-blue transition-all duration-300 ease-out " +
  "shadow-[0_1px_2px_rgba(0,0,0,0.12)] " +
  "bg-gradient-to-b from-pastel-blue to-pastel-blue-dark";

/** ロードマップ用: 青系のバー（立体感・pastel パレットのみ使用） */
const roadmapFillClass =
  "h-full rounded-full bg-pastel-blue transition-all duration-300 ease-out " +
  "shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-pastel-blue-dark/30 " +
  "bg-gradient-to-b from-pastel-cream/70 to-pastel-blue-dark/90";

/**
 * 直感的で視認しやすいプログレスバー（立体感あり）。
 * クイズとロードマップでデザインを分け、数字表示は必須。
 * アクセシビリティ対応（role="progressbar", aria-*）。
 */
export function ProgressBar({
  current,
  total,
  label,
  variant = "quiz",
  showLabel = true,
  className = "",
  labelClassName = "text-pastel-ink",
}: Props) {
  const value = Math.min(Math.max(current, 0), total);
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  const labelText = label
    ? `${label} ${value} / ${total}`
    : `${value} / ${total}`;

  const fillClass = variant === "quiz" ? quizFillClass : roadmapFillClass;

  return (
    <div className={className}>
      {showLabel && (
        <div className={`mb-1.5 flex items-center justify-between ${labelClassName}`}>
          <span className="text-sm font-medium opacity-90">
            {labelText}
          </span>
          <span className="text-sm opacity-75" aria-hidden>
            {percent}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={labelText}
        className={trackClass}
      >
        <div
          className={fillClass}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
