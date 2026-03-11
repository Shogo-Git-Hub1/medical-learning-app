"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useProgressContext } from "@/contexts/ProgressContext";
import { getDueReviewQuestionIdsThatExist } from "@/services/lessonService";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "ホーム",
    icon: (active) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    href: "/subjects",
    label: "科目",
    icon: (active) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/review",
    label: "復習",
    icon: (active) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    ),
  },
  {
    href: "/browse",
    label: "ブラウズ",
    icon: (active) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "プロフィール",
    icon: (active) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
];

export function DesktopSidebar() {
  const rawPathname = usePathname();
  const [pathname, setPathname] = useState("");
  useEffect(() => { setPathname(rawPathname); }, [rawPathname]);

  const { progress, level, xpInLevel, xpNeededForNext } = useProgressContext();
  const xpPct = Math.round((xpInLevel / (xpInLevel + xpNeededForNext)) * 100);
  const dueCount = getDueReviewQuestionIdsThatExist(progress).length;

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className="hidden md:flex flex-col fixed left-0 top-0 h-screen z-30"
      style={{
        width: 240,
        background: "#ffffff",
        borderRight: "1.5px solid rgba(0,0,0,0.07)",
        boxShadow: "4px 0 20px rgba(0,0,0,0.04)",
      }}
      aria-label="サイドナビゲーション"
    >
      {/* Logo */}
      <div className="px-5 pt-7 pb-8">
        <Link href="/" className="flex items-center gap-2.5 select-none" aria-label="MediSpark ホーム">
          <SparkIcon />
          <span
            className="text-[22px] font-bold font-nunito tracking-tight"
            style={{ color: "#58cc02" }}
          >
            MediSpark
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5" aria-label="メインナビゲーション">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isActive(href);
          const isReview = href === "/review";
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold font-nunito text-[15px] transition-all duration-200 active:scale-[0.97]"
              style={{
                color: active ? "#46a302" : "#9ca3af",
                background: active ? "rgba(88,204,2,0.1)" : "transparent",
                border: `2px solid ${active ? "rgba(88,204,2,0.22)" : "transparent"}`,
              }}
            >
              <span className="relative" style={{ color: active ? "#58cc02" : "#9ca3af" }}>
                {icon(active)}
                {isReview && dueCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full flex items-center justify-center text-white font-bold leading-none px-0.5"
                    style={{ background: "#E53935", fontSize: "9px" }}
                    aria-label={`復習 ${dueCount} 問`}
                  >
                    {dueCount > 99 ? "99" : dueCount}
                  </span>
                )}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* XP / Level footer */}
      <div className="px-4 pb-6 pt-3 border-t border-black/[0.06]">
        <Link
          href="/profile"
          className="block rounded-2xl p-3 transition-all duration-150 active:scale-[0.97]"
          style={{ background: "rgba(88,204,2,0.07)", border: "1.5px solid rgba(88,204,2,0.15)" }}
          aria-label="プロフィールを見る"
        >
          {/* Level + streak */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold font-nunito" style={{ color: "#46a302" }}>
              Lv. {level}
            </span>
            <span className="text-[11px] font-mono text-[#9ca3af] flex items-center gap-1">
              🔥 {progress.streakDays}日
            </span>
          </div>

          {/* XP bar */}
          <div className="h-2 rounded-full bg-black/[0.07] overflow-hidden mb-1.5">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${xpPct}%`, background: "linear-gradient(90deg, #58cc02, #46a302)" }}
            />
          </div>

          {/* XP numbers */}
          <div className="flex justify-between">
            <span className="text-[10px] font-mono" style={{ color: "#58cc02" }}>
              {xpInLevel} XP
            </span>
            <span className="text-[10px] font-mono text-[#9ca3af]">
              あと {xpNeededForNext} XP
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
}

function SparkIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L4.5 13.5H11.5L10.5 22L19.5 10.5H12.5L13 2Z"
        fill="#58cc02"
        stroke="#46a302"
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
