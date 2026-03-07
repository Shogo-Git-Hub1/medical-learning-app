"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const isActive = (href: string) => {
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
              <span style={{ color: active ? "#58cc02" : "#c4c6d0" }}>
                {icon(active)}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>
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
