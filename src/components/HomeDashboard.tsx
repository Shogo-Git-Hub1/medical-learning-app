"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useProgressContext } from "@/contexts/ProgressContext";
import {
  getLessonsGroupedBySubject,
  getDueReviewQuestionIdsThatExist,
  findRecommendedLesson,
  getQuestionsById,
  REVIEW_BATCH_SIZE,
} from "@/services/lessonService";
import { SUBJECT_THEMES, DEFAULT_THEME } from "@/data/subjectThemes";
import { getLastSubject, getLastLessonResult } from "@/lib/progress";
import type { UserProgress, LastLessonResult } from "@/lib/progress";
import type { Lesson } from "@/types";

// ─── StatCard ──────────────────────────────────────────────────────────────────
type StatCardProps = {
  icon: string;
  title: string;
  value: string;
  sub: string;
  color: string;
  delay?: string;
  progress?: number;
};

function StatCard({ icon, title, value, sub, color, delay = "0ms", progress }: StatCardProps) {
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
        {progress !== undefined && (
          <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: `${color}20` }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%`, background: color }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DailyGoalBanner ───────────────────────────────────────────────────────────
function DailyGoalBanner({ progress }: { progress: UserProgress }) {
  if (progress.dailyAnswered < progress.dailyGoal) return null;

  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: "220ms", animationFillMode: "both" }}
    >
      <div
        className="flex items-center justify-between rounded-2xl px-4 py-3.5"
        style={{
          background: "linear-gradient(135deg, #d7ffb8, #b8f5a0)",
          border: "1.5px solid #58cc02",
          boxShadow: "0 4px 0 #46a302",
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl select-none" aria-hidden>🎉</span>
          <div>
            <p className="text-sm font-bold font-nunito" style={{ color: "#2d7a00" }}>
              今日の目標を達成！
            </p>
            <p className="text-xs" style={{ color: "#46a302" }}>
              {progress.dailyAnswered} 問クリア
            </p>
          </div>
        </div>
        <Link
          href="/subjects"
          className="rounded-xl px-4 py-2 font-bold text-sm font-nunito text-white transition-all duration-150 active:translate-y-0.5 active:shadow-none"
          style={{
            background: "#58cc02",
            boxShadow: "0 3px 0 #46a302",
          }}
        >
          もっとやる
        </Link>
      </div>
    </section>
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
  const questionCount  = getQuestionsById(lesson.questionIds).length;
  const xpEstimate     = questionCount * 10;

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: "240ms", animationFillMode: "both" }}
    >
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
            {/* Subject label */}
            <div className="mb-3">
              <Link
                href={`/subjects/${encodeURIComponent(subject)}`}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 -mx-2 transition-all duration-150 active:scale-[0.95] bg-white/10 hover:bg-white/20"
              >
                <span className="text-lg select-none" aria-hidden>{theme.icon}</span>
                <span className="text-white text-xs font-bold tracking-wide">{subject}</span>
                <span className="text-white/60 text-[10px]">›</span>
              </Link>
            </div>

            {/* Lesson title */}
            <p className={`text-white font-bold text-lg font-nunito leading-tight ${isRetry && lastAccuracy !== undefined ? "mb-1.5" : "mb-4"}`}>
              {lesson.title}
            </p>

            {/* 再挑戦コンテキスト：前回スコアに応じた動的メッセージ */}
            {isRetry && lastAccuracy !== undefined && (
              <p className="text-white/75 text-xs mb-4 leading-relaxed">
                {lastAccuracy < 0.6
                  ? `前回 ${Math.round(lastAccuracy * 100)}% — 一緒に復習しよう`
                  : `前回 ${Math.round(lastAccuracy * 100)}% — もう少しで合格点！`}
              </p>
            )}

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
          className="block mx-4 mb-4 py-3.5 rounded-2xl text-center font-bold text-base font-nunito transition-all duration-150 active:scale-[0.97] active:translate-y-1"
          style={{
            background: "white",
            color: theme.border,
            boxShadow: `0 4px 0 ${theme.border}`,
          }}
        >
          {isRetry
            ? (lastAccuracy !== undefined && lastAccuracy >= 0.6 ? "合格点を目指す！" : "もう一度挑戦")
            : "スタート"}
        </Link>
      </div>
    </div>
  );
}

// ─── ReviewQueueCard ───────────────────────────────────────────────────────────
function ReviewQueueCard({ dueCount }: { dueCount: number }) {
  if (dueCount === 0) return null;

  const label = dueCount > REVIEW_BATCH_SIZE
    ? `まずは ${REVIEW_BATCH_SIZE} 問から始めよう`
    : "間隔反復で記憶を定着させよう";

  const inner = (
    <>
      <div className="flex items-center gap-3">
        <span className="text-2xl select-none" aria-hidden>🧠</span>
        <div>
          <p className="text-white font-bold text-sm font-nunito">
            復習が {dueCount} 問あります
          </p>
          <p className="text-white/65 text-xs mt-0.5">{label}</p>
        </div>
      </div>
      <span className="text-white/80 text-xl font-bold" aria-hidden>›</span>
    </>
  );

  return (
    <>
      {/* ── モバイル: BottomNav の上に固定フローティング ─────────── */}
      <div
        className="md:hidden fixed left-0 right-0 z-10 px-4"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}
      >
        <div className="max-w-2xl mx-auto">
          <Link
            href="/review/session"
            className="animate-float-bob flex items-center justify-between rounded-2xl px-5 py-3.5 transition-all duration-150 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #7E57C2, #512DA8)",
            }}
          >
            {inner}
          </Link>
        </div>
      </div>

      {/* ── デスクトップ: コンテンツエリア下部に固定フローティング ── */}
      <div className="hidden md:block md:fixed md:bottom-6 md:left-[240px] md:right-0 md:z-10 md:px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/review/session"
            className="animate-float-bob flex items-center justify-between rounded-2xl px-5 py-3.5 transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #7E57C2, #512DA8)",
            }}
          >
            {inner}
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── SubjectShortcuts ──────────────────────────────────────────────────────────
function SubjectShortcuts() {
  const [lastSubject, setLastSubjectState] = useState<string | null>(null);

  useEffect(() => {
    setLastSubjectState(getLastSubject());
  }, []);

  if (!lastSubject) return null;

  return (
    <section
      className="animate-fade-in-up"
      style={{ animationDelay: "280ms", animationFillMode: "both" }}
    >
      <Link
        href={`/subjects/${encodeURIComponent(lastSubject)}`}
        className="block w-full rounded-2xl py-3.5 px-4 text-center transition-all duration-150 active:scale-[0.97] active:translate-y-1"
        style={{
          background: "#edfde0",
          boxShadow: "0 4px 0 #46a302",
          border: "1.5px solid #58cc02",
        }}
      >
        <p className="text-sm font-bold font-nunito" style={{ color: "#46a302" }}>
          {lastSubject} を続ける
        </p>
      </Link>
    </section>
  );
}

// ─── HomeDashboard ─────────────────────────────────────────────────────────────
export function HomeDashboard() {
  const { progress, level, xpNeededForNext } = useProgressContext();
  const dueCount = getDueReviewQuestionIdsThatExist(progress).length;

  return (
    <div className="space-y-6">
      {/* ── モバイル専用ロゴヘッダー（スクロールに追従） ─────────────── */}
      <div className="md:hidden flex items-center gap-2 pb-1">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M13 2L4.5 13.5H11.5L10.5 22L19.5 10.5H12.5L13 2Z"
            fill="#58cc02"
            stroke="#46a302"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[#58cc02] font-bold text-xl font-nunito">MediSpark</span>
      </div>

      {/* ── Stat cards ───────────────────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon="🔥" title="ストリーク"
            value={`${progress.streakDays} 日`} sub="連続学習日数"
            color="#FB8C00" delay="60ms"
          />
          <StatCard
            icon={progress.dailyAnswered >= progress.dailyGoal ? "✅" : "🎯"}
            title="デイリーミッション"
            value={`${progress.dailyAnswered} / ${progress.dailyGoal} 問`}
            sub={progress.dailyAnswered >= progress.dailyGoal ? "今日の目標達成！" : `あと ${progress.dailyGoal - progress.dailyAnswered} 問`}
            color={progress.dailyAnswered >= progress.dailyGoal ? "#FFC800" : "#43A047"}
            delay="120ms"
            progress={progress.dailyGoal > 0 ? Math.min(1, progress.dailyAnswered / progress.dailyGoal) : 0}
          />
          <Link href="/profile" className="block">
            <StatCard
              icon="⚡" title="レベル・XP"
              value={`Lv.${level}`}
              sub={`${progress.totalXP} XP / あと ${xpNeededForNext}`}
              color="#1E88E5" delay="180ms"
            />
          </Link>
        </div>
      </section>

      {/* ── Daily goal achievement banner ────────────────────────────── */}
      <DailyGoalBanner progress={progress} />

      {/* ── Today's lesson ───────────────────────────────────────────── */}
      <TodayLessonCard progress={progress} />

      {/* ── Review queue ─────────────────────────────────────────────── */}
      <ReviewQueueCard dueCount={dueCount} />

      {/* ── Subject shortcuts ────────────────────────────────────────── */}
      <SubjectShortcuts />

      {/* フローティングカード分のスペーサー（固定カードがコンテンツを隠さないよう確保） */}
      {dueCount > 0 && <div className="h-20" aria-hidden />}

    </div>
  );
}
