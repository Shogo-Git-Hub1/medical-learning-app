"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { PushButton } from "@/components/ui/PushButton";
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
      {/* ─── 科目フィルター ────────────────────────────────── */}
      <div
        className="neu-card rounded-2xl p-4 relative overflow-hidden animate-fade-in-up"
        style={{ animationFillMode: "both" }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-60"
          style={{ background: "linear-gradient(90deg, transparent, #58CC02, transparent)" }}
          aria-hidden
        />
        <p className="text-[10px] font-mono text-pastel-ink/40 uppercase tracking-widest mb-3">
          // 科目
        </p>
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
      </div>

      {/* ─── 試験フィルター ────────────────────────────────── */}
      {examTags.length > 0 && (
        <div
          className="neu-card rounded-2xl p-4 relative overflow-hidden animate-fade-in-up"
          style={{ animationDelay: "60ms", animationFillMode: "both" }}
        >
          <div
            className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-60"
            style={{ background: "linear-gradient(90deg, transparent, #BBF2FF, transparent)" }}
            aria-hidden
          />
          <p className="text-[10px] font-mono text-pastel-ink/40 uppercase tracking-widest mb-3">
            // 試験タグ
          </p>
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
        </div>
      )}

      {/* ─── レッスン一覧 ──────────────────────────────────── */}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms", animationFillMode: "both" }}
      >
        <p className="text-[10px] font-mono text-pastel-ink/40 uppercase tracking-widest mb-3">
          // レッスン{" "}
          <span className="text-pastel-primary">({lessons.length}件)</span>
        </p>

        {lessons.length === 0 ? (
          <div className="neu-inset rounded-2xl p-8 text-center">
            <p className="font-mono text-sm text-pastel-ink/45">// 該当するレッスンがありません</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {lessons.map((lesson, i) => {
              const unlocked = isUnlocked(lesson.id, lesson.subject);
              const done = progress.completedLessonIds.includes(lesson.id);
              const meta = [lesson.subject, lesson.examTag].filter(Boolean).join(" · ");

              if (!unlocked) {
                return (
                  <li
                    key={lesson.id}
                    className="animate-card-enter"
                    style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}
                  >
                    <div className="neu-inset rounded-xl p-4 flex items-center justify-between opacity-50">
                      <div className="min-w-0">
                        <span className="font-semibold text-sm text-pastel-ink block truncate">
                          {lesson.title}
                        </span>
                        {meta && (
                          <span className="text-[10px] font-mono text-pastel-ink/40 mt-0.5 block">
                            {meta}
                          </span>
                        )}
                      </div>
                      <span className="text-sm flex-shrink-0 ml-3">🔒</span>
                    </div>
                  </li>
                );
              }

              return (
                <li
                  key={lesson.id}
                  className="animate-card-enter"
                  style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}
                >
                  <Link
                    href={`/lesson/${lesson.id}?from=/browse`}
                    className="neu-card-sm rounded-xl p-4 flex items-center justify-between transition-all duration-200 active:scale-[0.98] relative overflow-hidden group block"
                  >
                    {/* ホバー時グローライン */}
                    <div
                      className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full opacity-0 group-hover:opacity-70 transition-opacity"
                      style={{ background: "linear-gradient(90deg, transparent, #58cc02, transparent)" }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-sm text-pastel-ink block truncate">
                        {lesson.title}
                      </span>
                      {meta && (
                        <span className="text-[10px] font-mono text-pastel-ink/40 mt-0.5 block">
                          {meta}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                      {done && (
                        <span
                          className="text-pastel-primary font-bold text-base"
                          style={{ textShadow: "0 0 8px rgba(88,204,2,0.55)" }}
                        >
                          ✓
                        </span>
                      )}
                      <span className="text-pastel-primary/50 text-xl group-hover:text-pastel-primary transition-colors">
                        ›
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
    <PushButton
      variant="chip"
      chipActive={active}
      onClick={onClick}
    >
      {label}
    </PushButton>
  );
}
