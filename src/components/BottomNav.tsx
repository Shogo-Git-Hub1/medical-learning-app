"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/",
    label: "ホーム",
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
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/roadmap",
    label: "マップ",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    ),
  },
  {
    href: "/browse",
    label: "ブラウズ",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 md:hidden"
      style={{
        background: "#0d1a0d",
        boxShadow: "0 -4px 24px rgba(88,204,2,0.15), 0 -1px 0 rgba(88,204,2,0.25)",
      }}
      aria-label="メインナビゲーション"
    >
      {/* トップグローライン */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(88,204,2,0.6) 30%, rgba(88,204,2,0.6) 70%, transparent)",
        }}
        aria-hidden
      />

      <ul className="flex items-stretch justify-around px-2 pb-safe">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-1 py-3 px-1 transition-all duration-200 relative"
                aria-current={active ? "page" : undefined}
              >
                {/* アクティブ時の背景グロー */}
                {active && (
                  <span
                    className="absolute inset-0 rounded-xl mx-1"
                    style={{ background: "rgba(88,204,2,0.08)" }}
                    aria-hidden
                  />
                )}
                <span
                  style={{
                    color: active ? "#58cc02" : "rgba(255,255,255,0.45)",
                    filter: active ? "drop-shadow(0 0 6px rgba(88,204,2,0.7))" : "none",
                    transition: "color 0.2s, filter 0.2s",
                  }}
                >
                  {icon(active)}
                </span>
                <span
                  className="text-[10px] font-medium font-mono tracking-wider"
                  style={{
                    color: active ? "#58cc02" : "rgba(255,255,255,0.35)",
                    textShadow: active ? "0 0 8px rgba(88,204,2,0.6)" : "none",
                  }}
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
