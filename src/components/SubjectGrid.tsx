"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getLessonsGroupedBySubject, SUBJECT_DISPLAY_ORDER } from "@/services/lessonService";
import { ProgressBar } from "@/components/ui/ProgressBar";

const SUBJECT_META: Record<string, { emoji: string; glow: string; accent: string }> = {
  "細胞生物学": { emoji: "🔬", glow: "rgba(59,130,246,0.35)", accent: "#3b82f6" },
  "生化学":     { emoji: "⚗️",  glow: "rgba(139,92,246,0.35)", accent: "#8b5cf6" },
  "組織学":     { emoji: "🧫", glow: "rgba(236,72,153,0.35)", accent: "#ec4899" },
  "解剖学":     { emoji: "🦴", glow: "rgba(249,115,22,0.35)", accent: "#f97316" },
  "生理学":     { emoji: "🫀", glow: "rgba(239,68,68,0.35)", accent: "#ef4444" },
  "免疫学":     { emoji: "🛡️", glow: "rgba(88,204,2,0.35)", accent: "#58cc02" },
  "内分泌学":   { emoji: "🧬", glow: "rgba(20,184,166,0.35)", accent: "#14b8a6" },
  "微生物学総論": { emoji: "🦠", glow: "rgba(234,179,8,0.35)", accent: "#eab308" },
  "ウイルス学": { emoji: "🧪", glow: "rgba(6,182,212,0.35)", accent: "#06b6d4" },
  "細菌学":     { emoji: "🔭", glow: "rgba(99,102,241,0.35)", accent: "#6366f1" },
  "真菌学":     { emoji: "🍄", glow: "rgba(245,158,11,0.35)", accent: "#f59e0b" },
  "薬理学":     { emoji: "💊", glow: "rgba(14,165,233,0.35)", accent: "#0ea5e9" },
  "病理学":     { emoji: "🔍", glow: "rgba(244,63,94,0.35)", accent: "#f43f5e" },
  "遺伝子医学": { emoji: "🧬", glow: "rgba(167,139,250,0.35)", accent: "#a78bfa" },
  "医療倫理":   { emoji: "⚖️", glow: "rgba(148,163,184,0.35)", accent: "#94a3b8" },
};

const FALLBACK_META = { emoji: "📚", glow: "rgba(88,204,2,0.3)", accent: "#58cc02" };

export function SubjectGrid() {
  const { progress } = useProgress();
  const grouped = getLessonsGroupedBySubject();

  return (
    <div className="grid grid-cols-2 gap-4">
      {SUBJECT_DISPLAY_ORDER.map((subject, i) => {
        const lessons = grouped[subject] ?? [];
        const completed = lessons.filter((l) =>
          progress.completedLessonIds.includes(l.id)
        ).length;
        const total = lessons.length;
        const meta = SUBJECT_META[subject] ?? FALLBACK_META;

        return (
          <Link
            key={subject}
            href={`/subjects/${encodeURIComponent(subject)}`}
            className="neu-card rounded-2xl p-4 flex flex-col items-center gap-2 relative overflow-hidden transition-all duration-200 active:scale-95 animate-card-enter"
            style={{
              animationDelay: `${i * 40}ms`,
              animationFillMode: "both",
            }}
          >
            {/* 上部アクセントライン */}
            <div
              className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full"
              style={{ background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)` }}
              aria-hidden
            />
            <span className="text-4xl leading-none mt-1">{meta.emoji}</span>
            <span className="text-sm font-bold text-center text-pastel-ink leading-tight font-nunito">
              {subject}
            </span>
            <span className="text-[10px] font-mono text-pastel-ink/45">
              {completed}/{total} レッスン
            </span>
            <ProgressBar
              current={completed}
              total={total}
              variant="roadmap"
              showLabel={false}
              className="w-full"
            />
          </Link>
        );
      })}
    </div>
  );
}
