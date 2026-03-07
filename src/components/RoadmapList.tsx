"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import {
  getLessonsGroupedBySubject,
  SUBJECT_DISPLAY_ORDER,
  ROADMAP_LEVELS,
} from "@/services/lessonService";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CharacterLine } from "@/components/CharacterLine";
import type { Lesson } from "@/types";

export function RoadmapList() {
  const { progress } = useProgress();
  const grouped = getLessonsGroupedBySubject();

  return (
    <div className="space-y-8">
      <CharacterLine
        characterId="shirin"
        lineKey="roadmapHint"
        size="sm"
        className="mb-2"
      />
      {SUBJECT_DISPLAY_ORDER.map((subject, si) => {
        const lessons = grouped[subject];
        if (!lessons || lessons.length === 0) return null;

        const completedInSubject = lessons.filter((l) =>
          progress.completedLessonIds.includes(l.id)
        ).length;
        const totalInSubject = lessons.length;

        const lessonsByLevel = ROADMAP_LEVELS.reduce(
          (acc, level) => {
            acc[level] = lessons.filter((l) => l.level === level);
            return acc;
          },
          {} as Record<number, Lesson[]>
        );

        return (
          <section
            key={subject}
            className="animate-fade-in-up"
            style={{ animationDelay: `${si * 60}ms`, animationFillMode: "both" }}
          >
            <div className="neu-card rounded-2xl p-5 mb-4 relative overflow-hidden">
              {/* アクセントライン */}
              <div
                className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-60"
                style={{ background: "linear-gradient(90deg, transparent, #58cc02, transparent)" }}
                aria-hidden
              />
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-6 rounded-full bg-pastel-primary" aria-hidden
                  style={{ boxShadow: "0 0 8px rgba(88,204,2,0.6)" }}
                />
                <h2 className="text-base font-bold text-pastel-ink font-nunito">{subject}</h2>
              </div>
              <ProgressBar
                current={completedInSubject}
                total={totalInSubject}
                label="レッスン"
                variant="roadmap"
              />
            </div>

            <div className="space-y-5 pl-2">
              {ROADMAP_LEVELS.map((level) => {
                const levelLessons = lessonsByLevel[level];
                const hasLessons = levelLessons && levelLessons.length > 0;

                return (
                  <div key={level} className="space-y-2">
                    <h3 className="text-xs font-bold text-pastel-ink/50 font-mono uppercase tracking-widest flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-[10px] font-bold text-pastel-primary"
                        style={{ boxShadow: "var(--neu-shadow-sm)" }}
                        aria-hidden
                      >
                        {level}
                      </span>
                      LV.{level}
                    </h3>
                    <ul className="space-y-2 pl-1">
                      {hasLessons ? (
                        levelLessons.map((lesson) => {
                          const allInSubject = lessons;
                          const prevLessons = allInSubject.filter(
                            (l) =>
                              l.level < lesson.level ||
                              (l.level === lesson.level &&
                                (l.orderInSubject ?? 0) < (lesson.orderInSubject ?? 0))
                          );
                          const prevDone =
                            prevLessons.length === 0 ||
                            prevLessons.every((l) =>
                              progress.completedLessonIds.includes(l.id)
                            );
                          const done = progress.completedLessonIds.includes(lesson.id);
                          const locked = !prevDone;

                          return (
                            <li key={lesson.id}>
                              {locked ? (
                                <div className="neu-inset rounded-xl p-3 flex items-center justify-between opacity-50">
                                  <span className="font-semibold text-sm text-pastel-ink">{lesson.title}</span>
                                  <span className="text-xs">🔒</span>
                                </div>
                              ) : (
                                <Link
                                  href={`/lesson/${lesson.id}?from=/roadmap`}
                                  className="neu-card-sm rounded-xl p-3 flex items-center justify-between transition-all duration-200 active:scale-[0.98] relative overflow-hidden group block"
                                >
                                  <div
                                    className="absolute top-0 left-3 right-3 h-0.5 rounded-b-full opacity-0 group-hover:opacity-70 transition-opacity"
                                    style={{ background: "linear-gradient(90deg, transparent, #58cc02, transparent)" }}
                                    aria-hidden
                                  />
                                  <span className="font-semibold text-sm text-pastel-ink">{lesson.title}</span>
                                  {done ? (
                                    <span
                                      className="text-pastel-primary font-bold"
                                      style={{ textShadow: "0 0 8px rgba(88,204,2,0.6)" }}
                                    >
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="text-pastel-primary/50 group-hover:text-pastel-primary transition-colors">›</span>
                                  )}
                                </Link>
                              )}
                            </li>
                          );
                        })
                      ) : (
                        <li className="neu-inset rounded-xl px-4 py-3">
                          <span className="text-xs font-mono text-pastel-ink/40">// 準備中</span>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
