"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type UserProgress,
  loadProgress,
  saveProgress,
  getToday,
  getDefaultProgress,
  getXPForCorrect,
  xpToLevel,
  xpToNextLevel,
} from "@/lib/progress";

const DEFAULT_INTERVAL_DAYS = 1;
const MIN_INTERVAL = 1;
const MAX_INTERVAL = 21;

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const persist = useCallback((next: UserProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  /** 日付が変わっていたらデイリーをリセット */
  const ensureDailyReset = useCallback(() => {
    const today = getToday();
    setProgress((p) => {
      if (p.dailyResetDate === today) return p;
      const next = { ...p, dailyAnswered: 0, dailyResetDate: today };
      saveProgress(next);
      return next;
    });
  }, []);

  /** 1問解答したあと: XP（コンボボーナス込み）・デイリー・ストリーク・復習スケジュールを更新 */
  const recordAnswer = useCallback(
    (questionId: string, correct: boolean, combo: number = 1) => {
      ensureDailyReset();
      const today = getToday();
      setProgress((p) => {
        const prevReview = p.questionReviews[questionId];
        const prevInterval = prevReview?.interval ?? 0;
        let nextInterval: number;
        let nextReview: string;
        if (correct) {
          nextInterval = prevInterval <= 0 ? MIN_INTERVAL : Math.min(prevInterval * 2, MAX_INTERVAL);
          const d = new Date(today);
          d.setDate(d.getDate() + nextInterval);
          nextReview = d.toISOString().slice(0, 10);
        } else {
          nextInterval = MIN_INTERVAL;
          const d = new Date(today);
          d.setDate(d.getDate() + 1);
          nextReview = d.toISOString().slice(0, 10);
        }
        const last = p.lastStudyDate ? new Date(p.lastStudyDate) : null;
        const lastDay = last ? last.toISOString().slice(0, 10) : "";
        let streak = p.streakDays;
        if (today !== lastDay) {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().slice(0, 10);
          streak = lastDay === yesterdayStr ? p.streakDays + 1 : 1;
        }
        const xpGain = correct ? getXPForCorrect(combo) : 0;
        const next: UserProgress = {
          ...p,
          lastStudyDate: today,
          streakDays: streak,
          dailyAnswered: p.dailyResetDate === today ? p.dailyAnswered + 1 : 1,
          dailyResetDate: p.dailyResetDate || today,
          totalXP: p.totalXP + xpGain,
          questionReviews: {
            ...p.questionReviews,
            [questionId]: { nextReview, interval: nextInterval },
          },
        };
        saveProgress(next);
        return next;
      });
    },
    [ensureDailyReset]
  );

  /** レッスン完了時: 完了リストに追加 */
  const completeLesson = useCallback((lessonId: string) => {
    setProgress((p) => {
      if (p.completedLessonIds.includes(lessonId)) return p;
      const next: UserProgress = {
        ...p,
        completedLessonIds: [...p.completedLessonIds, lessonId].sort(),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  /** 今日復習すべき問題ID一覧 */
  const getDueReviewQuestionIds = useCallback((): string[] => {
    const p = loadProgress();
    const today = getToday();
    return Object.entries(p.questionReviews)
      .filter(([, r]) => r.nextReview <= today)
      .map(([id]) => id);
  }, []);

  const level = xpToLevel(progress.totalXP);
  const { current: xpInLevel, needed: xpNeededForNext } = xpToNextLevel(progress.totalXP);

  return {
    progress,
    level,
    xpInLevel,
    xpNeededForNext,
    recordAnswer,
    completeLesson,
    getDueReviewQuestionIds,
    ensureDailyReset,
  };
}
