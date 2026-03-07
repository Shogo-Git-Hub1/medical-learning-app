"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Per-tab accent color — intentionally distinct to add visual interest
const NAV_ITEMS = [
  {
    href: "/",
    label: "ホーム",
    color: "#81C784",
    border: "#2E7D32",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    href: "/subjects",
    label: "科目",
    color: "#64B5F6",
    border: "#1565C0",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/browse",
    label: "ブラウズ",
    color: "#CE93D8",
    border: "#7B1FA2",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "プロフィール",
    color: "#4DB6AC",
    border: "#00695C",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
] as const;

export function BottomNav() {
  const rawPathname = usePathname();
  const [pathname, setPathname] = useState("");
  useEffect(() => { setPathname(rawPathname); }, [rawPathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 md:hidden"
      style={{
        background: "var(--neu-bg)",
        boxShadow: "0 -1px 0 rgba(0,0,0,0.06), 0 -4px 16px rgba(0,0,0,0.07)",
      }}
      aria-label="メインナビゲーション"
    >
      <ul className="flex items-stretch justify-around px-1 pb-safe">
        {NAV_ITEMS.map(({ href, label, color, border, icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="relative flex flex-col items-center justify-center gap-1 py-2.5 px-1"
                aria-current={active ? "page" : undefined}
              >
                {/* Active pill background */}
                {active && (
                  <span
                    className="absolute inset-x-1.5 top-1.5 bottom-1.5 rounded-2xl"
                    style={{ background: `${color}22` }}
                    aria-hidden
                  />
                )}

                {/* Active top indicator bar */}
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 rounded-b-full"
                    style={{ background: color }}
                    aria-hidden
                  />
                )}

                <span
                  className="relative transition-all duration-200"
                  style={{
                    color: active ? color : "rgba(0,0,0,0.3)",
                    filter: active ? `drop-shadow(0 1px 4px ${color}88)` : "none",
                    transform: active ? "translateY(-1px)" : "translateY(0)",
                  }}
                >
                  {icon(active)}
                </span>
                <span
                  className="relative text-[10px] font-bold font-nunito transition-colors duration-200"
                  style={{ color: active ? color : "rgba(0,0,0,0.3)" }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
