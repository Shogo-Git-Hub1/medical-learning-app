"use client";

import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "chip" | "chipActive" | "option" | "optionCorrect" | "optionWrong";

const variantStyles: Record<
  ButtonVariant,
  { base: string; shadow: string; active: string }
> = {
  primary: {
    base: "bg-pastel-primary text-white border-0",
    shadow: "shadow-[4px_4px_10px_rgba(197,202,209,0.7),-4px_-4px_10px_rgba(255,255,255,0.9),0_0_14px_rgba(88,204,2,0.35)]",
    active: "translate-y-[2px] shadow-[inset_3px_3px_6px_rgba(70,163,2,0.4),inset_-2px_-2px_5px_rgba(120,220,40,0.3)]",
  },
  secondary: {
    base: "bg-pastel-blue text-pastel-ink border-0",
    shadow: "shadow-[4px_4px_10px_rgba(197,202,209,0.7),-4px_-4px_10px_rgba(255,255,255,0.9),0_0_14px_rgba(187,242,255,0.4)]",
    active: "translate-y-[2px] shadow-[inset_3px_3px_6px_rgba(125,217,237,0.4),inset_-2px_-2px_5px_rgba(200,250,255,0.4)]",
  },
  outline: {
    base: "bg-neu text-pastel-ink border border-pastel-border/60",
    shadow: "shadow-[4px_4px_8px_rgba(197,202,209,0.7),-4px_-4px_8px_rgba(255,255,255,0.9)]",
    active: "translate-y-[2px] shadow-[inset_3px_3px_6px_rgba(197,202,209,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]",
  },
  chip: {
    base: "rounded-full px-4 py-2 text-sm font-medium bg-neu text-pastel-ink border border-pastel-border/40",
    shadow: "shadow-[3px_3px_6px_rgba(197,202,209,0.6),-3px_-3px_6px_rgba(255,255,255,0.85)]",
    active: "translate-y-[1px] shadow-[inset_2px_2px_4px_rgba(197,202,209,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]",
  },
  chipActive: {
    base: "rounded-full px-4 py-2 text-sm font-medium bg-pastel-primary text-white border-0",
    shadow: "shadow-[3px_3px_6px_rgba(197,202,209,0.6),-3px_-3px_6px_rgba(255,255,255,0.85),0_0_10px_rgba(88,204,2,0.3)]",
    active: "translate-y-[1px] shadow-[inset_2px_2px_4px_rgba(70,163,2,0.4),inset_-2px_-2px_4px_rgba(120,220,40,0.3)]",
  },
  option: {
    base: "w-full rounded-xl p-4 text-left font-medium text-pastel-ink bg-neu border border-pastel-primary/20",
    shadow: "shadow-[4px_4px_8px_rgba(197,202,209,0.6),-4px_-4px_8px_rgba(255,255,255,0.9)]",
    active: "translate-y-[2px] shadow-[inset_3px_3px_6px_rgba(197,202,209,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]",
  },
  optionCorrect: {
    base: "w-full rounded-xl p-4 text-left font-medium text-pastel-ink border border-pastel-success bg-pastel-mint",
    shadow: "shadow-[4px_4px_8px_rgba(197,202,209,0.6),-4px_-4px_8px_rgba(255,255,255,0.9),0_0_12px_rgba(88,204,2,0.35)]",
    active: "translate-y-[2px] shadow-[inset_3px_3px_6px_rgba(72,140,62,0.4)]",
  },
  optionWrong: {
    base: "w-full rounded-xl p-4 text-left font-medium text-pastel-ink border border-pastel-error bg-pastel-rose/60",
    shadow: "shadow-[4px_4px_8px_rgba(197,202,209,0.6),-4px_-4px_8px_rgba(255,255,255,0.9)]",
    active: "translate-y-[2px] shadow-[inset_3px_3px_6px_rgba(180,80,80,0.3)]",
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
