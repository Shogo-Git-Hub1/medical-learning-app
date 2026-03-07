/**
 * 問題ごとの復習スケジュール（間隔反復）
 */
export type QuestionReview = {
  nextReview: string; // YYYY-MM-DD
  interval: number;  // 日数
};

/** 進捗スキーマのバージョン。フィールド追加・変更時に上げ、migrate で古いデータを変換する */
export const PROGRESS_SCHEMA_VERSION = 1;

/**
 * localStorage に保存するユーザー進捗
 */
export type UserProgress = {
  version: number;
  lastStudyDate: string; // YYYY-MM-DD
  streakDays: number;
  dailyGoal: number;
  dailyAnswered: number;
  dailyResetDate: string;
  totalXP: number;
  completedLessonIds: string[];
  questionReviews: Record<string, QuestionReview>;
};

const STORAGE_KEY = "medical-learning-progress";

const DEFAULT: UserProgress = {
  version: PROGRESS_SCHEMA_VERSION,
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

/** 古い保存データを現在のスキーマに変換する（単体テスト用に export） */
export function migrateProgress(parsed: Record<string, unknown>): UserProgress {
  const version = typeof parsed.version === "number" ? parsed.version : 0;
  const base = { ...DEFAULT };

  if (version >= 1) {
    return {
      ...base,
      version: PROGRESS_SCHEMA_VERSION,
      lastStudyDate: typeof parsed.lastStudyDate === "string" ? parsed.lastStudyDate : base.lastStudyDate,
      streakDays: typeof parsed.streakDays === "number" ? parsed.streakDays : base.streakDays,
      dailyGoal: typeof parsed.dailyGoal === "number" ? parsed.dailyGoal : base.dailyGoal,
      dailyAnswered: typeof parsed.dailyAnswered === "number" ? parsed.dailyAnswered : base.dailyAnswered,
      dailyResetDate: typeof parsed.dailyResetDate === "string" ? parsed.dailyResetDate : base.dailyResetDate,
      totalXP: typeof parsed.totalXP === "number" ? parsed.totalXP : base.totalXP,
      completedLessonIds: Array.isArray(parsed.completedLessonIds) && parsed.completedLessonIds.every((id): id is string => typeof id === "string")
        ? parsed.completedLessonIds
        : base.completedLessonIds,
      questionReviews: typeof parsed.questionReviews === "object" && parsed.questionReviews !== null && !Array.isArray(parsed.questionReviews)
        ? (parsed.questionReviews as Record<string, QuestionReview>)
        : base.questionReviews,
    };
  }

  // version 0: 旧形式（version フィールドなし）
  return {
    ...base,
    version: PROGRESS_SCHEMA_VERSION,
    lastStudyDate: typeof parsed.lastStudyDate === "string" ? parsed.lastStudyDate : base.lastStudyDate,
    streakDays: typeof parsed.streakDays === "number" ? parsed.streakDays : base.streakDays,
    dailyGoal: typeof parsed.dailyGoal === "number" ? parsed.dailyGoal : base.dailyGoal,
    dailyAnswered: typeof parsed.dailyAnswered === "number" ? parsed.dailyAnswered : base.dailyAnswered,
    dailyResetDate: typeof parsed.dailyResetDate === "string" ? parsed.dailyResetDate : base.dailyResetDate,
    totalXP: typeof parsed.totalXP === "number" ? parsed.totalXP : base.totalXP,
    completedLessonIds: Array.isArray(parsed.completedLessonIds) && parsed.completedLessonIds.every((id): id is string => typeof id === "string")
      ? parsed.completedLessonIds
      : base.completedLessonIds,
    questionReviews: typeof parsed.questionReviews === "object" && parsed.questionReviews !== null && !Array.isArray(parsed.questionReviews)
      ? (parsed.questionReviews as Record<string, QuestionReview>)
      : base.questionReviews,
  };
}

export type LoadProgressResult =
  | { progress: UserProgress; loadError: null }
  | { progress: UserProgress; loadError: string };

/**
 * localStorage から進捗を読み込む。
 * パース失敗時は loadError にメッセージを入れ、progress はデフォルトを返す。
 */
export function loadProgress(): LoadProgressResult {
  if (typeof window === "undefined") {
    return { progress: getDefaultProgress(), loadError: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { progress: getDefaultProgress(), loadError: null };
    }
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const progress = migrateProgress(parsed);
    const today = getToday();
    if (progress.dailyResetDate !== today) {
      progress.dailyAnswered = 0;
      progress.dailyResetDate = today;
      saveProgress(progress);
    }
    return { progress, loadError: null };
  } catch (e) {
    const message = e instanceof Error ? e.message : "不明なエラー";
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[progress] 進捗の読み込みに失敗しました。最初からになります。", message);
    }
    return {
      progress: getDefaultProgress(),
      loadError: "進捗の読み込みに失敗しました。最初からになります。",
    };
  }
}

/**
 * 進捗を localStorage に保存する。
 * @returns 保存に成功した場合 true、クォータ超過などで失敗した場合 false
 */
export function saveProgress(progress: UserProgress): boolean {
  if (typeof window === "undefined") return false;
  const toSave: UserProgress = { ...progress, version: PROGRESS_SCHEMA_VERSION };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    return true;
  } catch (e) {
    const isQuota = e instanceof DOMException && (e.name === "QuotaExceededError" || e.code === 22);
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[progress] 進捗の保存に失敗しました。", isQuota ? "ストレージの容量が不足しています。" : e);
    }
    return false;
  }
}

/** 保存失敗時にユーザーへ表示するメッセージを取得する */
export function getSaveErrorMessage(): string {
  return "進捗を保存できませんでした。ストレージの空き容量を増やしてから再度お試しください。";
}

export type LastLessonResult = { lessonId: string; accuracy: number };

const LAST_LESSON_RESULT_KEY = "medical-learning-last-lesson-result";

export function getLastLessonResult(): LastLessonResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_LESSON_RESULT_KEY);
    return raw ? (JSON.parse(raw) as LastLessonResult) : null;
  } catch {
    return null;
  }
}

export function setLastLessonResult(lessonId: string, accuracy: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_LESSON_RESULT_KEY, JSON.stringify({ lessonId, accuracy }));
  } catch {
    // 補助データのため失敗は無視
  }
}

const LAST_SUBJECT_KEY = "medical-learning-last-subject";

export function getLastSubject(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_SUBJECT_KEY);
}

export function setLastSubject(subject: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_SUBJECT_KEY, subject);
  } catch {
    // 補助データのため失敗は無視
  }
}

/** 今日の日付 YYYY-MM-DD（ローカル） */
export function getToday(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/** 1問正解で得られる XP（コンボなし時） */
export const XP_PER_CORRECT = 10;

/**
 * 連続正解コンボに応じた XP 倍率（Duolingo 風）
 * 1 → 1x, 2 → 1.5x, 3 → 2x, 5+ → 2.5x
 */
const COMBO_MULTIPLIERS: Record<number, number> = {
  1: 1,
  2: 1.5,
  3: 2,
  4: 2,
  5: 2.5,
};
const COMBO_MAX_TIER = 5;

/** コンボ数から XP 倍率を返す（1以上の整数） */
export function getComboMultiplier(combo: number): number {
  if (combo <= 0) return 1;
  return COMBO_MULTIPLIERS[Math.min(combo, COMBO_MAX_TIER)] ?? COMBO_MULTIPLIERS[COMBO_MAX_TIER];
}

/** 正解時の獲得 XP（コンボ倍率込み）。不正解は 0 なので correct 時のみ呼ぶ */
export function getXPForCorrect(combo: number): number {
  const mult = getComboMultiplier(combo);
  return Math.round(XP_PER_CORRECT * mult);
}

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
