/**
 * 問題ごとの復習スケジュール（間隔反復）
 */
export type QuestionReview = {
  nextReview: string; // YYYY-MM-DD
  interval: number;  // 日数
};

/**
 * localStorage に保存するユーザー進捗
 */
export type UserProgress = {
  lastStudyDate: string; // YYYY-MM-DD
  streakDays: number;
  dailyGoal: number;
  dailyAnswered: number;
  dailyResetDate: string; // 日付が変わったら dailyAnswered を 0 に
  totalXP: number;
  completedLessonIds: string[];
  questionReviews: Record<string, QuestionReview>;
};

const STORAGE_KEY = "medical-learning-progress";

const DEFAULT: UserProgress = {
  lastStudyDate: "",
  streakDays: 0,
  dailyGoal: 5,
  dailyAnswered: 0,
  dailyResetDate: "",
  totalXP: 0,
  completedLessonIds: [],
  questionReviews: {},
};

export function getDefaultProgress(): UserProgress {
  return { ...DEFAULT };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<UserProgress>) : {};
    const progress: UserProgress = { ...DEFAULT, ...parsed };
    const today = getToday();
    if (progress.dailyResetDate !== today) {
      progress.dailyAnswered = 0;
      progress.dailyResetDate = today;
      saveProgress(progress);
    }
    return progress;
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

/** 今日の日付 YYYY-MM-DD（ローカル） */
export function getToday(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/** 1問正解で得られる XP */
export const XP_PER_CORRECT = 10;

/** レベル N に必要な累計 XP: 100 * (N-1) から 100*N - 1 までがレベル N */
export function xpToLevel(totalXP: number): number {
  if (totalXP <= 0) return 1;
  return Math.floor(totalXP / 100) + 1;
}

/** 現在のレベルで次のレベルまでに必要な XP（現在レベル内の残り） */
export function xpToNextLevel(totalXP: number): { current: number; needed: number } {
  const level = xpToLevel(totalXP);
  const xpForCurrentLevel = (level - 1) * 100;
  const current = totalXP - xpForCurrentLevel;
  const needed = 100 - current;
  return { current, needed };
}
