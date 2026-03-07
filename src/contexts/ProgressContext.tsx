"use client";

import React from "react";
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
  applyAnswerToProgress,
  getSaveErrorMessage,
  xpToLevel,
  xpToNextLevel,
} from "@/lib/progress";
import { getDueReviewQuestionIdsThatExist } from "@/services/lessonService";

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

/** Provider 外で useProgressContext が呼ばれたときの安全なデフォルト（本番でクラッシュさせない） */
function getDefaultContextValue(): ProgressContextValue {
  const progress = getDefaultProgress();
  const level = 1;
  const xpInLevel = 0;
  const xpNeededForNext = 100;
  const noop = () => {};
  return {
    progress,
    level,
    xpInLevel,
    xpNeededForNext,
    recordAnswer: noop,
    completeLesson: noop,
    getDueReviewQuestionIds: () => [],
    ensureDailyReset: noop,
    loadError: null,
    saveError: null,
    clearLoadError: noop,
    clearSaveError: noop,
  };
}

const defaultContextValue = getDefaultContextValue();

/** Provider から渡された value かどうか判定するためのマーカー（開発時の警告用） */
const PROVIDER_MARKER = Symbol.for("ProgressProvider");

const ProgressContext = createContext<ProgressContextValue>(defaultContextValue);

let hasWarnedOutsideProvider = false;

/**
 * 進捗コンテキストを取得する。
 * ProgressProvider の外で呼ばれた場合はデフォルト値を返す（本番でクラッシュしない）。
 * 通常は layout の AppProviders 内で提供される。
 */
export function useProgressContext(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (process.env.NODE_ENV === "development") {
    const fromProvider = (ctx as ProgressContextValue & { [PROVIDER_MARKER]?: true })[
      PROVIDER_MARKER
    ];
    if (!fromProvider && !hasWarnedOutsideProvider) {
      hasWarnedOutsideProvider = true;
      console.warn(
        "[useProgressContext] ProgressProvider の外で呼ばれています。layout の AppProviders の子孫で使ってください。"
      );
    }
  }
  return ctx ?? defaultContextValue;
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
        const next = applyAnswerToProgress(p, questionId, correct, combo, today);
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

  const value: ProgressContextValue & { [PROVIDER_MARKER]: true } = {
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
    [PROVIDER_MARKER]: true,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
