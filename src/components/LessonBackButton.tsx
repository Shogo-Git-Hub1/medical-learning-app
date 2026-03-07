"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/** `from` クエリパラメータからラベルを決定する（オープンリダイレクト対策あり） */
function resolveBack(from: string): { href: string; label: string } {
  if (!from.startsWith("/")) return { href: "/subjects", label: "科目一覧" };
  if (from.startsWith("/subjects")) return { href: from, label: "科目一覧" };
  if (from.startsWith("/browse"))   return { href: "/browse", label: "ブラウズ" };
  return { href: "/subjects", label: "科目一覧" };
}

export function LessonBackButton() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "";
  const back = resolveBack(from);

  return (
    <Link
      href={back.href}
      className="neu-card-sm rounded-xl px-3 py-2 text-sm font-medium text-pastel-ink/70 hover:text-pastel-ink flex items-center gap-1.5 transition-all duration-150 active:scale-[0.97] flex-shrink-0"
      aria-label={`${back.label}に戻る`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="hidden sm:inline">{back.label}</span>
    </Link>
  );
}
