"use client";

import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "amber" | "slate" | "chip" | "chipActive" | "option" | "optionCorrect" | "optionWrong";

const variantStyles: Record<
  ButtonVariant,
  { base: string; shadow: string; active: string }
> = {
  primary: {
    base: "bg-pastel-primary text-white border-0",
    shadow: "shadow-[0_4px_0_#46a302]",
    active: "translate-y-[4px] shadow-[0_0_0_#46a302]",
  },
  secondary: {
    base: "bg-pastel-blue text-pastel-ink border-0",
    shadow: "shadow-[0_4px_0_#7dd9ed]",
    active: "translate-y-[4px] shadow-[0_0_0_#7dd9ed]",
  },
  outline: {
    base: "bg-white text-pastel-ink border border-pastel-border",
    shadow: "shadow-[0_4px_0_#d1d5db]",
    active: "translate-y-[3px] shadow-[0_1px_0_#d1d5db]",
  },
  /** リトライ・間違え直し用の暖色ボタン */
  amber: {
    base: "bg-[#f97316] text-white border-0",
    shadow: "shadow-[0_4px_0_#c2410c]",
    active: "translate-y-[4px] shadow-[0_0_0_#c2410c]",
  },
  /** 科目一覧・ホームなど中性ナビゲーション用 */
  slate: {
    base: "bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]",
    shadow: "shadow-[0_4px_0_#cbd5e1]",
    active: "translate-y-[3px] shadow-[0_1px_0_#cbd5e1]",
  },
  chip: {
    base: "rounded-full px-4 py-2 text-sm font-medium bg-white text-pastel-ink border border-pastel-border",
    shadow: "shadow-[0_3px_0_#d1d5db]",
    active: "translate-y-[2px] shadow-[0_1px_0_#d1d5db]",
  },
  chipActive: {
    base: "rounded-full px-4 py-2 text-sm font-medium bg-pastel-primary text-white border-0",
    shadow: "shadow-[0_3px_0_#46a302]",
    active: "translate-y-[2px] shadow-[0_1px_0_#46a302]",
  },
  option: {
    base: "w-full rounded-2xl p-4 text-left font-medium text-pastel-ink bg-white border border-pastel-border",
    shadow: "shadow-[0_4px_0_#d1d5db]",
    active: "translate-y-[3px] shadow-[0_1px_0_#d1d5db]",
  },
  optionCorrect: {
    base: "w-full rounded-2xl p-4 text-left font-medium text-pastel-ink border-2 border-[#58cc02] bg-[#d7ffb8]",
    shadow: "shadow-[0_4px_0_rgba(70,163,2,0.55)]",
    active: "translate-y-[3px] shadow-[0_1px_0_rgba(70,163,2,0.55)]",
  },
  optionWrong: {
    base: "w-full rounded-2xl p-4 text-left font-medium text-pastel-ink border-2 border-[#ea2b2b] bg-[#ffd6d6]",
    shadow: "shadow-[0_4px_0_rgba(180,50,50,0.25)]",
    active: "translate-y-[3px] shadow-[0_1px_0_rgba(180,50,50,0.25)]",
  },
};

type PushButtonProps = {
  variant?: ButtonVariant;
  chipActive?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick?: () => void }
);

export const PushButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, PushButtonProps>(
  function PushButton(
    {
      variant = "primary",
      chipActive = false,
      className = "",
      children,
      disabled = false,
      type = "button",
      href,
      onClick,
    },
    ref
  ) {
    const isChip = variant === "chip" || variant === "chipActive";
    const effectiveVariant = variant === "chip" && chipActive ? "chipActive" : variant === "chip" ? "chip" : variant;
    const styles = variantStyles[effectiveVariant];

    const baseClasses = [
      "inline-flex items-center justify-center font-semibold transition-all duration-150 select-none",
      "rounded-xl",
      "active:transition-none",
      isChip ? "rounded-full px-4 py-2 text-sm" : "py-3 px-5 min-h-[48px]",
      styles.base,
      !disabled && styles.shadow,
      !disabled && `active:${styles.active}`,
      variant === "optionCorrect" && "cursor-default",
      variant === "optionWrong" && "cursor-default",
      disabled && "opacity-50 cursor-not-allowed",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href && !disabled) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={baseClasses}
      >
        {children}
      </button>
    );
  }
);
