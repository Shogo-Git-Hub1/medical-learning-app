"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import {
  getLessonsGroupedBySubject,
  SUBJECT_DISPLAY_ORDER,
} from "@/data/db";

export function RoadmapList() {
  const { progress } = useProgress();
  const grouped = getLessonsGroupedBySubject();

  return (
    <div className="space-y-8">
      {SUBJECT_DISPLAY_ORDER.map((subject) => {
        const lessons = grouped[subject];
        if (!lessons || lessons.length === 0) return null;

        return (
          <section key={subject}>
            <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-6 rounded bg-primary" aria-hidden />
              {subject}
            </h2>
            <ul className="space-y-3">
              {lessons.map((lesson, i) => {
                const prevInSubject = i === 0 ? null : lessons[i - 1];
                const prevDone =
                  !prevInSubject ||
                  progress.completedLessonIds.includes(prevInSubject.id);
                const done = progress.completedLessonIds.includes(lesson.id);
                const locked = !prevDone;

                return (
                  <li key={lesson.id}>
                    {locked ? (
                      <div className="block rounded-xl border-2 p-4 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed">
                        <span className="font-semibold">{lesson.title}</span>
                        <span className="ml-2 text-sm">
                          🔒 この分野の前のレッスンを完了してください
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={`/lesson/${lesson.id}`}
                        className="block rounded-xl border-2 p-4 border-primary bg-white hover:bg-green-50 text-slate-800 transition"
                      >
                        <span className="font-semibold">{lesson.title}</span>
                        {done && (
                          <span className="ml-2 text-sm text-green-600">
                            ✓ 完了
                          </span>
                        )}
                      </Link>
                    )}
                    {i < lessons.length - 1 && (
                      <div
                        className="h-4 w-0.5 bg-slate-200 ml-6"
                        aria-hidden
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
