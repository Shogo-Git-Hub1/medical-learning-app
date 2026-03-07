"use client";

/**
 * Shared visual primitives for the roadmap UI.
 * Used by both RoadmapList (all-subjects view) and SubjectRoadmap (single-subject view).
 */

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lesson } from "@/types";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type SubjectTheme = {
  main: string;
  border: string;
  grad0: string;
  grad1: string;
  icon: string;
};

export type PreviewData = {
  lesson: Lesson;
  theme: SubjectTheme;
  done: boolean;
  locked: boolean;
  /** Title of the immediately preceding lesson — shown when the node is locked. */
  prevLessonTitle?: string;
};

// ─── Subject themes ────────────────────────────────────────────────────────────
export const SUBJECT_THEMES: Record<string, SubjectTheme> = {
  "細胞生物学":  { main: "#4DD0E1", border: "#0097A7", grad0: "#4DD0E1", grad1: "#00ACC1", icon: "🔬" },
  "生化学":      { main: "#FFB74D", border: "#E65100", grad0: "#FFB74D", grad1: "#FB8C00", icon: "⚗️" },
  "組織学":      { main: "#CE93D8", border: "#7B1FA2", grad0: "#CE93D8", grad1: "#AB47BC", icon: "🧫" },
  "解剖学":      { main: "#64B5F6", border: "#1565C0", grad0: "#64B5F6", grad1: "#1E88E5", icon: "🫀" },
  "生理学":      { main: "#81C784", border: "#2E7D32", grad0: "#81C784", grad1: "#43A047", icon: "💓" },
  "免疫学":      { main: "#4DB6AC", border: "#00695C", grad0: "#4DB6AC", grad1: "#00897B", icon: "🛡️" },
  "内分泌学":    { main: "#EF9A9A", border: "#C62828", grad0: "#EF9A9A", grad1: "#E57373", icon: "🦋" },
  "微生物学総論": { main: "#90A4AE", border: "#37474F", grad0: "#90A4AE", grad1: "#607D8B", icon: "🦠" },
  "ウイルス学":  { main: "#F48FB1", border: "#880E4F", grad0: "#F48FB1", grad1: "#EC407A", icon: "🧪" },
  "細菌学":      { main: "#A5D6A7", border: "#1B5E20", grad0: "#A5D6A7", grad1: "#66BB6A", icon: "🔵" },
  "真菌学":      { main: "#BCAAA4", border: "#4E342E", grad0: "#BCAAA4", grad1: "#8D6E63", icon: "🍄" },
  "薬理学":      { main: "#F06292", border: "#880E4F", grad0: "#F06292", grad1: "#E91E63", icon: "💊" },
  "病理学":      { main: "#FF8A65", border: "#BF360C", grad0: "#FF8A65", grad1: "#F4511E", icon: "🩺" },
  "遺伝子医学":  { main: "#9FA8DA", border: "#283593", grad0: "#9FA8DA", grad1: "#5C6BC0", icon: "🧬" },
  "医療倫理":    { main: "#FFD54F", border: "#E65100", grad0: "#FFD54F", grad1: "#FFCA28", icon: "⚖️" },
};

export const DEFAULT_THEME: SubjectTheme = {
  main: "#58CC02", border: "#46A302", grad0: "#58CC02", grad1: "#46A302", icon: "📚",
};

// ─── Layout constants ──────────────────────────────────────────────────────────
export const NODE_HEIGHT = 116;
export const NODE_SIZE   = 64;
export const SVG_W       = 300;
export const BOTTOM_PAD  = 44;

/** 8-step zigzag wave (normalized 0–1): center → left → far-left → left → center → right → far-right → right */
export const ZIGZAG = [0.5, 0.28, 0.12, 0.28, 0.5, 0.72, 0.88, 0.72] as const;

export function getXRatio(index: number): number {
  return ZIGZAG[index % ZIGZAG.length];
}

function nodeCenter(index: number): { x: number; y: number } {
  return { x: getXRatio(index) * SVG_W, y: index * NODE_HEIGHT + NODE_HEIGHT / 2 };
}

/**
 * Build a smooth cubic-Bezier SVG path through the first `nodeCount` nodes.
 */
export function buildSvgPath(nodeCount: number): string {
  if (nodeCount < 2) return "";
  const pts = Array.from({ length: nodeCount }, (_, i) => nodeCenter(i));
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const midY = ((p.y + c.y) / 2).toFixed(1);
    d += ` C ${p.x.toFixed(1)} ${midY}, ${c.x.toFixed(1)} ${midY}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  return d;
}

// ─── LessonNode ────────────────────────────────────────────────────────────────
export interface LessonNodeProps {
  lesson: Lesson;
  index: number;
  done: boolean;
  locked: boolean;
  isCurrent: boolean;
  theme: SubjectTheme;
  onTap: () => void;
}

export function LessonNode({ lesson, index, done, locked, isCurrent, theme, onTap }: LessonNodeProps) {
  const xRatio  = getXRatio(index);
  const nodeTop = index * NODE_HEIGHT + (NODE_HEIGHT - NODE_SIZE) / 2;

  // ── Label side ─────────────────────────────────────────────────────────────
  // For center nodes (xRatio ≈ 0.5), place the label opposite to the direction
  // of the next node so it never overlaps the connecting path.
  const nextXRatio = getXRatio(index + 1);
  const labelSide: "right" | "left" =
    xRatio < 0.45 ? "right"
    : xRatio > 0.55 ? "left"
    : nextXRatio > 0.5 ? "left"   // center node, next goes right → label on left
    : "right";                     // center node, next goes left  → label on right

  const labelBase: React.CSSProperties = {
    position: "absolute",
    fontSize: 11,
    fontWeight: 700,
    fontFamily: "var(--font-nunito)",
    lineHeight: "1.35",
    color: locked ? "#A0AEC0" : theme.border,
    pointerEvents: "none",
    zIndex: 3,
    maxWidth: 90,
  };
  const labelStyle: React.CSSProperties =
    labelSide === "right"
      ? { ...labelBase, left: `calc(${xRatio * 100}% + ${NODE_SIZE / 2 + 6}px)`, top: nodeTop + NODE_SIZE / 2, transform: "translateY(-50%)" }
      : { ...labelBase, right: `calc(${(1 - xRatio) * 100}% + ${NODE_SIZE / 2 + 6}px)`, top: nodeTop + NODE_SIZE / 2, transform: "translateY(-50%)", textAlign: "right" };

  // ── Circle style ───────────────────────────────────────────────────────────
  const circleStyle: React.CSSProperties = done
    ? {
        width: NODE_SIZE, height: NODE_SIZE, borderRadius: "50%",
        background: `linear-gradient(145deg, ${theme.grad0}, ${theme.grad1})`,
        boxShadow: `0 5px 0 ${theme.border}, 0 8px 20px ${theme.main}44`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }
    : locked
    ? {
        width: NODE_SIZE, height: NODE_SIZE, borderRadius: "50%",
        background: "#E2E8F0", boxShadow: "0 5px 0 #A0AEC0",
        display: "flex", alignItems: "center", justifyContent: "center",
      }
    : {
        width: NODE_SIZE, height: NODE_SIZE, borderRadius: "50%",
        background: `linear-gradient(145deg, ${theme.grad0}, ${theme.grad1})`,
        boxShadow: isCurrent
          ? `0 5px 0 ${theme.border}, 0 10px 28px ${theme.main}55, 0 0 0 4px white, 0 0 0 7px ${theme.main}44`
          : `0 5px 0 ${theme.border}, 0 6px 16px ${theme.main}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
      };

  const icon = done ? (
    <svg viewBox="0 0 24 24" width={28} height={28} fill="none" aria-hidden>
      <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : locked ? (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#A0AEC0" strokeWidth={2} />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#A0AEC0" strokeWidth={2} />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width={26} height={26} aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white" opacity={0.92} />
    </svg>
  );

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    left: `calc(${xRatio * 100}% - ${NODE_SIZE / 2}px)`,
    top: nodeTop,
    width: NODE_SIZE,
    height: NODE_SIZE,
    zIndex: 2,
  };

  return (
    <>
      <button
        type="button"
        style={wrapStyle}
        onClick={onTap}
        className="transition-transform duration-150 active:scale-90"
        aria-label={lesson.title}
      >
        <div style={{ position: "relative", width: NODE_SIZE, height: NODE_SIZE }}>
          {isCurrent && !done && !locked && (
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: theme.main, opacity: 0.28 }}
              aria-hidden
            />
          )}
          <div style={circleStyle}>{icon}</div>
        </div>
      </button>
      <div style={labelStyle}>{lesson.title}</div>
    </>
  );
}

// ─── SubjectNodes ──────────────────────────────────────────────────────────────
/**
 * The path + lesson-node container for a single subject.
 * Accepts an optional `containerRef` for external scroll targeting.
 */
export interface SubjectNodesProps {
  lessons: Lesson[];
  completedIds: string[];
  theme: SubjectTheme;
  onNodeTap: (data: PreviewData) => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function SubjectNodes({ lessons, completedIds, theme, onNodeTap, containerRef }: SubjectNodesProps) {
  const completedCount = lessons.filter((l) => completedIds.includes(l.id)).length;
  const containerH     = lessons.length * NODE_HEIGHT + BOTTOM_PAD;

  const states = lessons.map((lesson, i) => {
    const done        = completedIds.includes(lesson.id);
    const allPrevDone = i === 0 || lessons.slice(0, i).every((l) => completedIds.includes(l.id));
    return { done, locked: !allPrevDone };
  });
  const currentIndex = states.findIndex((s) => !s.done && !s.locked);

  const fullPath     = buildSvgPath(lessons.length);
  const progressPath = completedCount >= 2 ? buildSvgPath(completedCount) : null;

  return (
    <div ref={containerRef} className="relative" style={{ height: containerH }}>
      {/* SVG road */}
      <svg
        className="absolute inset-0 w-full pointer-events-none"
        style={{ height: containerH }}
        viewBox={`0 0 ${SVG_W} ${containerH}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={fullPath}
          fill="none"
          stroke="#CBD5E0"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 13"
          vectorEffect="non-scaling-stroke"
        />
        {progressPath && (
          <path
            d={progressPath}
            fill="none"
            stroke={theme.main}
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 13"
            opacity={0.85}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Lesson nodes */}
      {lessons.map((lesson, i) => (
        <LessonNode
          key={lesson.id}
          lesson={lesson}
          index={i}
          done={states[i].done}
          locked={states[i].locked}
          isCurrent={i === currentIndex}
          theme={theme}
          onTap={() =>
            onNodeTap({
              lesson,
              theme,
              done: states[i].done,
              locked: states[i].locked,
              prevLessonTitle: states[i].locked ? lessons[i - 1]?.title : undefined,
            })
          }
        />
      ))}
    </div>
  );
}

// ─── LessonPreviewSheet ────────────────────────────────────────────────────────
/**
 * Modal bottom sheet that slides up when a lesson node is tapped.
 * Supports drag-down-to-close gesture on mobile.
 */
export function LessonPreviewSheet({
  preview,
  onClose,
}: {
  preview: PreviewData | null;
  onClose: () => void;
}) {
  const router      = useRouter();
  const dragStartY  = useRef(0);
  const [dragY, setDragY] = useState(0);

  // Retain last non-null data so content stays visible during the close animation.
  const lastPreviewRef = useRef<PreviewData | null>(null);
  if (preview) lastPreviewRef.current = preview;
  const data = preview ?? lastPreviewRef.current;

  const isOpen     = preview !== null;
  const isDragging = dragY > 0;

  const sheetTransform  = !isOpen ? "translateY(105%)" : isDragging ? `translateY(${dragY}px)` : "translateY(0)";
  const sheetTransition = isDragging ? "none" : "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)";

  const handleTouchStart = (e: React.TouchEvent) => { dragStartY.current = e.touches[0].clientY; };
  const handleTouchMove  = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragY(delta);
  };
  const handleTouchEnd = () => {
    if (dragY > 64) onClose();
    setDragY(0);
  };

  const handleStart = () => {
    onClose();
    if (data) router.push(`/lesson/${data.lesson.id}?from=/subjects`);
  };

  if (!data) return null;

  const { lesson, theme, done, locked, prevLessonTitle } = data;
  const questionCount = lesson.questionIds.length;
  const xpEstimate    = questionCount * 10;

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: isOpen ? "auto" : "none" }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl"
        style={{
          background: "var(--neu-bg)",
          transform: sheetTransform,
          transition: sheetTransition,
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label={lesson.title}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2" aria-hidden>
          <div className="w-10 h-1.5 rounded-full bg-gray-300" />
        </div>

        {/* Colored header card */}
        <div
          className="mx-4 mb-4 rounded-2xl p-4 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.grad0}, ${theme.grad1})`,
            boxShadow: `0 4px 16px ${theme.main}44`,
          }}
        >
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/10" aria-hidden />
          <div className="relative flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/25 text-2xl select-none shrink-0">
              {theme.icon}
            </div>
            <div className="min-w-0">
              <p className="text-white/75 text-[11px] font-bold tracking-wide uppercase mb-0.5">
                {done ? "完了済み" : locked ? "ロック中" : "次のレッスン"}
              </p>
              <p className="text-white font-bold text-base font-nunito leading-snug">{lesson.title}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-4" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)" }}>
          {locked ? (
            <>
              <div
                className="rounded-2xl p-4 mb-4 flex items-start gap-3"
                style={{ background: "#FFF8E1", border: "1.5px solid #FFE082" }}
              >
                <div className="shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#F59E0B" strokeWidth={2} />
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#F59E0B" strokeWidth={2} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-800 mb-1">ロックされています</p>
                  {prevLessonTitle ? (
                    <p className="text-xs text-amber-700 leading-relaxed">
                      「{prevLessonTitle}」を完了するとアンロックされます
                    </p>
                  ) : (
                    <p className="text-xs text-amber-700">前のレッスンを完了してください</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-150 active:scale-[0.97]"
                style={{ background: "#E2E8F0", color: "#718096", boxShadow: "0 4px 0 #A0AEC0" }}
              >
                とじる
              </button>
            </>
          ) : (
            <>
              {/* Stats */}
              <div className="flex gap-3 mb-5">
                <div
                  className="flex-1 rounded-2xl py-3 px-2 text-center"
                  style={{ background: "#EBF8FF", border: "1.5px solid #BEE3F8" }}
                >
                  <p className="text-xl font-bold text-blue-700 font-nunito">{questionCount}</p>
                  <p className="text-[11px] text-blue-500 font-bold mt-0.5">問題</p>
                </div>
                <div
                  className="flex-1 rounded-2xl py-3 px-2 text-center"
                  style={{ background: "#FFFFF0", border: "1.5px solid #FAF089" }}
                >
                  <p className="text-xl font-bold text-yellow-600 font-nunito">+{xpEstimate}</p>
                  <p className="text-[11px] text-yellow-500 font-bold mt-0.5">XP</p>
                </div>
                {done && (
                  <div
                    className="flex-1 rounded-2xl py-3 px-2 text-center"
                    style={{ background: "#F0FFF4", border: "1.5px solid #C6F6D5" }}
                  >
                    <p className="text-xl font-bold text-green-600 font-nunito">✓</p>
                    <p className="text-[11px] text-green-500 font-bold mt-0.5">完了</p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleStart}
                className="w-full py-4 rounded-2xl font-bold text-base font-nunito transition-all duration-150 active:scale-[0.97]"
                style={{
                  background: `linear-gradient(135deg, ${theme.grad0}, ${theme.grad1})`,
                  color: "white",
                  boxShadow: `0 5px 0 ${theme.border}, 0 8px 20px ${theme.main}44`,
                }}
              >
                {done ? "もう一度挑戦する" : "スタート"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
