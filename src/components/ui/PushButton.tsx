"use client";

import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "chip" | "chipActive" | "option" | "optionCorrect" | "optionWrong";

const variantStyles: Record<
  ButtonVariant,
  { base: string; shadow: string; active: string }
> = {
  primary: {
    base: "bg-pastel-primary text-white border-2 border-pastel-primary-dark",
    shadow: "shadow-[0_4px_0_0_rgba(70,163,2,0.7)]",
    active: "translate-y-[3px] shadow-[0_1px_0_0_rgba(70,163,2,0.7)]",
  },
  secondary: {
    base: "bg-pastel-blue text-pastel-ink border-2 border-pastel-blue-dark",
    shadow: "shadow-[0_4px_0_0_rgba(125,217,237,0.6)]",
    active: "translate-y-[3px] shadow-[0_1px_0_0_rgba(125,217,237,0.6)]",
  },
  outline: {
    base: "bg-white text-pastel-ink border-2 border-pastel-border hover:bg-pastel-slate",
    shadow: "shadow-[0_4px_0_0_rgba(0,0,0,0.12)]",
    active: "translate-y-[3px] shadow-[0_1px_0_0_rgba(0,0,0,0.12)]",
  },
  chip: {
    base: "rounded-full px-4 py-2 text-sm font-medium bg-pastel-slate text-pastel-ink border-2 border-pastel-border",
    shadow: "shadow-[0_3px_0_0_rgba(0,0,0,0.12)]",
    active: "translate-y-[2px] shadow-[0_1px_0_0_rgba(0,0,0,0.12)]",
  },
  chipActive: {
    base: "rounded-full px-4 py-2 text-sm font-medium bg-pastel-primary text-white border-2 border-pastel-primary-dark",
    shadow: "shadow-[0_3px_0_0_rgba(70,163,2,0.6)]",
    active: "translate-y-[2px] shadow-[0_1px_0_0_rgba(72,140,62,0.6)]",
  },
  option: {
    base: "w-full rounded-xl border-2 p-4 text-left font-medium text-pastel-ink bg-pastel-mint/50 border-pastel-primary/40 hover:border-pastel-primary hover:bg-pastel-mint/80",
    shadow: "shadow-[0_3px_0_0_rgba(0,0,0,0.08)]",
    active: "translate-y-[2px] shadow-[0_1px_0_0_rgba(0,0,0,0.08)]",
  },
  optionCorrect: {
    base: "w-full rounded-xl border-2 p-4 text-left font-medium text-pastel-ink border-pastel-success bg-pastel-mint",
    shadow: "shadow-[0_3px_0_0_rgba(72,140,62,0.5)]",
    active: "translate-y-[2px] shadow-[0_1px_0_0_rgba(72,140,62,0.5)]",
  },
  optionWrong: {
    base: "w-full rounded-xl border-2 p-4 text-left font-medium text-pastel-ink border-pastel-error bg-pastel-rose",
    shadow: "shadow-[0_3px_0_0_rgba(180,80,80,0.4)]",
    active: "translate-y-[2px] shadow-[0_1px_0_0_rgba(180,80,80,0.4)]",
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
      "inline-flex items-center justify-center font-semibold transition-all duration-100 select-none",
      "rounded-xl",
      "active:transition-none",
      isChip ? "rounded-full px-4 py-2 text-sm" : "py-3 px-5 min-h-[48px]",
      styles.base,
      !disabled && styles.shadow,
      !disabled && "active:translate-y-[3px] active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)]",
      (variant === "chip" || variant === "option") && !disabled && "active:translate-y-[2px]",
      variant === "optionCorrect" && "cursor-default",
      variant === "optionWrong" && "cursor-default",
      disabled && "opacity-60 cursor-not-allowed",
      variant === "chip" && "hover:bg-pastel-border/80",
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
