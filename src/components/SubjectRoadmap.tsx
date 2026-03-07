"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";
import { getLessonsGroupedBySubject } from "@/services/lessonService";
import {
  SUBJECT_THEMES,
  DEFAULT_THEME,
  NODE_HEIGHT,
  SubjectNodes,
  LessonPreviewSheet,
  type PreviewData,
  type SubjectTheme,
} from "@/components/RoadmapPrimitives";

interface Props {
  subject: string;
}

export function SubjectRoadmap({ subject }: Props) {
  const router     = useRouter();
  const { progress } = useProgress();
  const grouped    = getLessonsGroupedBySubject();
  const lessons    = grouped[subject] ?? [];
  const theme      = SUBJECT_THEMES[subject] ?? DEFAULT_THEME;
  const completedIds = progress.completedLessonIds;

  const [preview, setPreview] = useState<PreviewData | null>(null);

  // ── Auto-scroll to current node ─────────────────────────────────────────
  // `nodesContainerRef` is attached to the <SubjectNodes> container div.
  // Once the page has rendered we calculate the current node's on-screen Y
  // position and scroll the window to center it.
  const nodesContainerRef = useRef<HTMLDivElement>(null);

  const completedCount = lessons.filter((l) => completedIds.includes(l.id)).length;

  // Recompute states to find currentIndex (same logic as SubjectNodes)
  const states = lessons.map((lesson, i) => {
    const done        = completedIds.includes(lesson.id);
    const allPrevDone = i === 0 || lessons.slice(0, i).every((l) => completedIds.includes(l.id));
    return { done, locked: !allPrevDone };
  });
  const currentIndex = states.findIndex((s) => !s.done && !s.locked);

  useEffect(() => {
    // Nothing to scroll to if every lesson is completed or all are locked
    if (currentIndex < 0 || !nodesContainerRef.current) return;

    const timer = setTimeout(() => {
      const container = nodesContainerRef.current;
      if (!container) return;

      // Position of the nodes container relative to the document
      const containerTop = container.getBoundingClientRect().top + window.scrollY;

      // Vertical centre of the target node within the container
      const nodeCentreY = currentIndex * NODE_HEIGHT + NODE_HEIGHT / 2;

      // Scroll so the target node is vertically centred in the viewport
      const scrollTarget = containerTop + nodeCentreY - window.innerHeight / 2;
      window.scrollTo({ top: Math.max(0, scrollTarget), behavior: "smooth" });
    }, 380); // let the entrance animations settle first

    return () => clearTimeout(timer);
  }, []); // run once on mount — eslint-disable-line react-hooks/exhaustive-deps

  // ── Empty state ─────────────────────────────────────────────────────────
  if (lessons.length === 0) {
    return (
      <div className="space-y-4">
        <SubjectHeader subject={subject} completedCount={0} total={0} theme={theme} onBack={() => router.back()} />
        <div className="neu-inset rounded-2xl p-8 text-center">
          <p className="font-mono text-sm text-pastel-ink/50">{"// この科目にはまだレッスンがありません"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2 animate-fade-in-up" style={{ animationFillMode: "both" }}>
        {/* ── Page header ─────────────────────────────────────────────── */}
        <SubjectHeader
          subject={subject}
          completedCount={completedCount}
          total={lessons.length}
          theme={theme}
          onBack={() => router.back()}
        />

        {/* ── Roadmap nodes ────────────────────────────────────────────── */}
        <SubjectNodes
          lessons={lessons}
          completedIds={completedIds}
          theme={theme}
          onNodeTap={setPreview}
          containerRef={nodesContainerRef}
        />
      </div>

      <LessonPreviewSheet preview={preview} onClose={() => setPreview(null)} />
    </>
  );
}

// ─── SubjectHeader ─────────────────────────────────────────────────────────────
/**
 * The top banner shown in the single-subject roadmap.
 * Larger than the compact banners used in the all-subjects list.
 */
function SubjectHeader({
  subject,
  completedCount,
  total,
  theme,
  onBack,
}: {
  subject: string;
  completedCount: number;
  total: number;
  theme: SubjectTheme;
  onBack: () => void;
}) {
  const progressPct = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.grad0}, ${theme.grad1})`,
        boxShadow: `0 6px 24px ${theme.main}55`,
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10" aria-hidden />
      <div className="absolute right-6 bottom-[-28px] w-20 h-20 rounded-full bg-white/10" aria-hidden />

      <div className="relative">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 text-sm font-bold mb-4 transition-opacity duration-150 active:opacity-60"
          aria-label="戻る"
        >
          <svg viewBox="0 0 24 24" width={18} height={18} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ロードマップに戻る
        </button>

        {/* Subject title row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl select-none drop-shadow-sm" aria-hidden>{theme.icon}</span>
          <h1 className="text-white font-bold text-xl font-nunito drop-shadow-sm leading-tight">
            {subject}
          </h1>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white/25 rounded-full px-3 py-1 text-white/95 text-sm font-bold">
            {completedCount} / {total} レッスン完了
          </div>
          {completedCount === total && total > 0 && (
            <div className="bg-white/25 rounded-full px-3 py-1 text-white text-sm font-bold flex items-center gap-1">
              <span>🎉</span> 全て完了！
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-3 rounded-full bg-white/30 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
