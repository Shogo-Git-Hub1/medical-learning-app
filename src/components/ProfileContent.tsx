"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { getLessonsGroupedBySubject, SUBJECT_DISPLAY_ORDER } from "@/services/lessonService";
import { SUBJECT_THEMES, DEFAULT_THEME } from "@/data/subjectThemes";

export function ProfileContent() {
  const { progress, level, xpInLevel, xpNeededForNext } = useProgress();
  const grouped = getLessonsGroupedBySubject();

  const totalLessons = SUBJECT_DISPLAY_ORDER.reduce(
    (acc, s) => acc + (grouped[s]?.length ?? 0),
    0
  );
  const completedCount = progress.completedLessonIds.length;
  const xpPct = Math.round((xpInLevel / (xpInLevel + xpNeededForNext)) * 100);

  return (
    <div className="space-y-5">
      {/* ── レベル・XP カード ──────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, #58CC02, #46A302)",
          boxShadow: "0 6px 0 #2E7D32, 0 10px 28px rgba(88,204,2,0.35)",
          animationFillMode: "both",
        }}
      >
        <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10" aria-hidden />
        <div className="absolute right-6 bottom-[-24px] w-20 h-20 rounded-full bg-white/10" aria-hidden />

        <div className="relative">
          <p className="text-white/75 text-[11px] font-bold tracking-widest uppercase font-mono mb-1">
            現在のレベル
          </p>
          <p className="text-white font-bold text-4xl font-nunito leading-none mb-4">
            Lv. {level}
          </p>

          {/* XP バー */}
          <div className="h-3 rounded-full bg-white/30 overflow-hidden mb-1.5">
            <div
              className="h-full rounded-full bg-white transition-all duration-700 ease-out"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-white/80 text-xs font-bold">{xpInLevel} XP</p>
            <p className="text-white/80 text-xs font-bold">
              次のレベルまで {xpNeededForNext} XP
            </p>
          </div>
        </div>
      </div>

      {/* ── 統計 3 枚 ─────────────────────────────────────────── */}
      <div
        className="grid grid-cols-3 gap-3 animate-fade-in-up"
        style={{ animationDelay: "60ms", animationFillMode: "both" }}
      >
        <StatCard
          icon="🔥"
          label="ストリーク"
          value={`${progress.streakDays}`}
          unit="日"
          color="#FB8C00"
        />
        <StatCard
          icon="📚"
          label="完了レッスン"
          value={`${completedCount}`}
          unit={`/ ${totalLessons}`}
          color="#1E88E5"
        />
        <StatCard
          icon="⚡"
          label="総獲得 XP"
          value={`${progress.totalXP}`}
          unit="XP"
          color="#8E24AA"
        />
      </div>

      {/* ── 科目別進捗 ────────────────────────────────────────── */}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "120ms", animationFillMode: "both" }}
      >
        <p className="text-[10px] font-mono text-pastel-ink/40 uppercase tracking-widest mb-3">
          科目別進捗
        </p>
        <div className="neu-card rounded-2xl p-4 space-y-3">
          {SUBJECT_DISPLAY_ORDER.map((subject) => {
            const lessons = grouped[subject] ?? [];
            if (lessons.length === 0) return null;
            const done = lessons.filter((l) =>
              progress.completedLessonIds.includes(l.id)
            ).length;
            const pct = Math.round((done / lessons.length) * 100);
            const theme = SUBJECT_THEMES[subject] ?? DEFAULT_THEME;
            const allDone = done === lessons.length;

            return (
              <Link
                key={subject}
                href={`/subjects/${encodeURIComponent(subject)}`}
                className="flex items-center gap-3 group"
              >
                {/* アイコン */}
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base select-none flex-shrink-0"
                  style={{ background: `${theme.main}22` }}
                  aria-hidden
                >
                  {theme.icon}
                </span>

                {/* ラベル + バー */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p
                      className="text-xs font-bold font-nunito truncate group-hover:underline"
                      style={{ color: theme.border }}
                    >
                      {subject}
                    </p>
                    <p className="text-[10px] font-mono text-pastel-ink/40 flex-shrink-0 ml-2">
                      {done}/{lessons.length}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-pastel-ink/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${pct}%`,
                        background: allDone
                          ? `linear-gradient(90deg, ${theme.grad0}, ${theme.grad1})`
                          : theme.main,
                        opacity: allDone ? 1 : 0.8,
                      }}
                    />
                  </div>
                </div>

                {allDone ? (
                  <span
                    className="text-sm flex-shrink-0"
                    style={{ color: theme.main }}
                    aria-label="完了"
                  >
                    ✓
                  </span>
                ) : (
                  <span className="text-pastel-ink/30 text-base flex-shrink-0" aria-hidden>›</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── お問い合わせリンク ────────────────────────────────── */}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "180ms", animationFillMode: "both" }}
      >
        <Link
          href="/contact"
          className="flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-150 active:scale-[0.97]"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "0 4px 0 rgba(0,0,0,0.10), var(--neu-shadow-sm)",
            border: "1.5px solid rgba(0,0,0,0.07)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl select-none" aria-hidden>✉️</span>
            <span className="text-sm font-bold font-nunito text-pastel-ink">お問い合わせ</span>
          </div>
          <span className="text-pastel-ink/30 text-xl" aria-hidden>›</span>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  unit,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div
      className="rounded-2xl p-3 relative overflow-hidden"
      style={{
        background: `${color}18`,
        border: `1.5px solid ${color}40`,
      }}
    >
      <span className="text-xl leading-none block mb-1 select-none">{icon}</span>
      <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: `${color}cc` }}>
        {label}
      </p>
      <p className="font-bold text-lg font-nunito leading-none mt-0.5" style={{ color }}>
        {value}
        <span className="text-[11px] font-bold ml-0.5" style={{ color: `${color}99` }}>
          {unit}
        </span>
      </p>
    </div>
  );
}
