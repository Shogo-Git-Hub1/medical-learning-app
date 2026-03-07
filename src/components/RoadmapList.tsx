"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getLessonsGroupedBySubject, SUBJECT_DISPLAY_ORDER } from "@/services/lessonService";
import {
  SUBJECT_THEMES,
  DEFAULT_THEME,
  NODE_HEIGHT,
  BOTTOM_PAD,
  SubjectNodes,
  LessonPreviewSheet,
  type PreviewData,
} from "@/components/RoadmapPrimitives";
import type { Lesson } from "@/types";

// ─── SubjectSection ────────────────────────────────────────────────────────────
interface SubjectSectionProps {
  subject: string;
  lessons: Lesson[];
  completedIds: string[];
  subjectIndex: number;
  isCollapsed: boolean;
  onToggle: () => void;
  onNodeTap: (data: PreviewData) => void;
}

function SubjectSection({
  subject,
  lessons,
  completedIds,
  subjectIndex,
  isCollapsed,
  onToggle,
  onNodeTap,
}: SubjectSectionProps) {
  const theme          = SUBJECT_THEMES[subject] ?? DEFAULT_THEME;
  const completedCount = lessons.filter((l) => completedIds.includes(l.id)).length;
  const isDone         = lessons.length > 0 && completedCount === lessons.length;
  const subjectHref    = `/subjects/${encodeURIComponent(subject)}`;

  // Used for the max-height collapse animation
  const expandedH = lessons.length * NODE_HEIGHT + BOTTOM_PAD;

  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: `${subjectIndex * 70}ms`, animationFillMode: "both" }}
    >
      {/* ── Header banner ─────────────────────────────────────────────── */}
      <div
        className="flex items-stretch rounded-2xl mb-2 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.grad0}, ${theme.grad1})`,
          boxShadow: `0 4px 16px ${theme.main}44`,
        }}
      >
        {/* Left: Link to full subject roadmap */}
        <Link
          href={subjectHref}
          className="flex-1 flex items-center gap-2 p-4 pr-2 min-w-0 transition-opacity duration-150 active:opacity-75"
          aria-label={`${subject} の詳細ロードマップを開く`}
        >
          {/* Decorative circles (pointer-events-none so they don't intercept touch) */}
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" aria-hidden />

          <span className="text-2xl select-none drop-shadow-sm shrink-0" aria-hidden>{theme.icon}</span>
          <h2 className="text-white font-bold text-base font-nunito drop-shadow-sm truncate">
            {subject}
          </h2>
          {isDone && (
            <span className="shrink-0 text-white text-xs font-bold bg-white/25 px-2 py-0.5 rounded-full">
              完了 ✓
            </span>
          )}
        </Link>

        {/* Right: progress count + collapse toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1.5 px-4 shrink-0 transition-opacity duration-150 active:opacity-75"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? `${subject} を展開` : `${subject} を折りたたむ`}
        >
          <span className="text-white/90 text-sm font-bold">
            {completedCount}/{lessons.length}
          </span>
          {/* Chevron — points down when expanded, right when collapsed */}
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="none"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300"
            style={{ transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)", opacity: 0.8 }}
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Progress bar — sits at the bottom of the banner */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 overflow-hidden rounded-b-2xl pointer-events-none"
          aria-hidden
        >
          <div
            className="h-full bg-white/70 rounded-b-2xl transition-all duration-700 ease-out"
            style={{ width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* ── Collapsible nodes section ──────────────────────────────────── */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isCollapsed ? 0 : expandedH,
          opacity: isCollapsed ? 0 : 1,
          pointerEvents: isCollapsed ? "none" : "auto",
          // Slightly longer transition for expanding than collapsing
          transitionDuration: isCollapsed ? "280ms" : "380ms",
        }}
        aria-hidden={isCollapsed}
      >
        <SubjectNodes
          lessons={lessons}
          completedIds={completedIds}
          theme={theme}
          onNodeTap={onNodeTap}
        />
      </div>
    </section>
  );
}

// ─── RoadmapList ───────────────────────────────────────────────────────────────
export function RoadmapList() {
  const { progress } = useProgress();
  const grouped = getLessonsGroupedBySubject();

  const [preview, setPreview] = useState<PreviewData | null>(null);

  // Collapsed state: Set of subject names that are currently collapsed.
  // Initialized once after the first real progress data arrives.
  const [collapsedSubjects, setCollapsedSubjects] = useState<Set<string>>(new Set());
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (progress.completedLessonIds.length === 0) return; // wait until progress is loaded

    initialized.current = true;
    const initCollapsed = new Set<string>();

    for (const subject of SUBJECT_DISPLAY_ORDER) {
      const lessons = grouped[subject] ?? [];
      if (lessons.length > 0 && lessons.every((l) => progress.completedLessonIds.includes(l.id))) {
        initCollapsed.add(subject);
      }
    }
    setCollapsedSubjects(initCollapsed);
  }, [progress.completedLessonIds, grouped]);

  const toggleSubject = (subject: string) => {
    setCollapsedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  };

  return (
    <>
      <div className="space-y-4">
        {SUBJECT_DISPLAY_ORDER.map((subject, si) => {
          const lessons = grouped[subject];
          if (!lessons || lessons.length === 0) return null;
          return (
            <SubjectSection
              key={subject}
              subject={subject}
              lessons={lessons}
              completedIds={progress.completedLessonIds}
              subjectIndex={si}
              isCollapsed={collapsedSubjects.has(subject)}
              onToggle={() => toggleSubject(subject)}
              onNodeTap={setPreview}
            />
          );
        })}
      </div>

      <LessonPreviewSheet preview={preview} onClose={() => setPreview(null)} />
    </>
  );
}
