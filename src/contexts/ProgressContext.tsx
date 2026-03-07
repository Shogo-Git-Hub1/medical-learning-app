"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserProgress } from "@/lib/progress";
import {
  loadProgress,
  saveProgress,
  getToday,
  getDefaultProgress,
  getXPForCorrect,
  getSaveErrorMessage,
  xpToLevel,
  xpToNextLevel,
} from "@/lib/progress";
import { getDueReviewQuestionIdsThatExist } from "@/services/lessonService";

const MIN_INTERVAL = 1;
const MAX_INTERVAL = 21;

export type ProgressContextValue = {
  progress: UserProgress;
  level: number;
  xpInLevel: number;
  xpNeededForNext: number;
  recordAnswer: (questionId: string, correct: boolean, combo?: number) => void;
  completeLesson: (lessonId: string) => void;
  getDueReviewQuestionIds: () => string[];
  ensureDailyReset: () => void;
  loadError: string | null;
  saveError: string | null;
  clearLoadError: () => void;
  clearSaveError: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgressContext(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const clearLoadError = useCallback(() => setLoadError(null), []);
  const clearSaveError = useCallback(() => setSaveError(null), []);

  useEffect(() => {
    const result = loadProgress();
    setProgress(result.progress);
    setLoadError(result.loadError);
  }, []);

  const ensureDailyReset = useCallback(() => {
    const today = getToday();
    setProgress((p) => {
      if (p.dailyResetDate === today) return p;
      const next: UserProgress = { ...p, dailyAnswered: 0, dailyResetDate: today };
      saveProgress(next);
      return next;
    });
  }, []);

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
        const saved = saveProgress(next);
        if (!saved) setSaveError(getSaveErrorMessage());
        return next;
      });
    },
    [ensureDailyReset]
  );

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((p) => {
      if (p.completedLessonIds.includes(lessonId)) return p;
      const next: UserProgress = {
        ...p,
        completedLessonIds: [...p.completedLessonIds, lessonId].sort(),
      };
      const saved = saveProgress(next);
      if (!saved) setSaveError(getSaveErrorMessage());
      return next;
    });
  }, []);

  const getDueReviewQuestionIds = useCallback((): string[] => {
    return getDueReviewQuestionIdsThatExist(progress);
  }, [progress]);

  const level = xpToLevel(progress.totalXP);
  const { current: xpInLevel, needed: xpNeededForNext } = xpToNextLevel(progress.totalXP);

  const value: ProgressContextValue = {
    progress,
    level,
    xpInLevel,
    xpNeededForNext,
    recordAnswer,
    completeLesson,
    getDueReviewQuestionIds,
    ensureDailyReset,
    loadError,
    saveError,
    clearLoadError,
    clearSaveError,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
