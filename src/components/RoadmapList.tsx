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
      {SUBJECT_DISPLAY_ORDER.map((subject) => {
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
          <section key={subject}>
            <div className="mb-3 flex flex-col gap-2">
              <h2 className="text-lg font-bold text-pastel-ink flex items-center gap-2">
                <span className="w-2 h-6 rounded bg-pastel-primary" aria-hidden />
                {subject}
              </h2>
              <ProgressBar
                current={completedInSubject}
                total={totalInSubject}
                label="レッスン"
                variant="roadmap"
                className="max-w-xs"
              />
            </div>
            <div className="space-y-6">
              {ROADMAP_LEVELS.map((level) => {
                const levelLessons = lessonsByLevel[level];
                const hasLessons = levelLessons && levelLessons.length > 0;

                return (
                  <div key={level} className="space-y-2">
                    <h3 className="text-sm font-semibold text-pastel-ink/80 flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-pastel-primary/20 text-pastel-primary-dark font-bold text-xs"
                        aria-hidden
                      >
                        {level}
                      </span>
                      レベル{level}
                    </h3>
                    <ul className="space-y-3 pl-1">
                      {hasLessons ? (
                        levelLessons.map((lesson, i) => {
                          const allInSubject = lessons;
                          const prevLessons = allInSubject.filter(
                            (l) =>
                              l.level < lesson.level ||
                              (l.level === lesson.level &&
                                (l.orderInSubject ?? 0) < (lesson.orderInSubject ?? 0)
                              )
                          );
                          const prevDone =
                            prevLessons.length === 0 ||
                            prevLessons.every((l) =>
                              progress.completedLessonIds.includes(l.id)
                            );
                          const done = progress.completedLessonIds.includes(
                            lesson.id
                          );
                          const locked = !prevDone;

                          return (
                            <li key={lesson.id}>
                              {locked ? (
                                <div className="block rounded-xl border-2 p-4 border-pastel-border bg-pastel-slate text-pastel-ink/50 cursor-not-allowed">
                                  <span className="font-semibold">
                                    {lesson.title}
                                  </span>
                                  <span className="ml-2 text-sm">
                                    🔒 この分野の前のレッスンを完了してください
                                  </span>
                                </div>
                              ) : (
                                <Link
                                  href={`/lesson/${lesson.id}`}
                                  className="block rounded-xl border-2 p-4 border-pastel-primary bg-pastel-card hover:bg-pastel-mint/60 text-pastel-ink transition"
                                >
                                  <span className="font-semibold">
                                    {lesson.title}
                                  </span>
                                  {done && (
                                    <span className="ml-2 text-sm text-pastel-primary-dark">
                                      ✓ 完了
                                    </span>
                                  )}
                                </Link>
                              )}
                              {i < levelLessons.length - 1 && (
                                <div
                                  className="h-4 w-0.5 bg-pastel-border ml-6"
                                  aria-hidden
                                />
                              )}
                            </li>
                          );
                        })
                      ) : (
                        <li className="rounded-xl border-2 border-dashed border-pastel-border bg-pastel-slate/30 px-4 py-3 text-sm text-pastel-ink/50">
                          準備中
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
