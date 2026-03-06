"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import {
  getLessonsFiltered,
  getLessonsGroupedBySubject,
  getSubjectsInUse,
  getExamTagsInUse,
} from "@/services/lessonService";

export function BrowseContent() {
  const { progress } = useProgress();
  const [subject, setSubject] = useState<string | null>(null);
  const [examTag, setExamTag] = useState<string | null>(null);

  const subjects = useMemo(() => getSubjectsInUse(), []);
  const examTags = useMemo(() => getExamTagsInUse(), []);
  const lessons = useMemo(
    () => getLessonsFiltered(subject, examTag),
    [subject, examTag]
  );

  const groupedBySubject = useMemo(() => getLessonsGroupedBySubject(), []);
  /** 同一分野内で、前のレッスンが完了していればアンロック */
  const isUnlocked = (lessonId: string, lessonSubject?: string) => {
    const sub = lessonSubject ?? lessons.find((l) => l.id === lessonId)?.subject;
    if (!sub || !groupedBySubject[sub]) return true;
    const list = groupedBySubject[sub];
    const idx = list.findIndex((l) => l.id === lessonId);
    if (idx <= 0) return true;
    return progress.completedLessonIds.includes(list[idx - 1].id);
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">科目</h2>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="すべて"
            active={subject === null}
            onClick={() => setSubject(null)}
          />
          {subjects.map((s) => (
            <FilterChip
              key={s}
              label={s}
              active={subject === s}
              onClick={() => setSubject(s)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">試験</h2>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="すべて"
            active={examTag === null}
            onClick={() => setExamTag(null)}
          />
          {examTags.map((tag) => (
            <FilterChip
              key={tag}
              label={tag}
              active={examTag === tag}
              onClick={() => setExamTag(tag)}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">
          レッスン（{lessons.length}件）
        </h2>
        {lessons.length === 0 ? (
          <p className="text-slate-500 py-4">該当するレッスンがありません。</p>
        ) : (
          <ul className="space-y-3">
            {lessons.map((lesson) => {
              const unlocked = isUnlocked(lesson.id, lesson.subject);
              const done = progress.completedLessonIds.includes(lesson.id);

              if (!unlocked) {
                return (
                  <li key={lesson.id}>
                    <div className="block rounded-xl border-2 p-4 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed">
                      <span className="font-semibold">{lesson.title}</span>
                      {lesson.subject && (
                        <span className="ml-2 text-sm text-slate-400">{lesson.subject}</span>
                      )}
                      <span className="ml-2 text-sm">🔒 この分野の前のレッスンを完了してください</span>
                    </div>
                  </li>
                );
              }

              return (
                <li key={lesson.id}>
                  <Link
                    href={`/lesson/${lesson.id}`}
                    className="block rounded-xl border-2 p-4 border-primary bg-white hover:bg-green-50 text-slate-800 transition"
                  >
                    <span className="font-semibold">{lesson.title}</span>
                    <span className="ml-2 text-sm text-slate-500">
                      {[lesson.subject, lesson.examTag].filter(Boolean).join(" · ")}
                    </span>
                    {done && (
                      <span className="ml-2 text-sm text-green-600">✓ 完了</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-primary text-white"
          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
      }`}
    >
      {label}
    </button>
  );
}
