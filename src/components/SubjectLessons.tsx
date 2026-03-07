"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getLessonsGroupedBySubject } from "@/services/lessonService";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Lesson } from "@/types";

type Props = {
  subject: string;
};

export function SubjectLessons({ subject }: Props) {
  const { progress } = useProgress();
  const grouped = getLessonsGroupedBySubject();
  const lessons = grouped[subject] ?? [];

  const completed = lessons.filter((l) =>
    progress.completedLessonIds.includes(l.id)
  ).length;

  if (lessons.length === 0) {
    return (
      <div className="neu-inset rounded-2xl p-6 text-center">
        <p className="font-mono text-sm text-pastel-ink/50">{"// この科目にはまだレッスンがありません"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div
        className="neu-card rounded-2xl p-4 animate-fade-in-up"
        style={{ animationFillMode: "both" }}
      >
        <p className="text-[10px] font-mono text-pastel-ink/45 uppercase tracking-widest mb-2">Progress</p>
        <ProgressBar
          current={completed}
          total={lessons.length}
          label="レッスン"
          variant="roadmap"
        />
      </div>

      <ul className="space-y-3">
        {lessons.map((lesson, i) => {
          const prevLessons = lessons.slice(0, i);
          const prevDone =
            prevLessons.length === 0 ||
            prevLessons.every((l: Lesson) => progress.completedLessonIds.includes(l.id));
          const done = progress.completedLessonIds.includes(lesson.id);
          const locked = !prevDone;

          return (
            <li
              key={lesson.id}
              className="animate-card-enter"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            >
              {locked ? (
                <div className="neu-inset rounded-xl p-4 flex items-center justify-between opacity-50">
                  <div>
                    <span className="font-semibold text-sm text-pastel-ink">{lesson.title}</span>
                    <p className="text-[10px] font-mono text-pastel-ink/50 mt-0.5">{"LEVEL "}{lesson.level}{" // LOCKED"}</p>
                  </div>
                  <span className="text-base">🔒</span>
                </div>
              ) : (
                <Link
                  href={`/lesson/${lesson.id}?from=${encodeURIComponent(`/subjects/${encodeURIComponent(subject)}`)}`}
                  className="neu-card-sm rounded-xl p-4 flex items-center justify-between transition-all duration-200 active:scale-[0.98] relative overflow-hidden group block"
                >
                  {/* ホバー時のグローライン */}
                  <div
                    className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full opacity-0 group-hover:opacity-80 transition-opacity"
                    style={{ background: "linear-gradient(90deg, transparent, #58cc02, transparent)" }}
                    aria-hidden
                  />
                  <div>
                    <span className="font-semibold text-sm text-pastel-ink">{lesson.title}</span>
                    <p className="text-[10px] font-mono text-pastel-ink/40 mt-0.5">LEVEL {lesson.level}</p>
                  </div>
                  {done ? (
                    <span
                      className="text-pastel-primary font-bold text-lg"
                      style={{ textShadow: "0 0 8px rgba(88,204,2,0.6)" }}
                    >
                      ✓
                    </span>
                  ) : (
                    <span className="text-pastel-primary/60 text-xl group-hover:text-pastel-primary transition-colors">›</span>
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
