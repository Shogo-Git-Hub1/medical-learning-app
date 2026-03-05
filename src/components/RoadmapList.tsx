"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getAllLessons } from "@/data/db";

export function RoadmapList() {
  const { progress } = useProgress();
  const ordered = getAllLessons();
  const withStatus = ordered.map((lesson, i) => {
    const prevDone = i === 0 || progress.completedLessonIds.includes(ordered[i - 1].id);
    return {
      ...lesson,
      done: progress.completedLessonIds.includes(lesson.id),
      locked: !prevDone,
    };
  });

  return (
    <ul className="space-y-3">
      {withStatus.map((lesson, i) => (
        <li key={lesson.id}>
          {lesson.locked ? (
            <div
              className="block rounded-xl border-2 p-4 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
            >
              <span className="font-semibold">{lesson.title}</span>
              {lesson.subject && (
                <span className="ml-2 text-sm text-slate-400">{lesson.subject}</span>
              )}
              <span className="ml-2 text-sm">🔒 前のレッスンを完了してください</span>
            </div>
          ) : (
            <Link
              href={`/lesson/${lesson.id}`}
              className="block rounded-xl border-2 p-4 border-primary bg-white hover:bg-green-50 text-slate-800 transition"
            >
              <span className="font-semibold">{lesson.title}</span>
              {lesson.subject && (
                <span className="ml-2 text-sm text-slate-500">{lesson.subject}</span>
              )}
              {lesson.done && (
                <span className="ml-2 text-sm text-green-600">✓ 完了</span>
              )}
            </Link>
          )}
          {i < withStatus.length - 1 && (
            <div className="h-4 w-0.5 bg-slate-200 ml-6" aria-hidden />
          )}
        </li>
      ))}
    </ul>
  );
}
