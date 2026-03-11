"use client";

import Link from "next/link";
import { useProgressContext } from "@/contexts/ProgressContext";
import { getLessonsGroupedBySubject, SUBJECT_DISPLAY_ORDER } from "@/services/lessonService";
import { SUBJECT_THEMES, DEFAULT_THEME } from "@/data/subjectThemes";

export function SubjectGrid() {
  const { progress } = useProgressContext();
  const grouped = getLessonsGroupedBySubject();

  return (
    <div className="grid grid-cols-2 gap-3">
      {SUBJECT_DISPLAY_ORDER.map((subject, i) => {
        const lessons   = grouped[subject] ?? [];
        const completed = lessons.filter((l) => progress.completedLessonIds.includes(l.id)).length;
        const total     = lessons.length;
        const theme     = SUBJECT_THEMES[subject] ?? DEFAULT_THEME;
        const pct       = total > 0 ? (completed / total) * 100 : 0;

        const isDone = total > 0 && completed === total;

        return (
          <Link
            key={subject}
            href={`/subjects/${encodeURIComponent(subject)}`}
            className="block rounded-2xl p-4 relative overflow-hidden transition-all duration-150 active:scale-[0.96] animate-card-enter"
            style={{
              background: `linear-gradient(145deg, ${theme.grad0}, ${theme.grad1})`,
              boxShadow: `0 4px 0 ${theme.border}, 0 6px 16px ${theme.main}33`,
              animationDelay: `${i * 35}ms`,
              animationFillMode: "both",
            }}
            aria-label={isDone ? `${subject}（完了）` : subject}
          >
            {/* Decorative circles */}
            <div className="absolute -right-5 -top-5 w-16 h-16 rounded-full bg-white/10" aria-hidden />
            <div className="absolute -right-1 bottom-[-12px] w-9 h-9 rounded-full bg-white/10" aria-hidden />

            {/* Done badge */}
            {isDone && (
              <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </span>
            )}

            <div className="relative mt-1">
              {/* Subject icon */}
              <span className="text-3xl leading-none block mb-2 drop-shadow-sm select-none">{theme.icon}</span>

              {/* Subject name */}
              <p className="text-white font-bold text-[13px] font-nunito leading-tight mb-1 drop-shadow-sm">
                {subject}
              </p>

              {/* Lesson count */}
              <p className="text-white/75 text-[10px] font-bold mb-2">
                {completed} / {total} レッスン
              </p>

              {/* Progress bar */}
              <div className="h-2 rounded-full bg-black/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
