"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";
import { getLessonsGroupedBySubject, SUBJECT_DISPLAY_ORDER } from "@/services/lessonService";
import { SUBJECT_THEMES, DEFAULT_THEME } from "@/components/RoadmapPrimitives";
import { NavigatorsImage } from "@/components/CharacterAvatar";
import { CharacterLine } from "@/components/CharacterLine";
import { getLastSubject, getLastLessonResult } from "@/lib/progress";
import { getDueReviewQuestionIdsThatExist } from "@/services/lessonService";
import type { LastLessonResult } from "@/lib/progress";
import type { Lesson } from "@/types";
import type { UserProgress } from "@/lib/progress";

// ─── Recommendation logic ──────────────────────────────────────────────────────
type Recommendation =
  | { kind: "next" | "retry"; lesson: Lesson; subject: string; lastAccuracy?: number }
  | { kind: "mastered"; subject: string; nextSubject: string | null }
  | { kind: "allDone" };

function firstUncompleted(
  progress: UserProgress,
  grouped: Record<string, Lesson[]>
): Recommendation {
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lessons = grouped[subject] ?? [];
    for (let i = 0; i < lessons.length; i++) {
      if (progress.completedLessonIds.includes(lessons[i].id)) continue;
      const allPrevDone =
        i === 0 || lessons.slice(0, i).every((l) => progress.completedLessonIds.includes(l.id));
      if (allPrevDone) return { kind: "next", lesson: lessons[i], subject };
    }
  }
  return { kind: "allDone" };
}

function findRecommendedLesson(
  progress: UserProgress,
  lastResult: LastLessonResult | null
): Recommendation {
  const grouped = getLessonsGroupedBySubject();

  if (!lastResult) return firstUncompleted(progress, grouped);

  const { lessonId, accuracy } = lastResult;

  // 前回レッスンの科目を特定
  let foundLesson: Lesson | null = null;
  let foundSubject: string | null = null;
  for (const subject of SUBJECT_DISPLAY_ORDER) {
    const lesson = (grouped[subject] ?? []).find((l) => l.id === lessonId);
    if (lesson) { foundLesson = lesson; foundSubject = subject; break; }
  }

  if (!foundLesson || !foundSubject) return firstUncompleted(progress, grouped);

  // 正答率 < 80% → 同じレッスンをリトライ
  // ただし既に完了済みならフォールバック（一般的な学習アプリの方式）
  if (accuracy < 0.8) {
    if (progress.completedLessonIds.includes(foundLesson.id)) {
      return firstUncompleted(progress, grouped);
    }
    return { kind: "retry", lesson: foundLesson, subject: foundSubject, lastAccuracy: accuracy };
  }

  // 正答率 >= 80% → 同じ科目の次のレッスンへ
  const subjectLessons = grouped[foundSubject] ?? [];
  const currentIdx = subjectLessons.findIndex((l) => l.id === lessonId);

  if (currentIdx === -1 || currentIdx >= subjectLessons.length - 1) {
    // 科目修得: 次の科目を探す
    const nextSubjectIdx = SUBJECT_DISPLAY_ORDER.findIndex((s) => s === foundSubject) + 1;
    const nextSubject = nextSubjectIdx < SUBJECT_DISPLAY_ORDER.length
      ? SUBJECT_DISPLAY_ORDER[nextSubjectIdx]
      : null;
    return { kind: "mastered", subject: foundSubject, nextSubject };
  }

  const nextLesson = subjectLessons[currentIdx + 1];
  // 推薦レッスンが既に完了済みならフォールバック
  if (progress.completedLessonIds.includes(nextLesson.id)) {
    return firstUncompleted(progress, grouped);
  }
  return { kind: "next", lesson: nextLesson, subject: foundSubject };
}

// ─── StatCard ──────────────────────────────────────────────────────────────────
type StatCardProps = {
  icon: string;
  title: string;
  value: string;
  sub: string;
  color: string;
  delay?: string;
};

function StatCard({ icon, title, value, sub, color, delay = "0ms" }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-4 relative overflow-hidden animate-fade-in-up"
      style={{
        background: `${color}18`,
        border: `1.5px solid ${color}40`,
        animationDelay: delay,
        animationFillMode: "both",
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-2xl select-none leading-none">{icon}</span>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: `${color}cc` }}>{title}</p>
        <p className="font-bold text-lg font-nunito leading-none" style={{ color }}>{value}</p>
        <p className="text-[10px] leading-snug text-pastel-ink/50">{sub}</p>
      </div>
    </div>
  );
}

// ─── TodayLessonCard ───────────────────────────────────────────────────────────
function TodayLessonCard({ progress }: { progress: UserProgress }) {
  const [lastResult, setLastResult] = useState<LastLessonResult | null>(null);

  useEffect(() => {
    setLastResult(getLastLessonResult());
  }, []);

  const rec = findRecommendedLesson(progress, lastResult);

  // 全レッスン完了
  if (rec.kind === "allDone") {
    return (
      <div
        className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, #81C784, #43A047)",
          boxShadow: "0 5px 0 #2E7D32, 0 8px 24px rgba(88,204,2,0.35)",
          animationDelay: "240ms",
          animationFillMode: "both",
        }}
      >
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" aria-hidden />
        <div className="relative text-center py-2">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-white font-bold text-base font-nunito">全レッスン完了！</p>
          <p className="text-white/70 text-sm mt-1">すべての科目を修了しました</p>
        </div>
      </div>
    );
  }

  // 科目修得
  if (rec.kind === "mastered") {
    // 最後の科目を修得 → 全科目修得カード
    if (!rec.nextSubject) {
      return (
        <div
          className="rounded-2xl p-5 relative overflow-hidden animate-fade-in-up"
          style={{
            background: "linear-gradient(135deg, #CE93D8, #7B1FA2)",
            boxShadow: "0 5px 0 #4A148C, 0 8px 24px rgba(123,31,162,0.35)",
            animationDelay: "240ms",
            animationFillMode: "both",
          }}
        >
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" aria-hidden />
          <div className="relative text-center py-2">
            <p className="text-3xl mb-2">🌟</p>
            <p className="text-white font-bold text-base font-nunito">全科目を修得しました！</p>
            <p className="text-white/70 text-sm mt-1">すべての科目を完全修得</p>
          </div>
        </div>
      );
    }

    // 次の科目がある → ロードマップへ誘導
    return (
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "240ms", animationFillMode: "both" }}
      >
        <h2 className="text-xs font-bold text-pastel-ink/50 mb-3 font-mono uppercase tracking-widest">
          今日のレッスン
        </h2>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FFD54F, #FF8F00)",
            boxShadow: "0 5px 0 #E65100, 0 8px 24px rgba(255,143,0,0.35)",
          }}
        >
          <div className="p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" aria-hidden />
            <div className="relative text-center">
              <p className="text-3xl mb-2">🏆</p>
              <p className="text-white font-bold text-base font-nunito">{rec.subject} を修得しました！</p>
              <p className="text-white/70 text-sm mt-1">次の科目: {rec.nextSubject}</p>
            </div>
          </div>
          <Link
            href={`/subjects/${encodeURIComponent(rec.nextSubject)}`}
            className="block mx-4 mb-4 py-3.5 rounded-2xl text-center font-bold text-base font-nunito transition-all duration-150 active:scale-[0.97]"
            style={{
              background: "white",
              color: "#E65100",
              boxShadow: "0 3px 0 rgba(230,81,0,0.3)",
            }}
          >
            次の科目へ →
          </Link>
        </div>
      </div>
    );
  }

  const { lesson, subject } = rec;
  const isRetry        = rec.kind === "retry";
  const lastAccuracy   = rec.lastAccuracy;
  const theme          = SUBJECT_THEMES[subject] ?? DEFAULT_THEME;
  const questionCount  = lesson.questionIds.length;
  const xpEstimate     = questionCount * 10;

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: "240ms", animationFillMode: "both" }}
    >
      <h2 className="text-xs font-bold text-pastel-ink/50 mb-3 font-mono uppercase tracking-widest">
        今日のレッスン
      </h2>

      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.grad0}, ${theme.grad1})`,
          boxShadow: `0 5px 0 ${theme.border}, 0 8px 24px ${theme.main}44`,
        }}
      >
        {/* Top: subject + lesson info */}
        <div className="p-5 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" aria-hidden />
          <div className="absolute right-4 bottom-[-16px] w-14 h-14 rounded-full bg-white/10" aria-hidden />

          <div className="relative">
            {/* Subject label + retry badge */}
            <div className="flex items-center justify-between mb-3">
              <Link
                href={`/subjects/${encodeURIComponent(subject)}`}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 -mx-2 transition-all duration-150 active:scale-[0.95] bg-white/10 hover:bg-white/20"
              >
                <span className="text-lg select-none" aria-hidden>{theme.icon}</span>
                <span className="text-white text-xs font-bold tracking-wide">{subject}</span>
                <span className="text-white/60 text-[10px]">›</span>
              </Link>
              {isRetry && lastAccuracy !== undefined && (
                <span className="text-[10px] font-bold bg-white/20 text-white rounded-full px-2 py-0.5">
                  前回 {Math.round(lastAccuracy * 100)}%
                </span>
              )}
            </div>

            {/* Lesson title */}
            <p className="text-white font-bold text-lg font-nunito leading-tight mb-4">
              {lesson.title}
            </p>

            {/* Stats row */}
            <div className="flex gap-2">
              <div className="bg-white/25 rounded-xl px-3 py-1.5 text-center">
                <p className="text-white font-bold text-sm font-nunito">{questionCount}</p>
                <p className="text-white/70 text-[10px] font-bold">問題</p>
              </div>
              <div className="bg-white/25 rounded-xl px-3 py-1.5 text-center">
                <p className="text-white font-bold text-sm font-nunito">+{xpEstimate}</p>
                <p className="text-white/70 text-[10px] font-bold">XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Start button */}
        <Link
          href={`/lesson/${lesson.id}?from=/`}
          className="block mx-4 mb-4 py-3.5 rounded-2xl text-center font-bold text-base font-nunito transition-all duration-150 active:scale-[0.97]"
          style={{
            background: "white",
            color: theme.border,
            boxShadow: `0 3px 0 ${theme.border}44`,
          }}
        >
          {isRetry ? "もう一度挑戦 →" : "スタート →"}
        </Link>
      </div>
    </div>
  );
}

// ─── ReviewQueueCard ───────────────────────────────────────────────────────────
function ReviewQueueCard({ progress }: { progress: UserProgress }) {
  const dueCount = getDueReviewQuestionIdsThatExist(progress).length;

  if (dueCount === 0) return null;

  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: "260ms", animationFillMode: "both" }}
    >
      <Link
        href="/review"
        className="flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-150 active:scale-[0.97]"
        style={{
          background: "linear-gradient(135deg, #7E57C2, #512DA8)",
          boxShadow: "0 4px 0 #311B92, 0 6px 20px rgba(126,87,194,0.35)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none" aria-hidden>🧠</span>
          <div>
            <p className="text-white font-bold text-sm font-nunito">
              復習が {dueCount} 問あります
            </p>
            <p className="text-white/65 text-xs mt-0.5">間隔反復で記憶を定着させよう</p>
          </div>
        </div>
        <span className="text-white/80 text-xl font-bold" aria-hidden>›</span>
      </Link>
    </section>
  );
}

// ─── SubjectShortcuts ──────────────────────────────────────────────────────────
function SubjectShortcuts() {
  const [lastSubject, setLastSubjectState] = useState<string | null>(null);

  useEffect(() => {
    setLastSubjectState(getLastSubject());
  }, []);

  return (
    <section
      className="flex gap-3 animate-fade-in-up"
      style={{ animationDelay: "280ms", animationFillMode: "both" }}
    >
      {lastSubject && (
        <Link
          href={`/subjects/${encodeURIComponent(lastSubject)}`}
          className="flex-1 rounded-2xl py-3.5 px-4 text-center transition-all duration-150 active:scale-[0.97] active:translate-y-0.5"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "0 4px 0 rgba(88,204,2,0.35), 0 6px 16px rgba(88,204,2,0.15), var(--neu-shadow)",
            border: "1.5px solid rgba(88,204,2,0.25)",
          }}
        >
          <p className="text-sm font-bold font-nunito" style={{ color: "var(--pastel-primary)" }}>
            {lastSubject}ロードマップ
          </p>
        </Link>
      )}
      <Link
        href="/subjects"
        className="flex-1 rounded-2xl py-3.5 px-4 text-center transition-all duration-150 active:scale-[0.97] active:translate-y-0.5"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "0 4px 0 rgba(0,0,0,0.12), var(--neu-shadow)",
          border: "1.5px solid rgba(0,0,0,0.07)",
        }}
      >
        <p className="text-sm font-bold font-nunito text-pastel-ink">科目を変える</p>
      </Link>
    </section>
  );
}

// ─── HomeDashboard ─────────────────────────────────────────────────────────────
export function HomeDashboard() {
  const { progress, level, xpNeededForNext } = useProgress();

  return (
    <div className="space-y-6">
      {/* ── Character + greeting ─────────────────────────────────────── */}
      <section className="animate-fade-in-up" style={{ animationFillMode: "both" }}>
        <NavigatorsImage className="mb-4" />
        <CharacterLine characterId="skurun" lineKey="homeGreeting" size="sm" className="mb-4" />
      </section>

      {/* ── Stat cards ───────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xs font-bold text-pastel-ink/50 mb-3 font-mono uppercase tracking-widest">
          今日の学習
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon="🔥" title="ストリーク"
            value={`${progress.streakDays} 日`} sub="連続学習日数"
            color="#FB8C00" delay="60ms"
          />
          <StatCard
            icon="🎯" title="デイリーミッション"
            value={`${progress.dailyAnswered} / ${progress.dailyGoal} 問`} sub="今日の目標"
            color="#43A047" delay="120ms"
          />
          <StatCard
            icon="⚡" title="レベル・XP"
            value={`Lv.${level}  (${progress.totalXP} XP)`}
            sub={`あと ${xpNeededForNext} XP でレベルアップ`}
            color="#1E88E5" delay="180ms"
          />
        </div>
      </section>

      {/* ── Today's lesson ───────────────────────────────────────────── */}
      <TodayLessonCard progress={progress} />

      {/* ── Review queue ─────────────────────────────────────────────── */}
      <ReviewQueueCard progress={progress} />

      {/* ── Subject shortcuts ────────────────────────────────────────── */}
      <SubjectShortcuts />

      {/* ── Info note ────────────────────────────────────────────────── */}
      <section
        className="neu-inset rounded-2xl p-4 animate-fade-in-up"
        style={{ animationDelay: "300ms", animationFillMode: "both" }}
      >
        <p className="font-mono text-xs text-pastel-primary/70 mb-1">{"// INFO"}</p>
        <p className="text-sm text-pastel-ink/60">
          ストリーク・デイリーミッション・レベル/XP・ロードマップ・間隔反復の5つで継続しやすい学習をサポートします。
        </p>
      </section>
    </div>
  );
}
