"use client";

type Variant = "quiz" | "roadmap";

type Props = {
  current: number;
  total: number;
  label?: string;
  variant?: Variant;
  showLabel?: boolean;
  className?: string;
  labelClassName?: string;
};

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

  const fillGradient =
    variant === "quiz"
      ? "linear-gradient(90deg, #BBF2FF, #7DD9ED)"
      : "linear-gradient(90deg, #58CC02, #46A302)";

  const fillGlow =
    variant === "quiz"
      ? "0 0 8px rgba(187,242,255,0.7)"
      : "0 0 8px rgba(88,204,2,0.55)";

  return (
    <div className={className}>
      {showLabel && (
        <div className={`mb-2 flex items-center justify-between ${labelClassName}`}>
          <span className="text-xs font-mono opacity-70">{labelText}</span>
          <span className="text-xs font-mono opacity-50" aria-hidden>{percent}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={labelText}
        className="h-3 w-full overflow-hidden rounded-full"
        style={{ boxShadow: "var(--neu-inset)", background: "var(--neu-bg)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: fillGradient,
            boxShadow: fillGlow,
          }}
        />
      </div>
    </div>
  );
}
