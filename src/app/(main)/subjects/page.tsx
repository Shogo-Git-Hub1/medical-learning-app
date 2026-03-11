import Link from "next/link";
import { SubjectGrid } from "@/components/SubjectGrid";

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      {/* モバイル専用 検索ボタン（右上） */}
      <div className="md:hidden flex justify-end">
        <Link
          href="/browse"
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-150 active:scale-[0.95]"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-sm)",
            border: "1.5px solid rgba(0,0,0,0.07)",
          }}
          aria-label="レッスンを検索"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(0,0,0,0.45)" }}>
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </Link>
      </div>

      <SubjectGrid />
    </div>
  );
}
