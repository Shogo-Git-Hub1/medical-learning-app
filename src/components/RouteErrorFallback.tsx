"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";

export type RouteErrorFallbackProps = {
  /** エラーオブジェクト（ログ用） */
  error: Error & { digest?: string };
  /** ログプレフィックス（例: "[lesson error]"） */
  logLabel: string;
  /** 見出し */
  title: string;
  /** 説明文 */
  description: string;
  /** 再試行ボタンのラベル */
  resetLabel: string;
  /** 再試行クリック時のコールバック */
  onReset: () => void;
  /** 戻るリンク先（例: "/subjects", "/"） */
  backHref: string;
  /** 戻るボタンのラベル */
  backLabel: string;
  /** "card" = neu-card＋赤ライン, "inset" = neu-inset＋アイコン用 */
  variant?: "card" | "inset";
  /** variant="inset" のときのアイコン（例: ⚠️） */
  icon?: ReactNode;
};

/**
 * ルート別 error.tsx で共通利用するエラー表示。
 * 見出し・説明・ボタン文言・戻り先を props で渡す。
 * エラー境界はチャンク読み込み失敗時にも表示される必要があるため、
 * PushButton/CardWithAccent に依存せずインラインでマークアップする。
 */
export function RouteErrorFallback({
  error,
  logLabel,
  title,
  description,
  resetLabel,
  onReset,
  backHref,
  backLabel,
  variant = "card",
  icon,
}: RouteErrorFallbackProps) {
  useEffect(() => {
    console.error(logLabel, error);
  }, [error, logLabel]);

  const buttonClass =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold font-nunito transition-all duration-150 active:scale-[0.98]";
  const primaryClass =
    "bg-pastel-primary text-white border-0 shadow-[4px_4px_10px_rgba(197,202,209,0.7),-4px_-4px_10px_rgba(255,255,255,0.9),0_0_14px_rgba(88,204,2,0.35)]";
  const outlineClass =
    "bg-[var(--neu-bg)] text-pastel-ink border border-pastel-border/60 shadow-[4px_4px_8px_rgba(197,202,209,0.7),-4px_-4px_8px_rgba(255,255,255,0.9)]";

  if (variant === "inset") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "inset 4px 4px 8px var(--neu-dark), inset -4px -4px 8px var(--neu-light)",
          }}
        >
          {icon && (
            <p className="text-4xl select-none mb-3" aria-hidden>
              {icon}
            </p>
          )}
          <h1 className="text-lg font-bold text-pastel-ink font-nunito mb-2">{title}</h1>
          <p className="text-sm text-pastel-ink/70 mb-6">{description}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={onReset} className={`${buttonClass} ${primaryClass}`}>
              {resetLabel}
            </button>
            <Link href={backHref} className={`${buttonClass} ${outlineClass}`}>
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-8 text-center relative overflow-hidden"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "8px 8px 18px var(--neu-dark), -8px -8px 18px var(--neu-light)",
        }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,100,100,0.6), transparent)",
          }}
          aria-hidden
        />
        <p className="font-mono text-xs text-pastel-ink/40 mb-2">{"// Error"}</p>
        <h1 className="text-lg font-bold text-pastel-ink mb-2">{title}</h1>
        <p className="text-sm text-pastel-ink/70 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={onReset} className={`${buttonClass} ${primaryClass}`}>
            {resetLabel}
          </button>
          <Link href={backHref} className={`${buttonClass} ${outlineClass}`}>
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
