import { describe, it, expect } from "vitest";
import {
  migrateProgress,
  getDefaultProgress,
  getToday,
  getComboMultiplier,
  getXPForCorrect,
  applyAnswerToProgress,
  xpToLevel,
  xpToNextLevel,
  PROGRESS_SCHEMA_VERSION,
  type UserProgress,
} from "./progress";

describe("progress", () => {
  describe("migrateProgress", () => {
    it("空オブジェクトの場合はデフォルト値を返す", () => {
      const result = migrateProgress({});
      expect(result.version).toBe(PROGRESS_SCHEMA_VERSION);
      expect(result.lastStudyDate).toBe("");
      expect(result.streakDays).toBe(0);
      expect(result.dailyGoal).toBe(5);
      expect(result.questionReviews).toEqual({});
    });

    it("version 0（旧形式）のデータを現在スキーマに変換する", () => {
      const old = {
        lastStudyDate: "2025-03-01",
        streakDays: 3,
        totalXP: 250,
        completedLessonIds: ["anatomy-1"],
        questionReviews: {
          "q-1": { nextReview: "2025-03-10", interval: 2 },
        },
      };
      const result = migrateProgress(old);
      expect(result.version).toBe(PROGRESS_SCHEMA_VERSION);
      expect(result.lastStudyDate).toBe("2025-03-01");
      expect(result.streakDays).toBe(3);
      expect(result.totalXP).toBe(250);
      expect(result.completedLessonIds).toEqual(["anatomy-1"]);
      expect(result.questionReviews).toEqual({
        "q-1": { nextReview: "2025-03-10", interval: 2 },
      });
    });

    it("不正な型のフィールドはデフォルトにフォールバックする", () => {
      const bad = {
        version: 0,
        streakDays: "three",
        totalXP: "lots",
        completedLessonIds: "not-an-array",
        questionReviews: null,
      };
      const result = migrateProgress(bad);
      expect(result.streakDays).toBe(0);
      expect(result.totalXP).toBe(0);
      expect(result.completedLessonIds).toEqual([]);
      expect(result.questionReviews).toEqual({});
    });
  });

  describe("getDefaultProgress", () => {
    it("デフォルト進捗を返し、version が現在スキーマと一致する", () => {
      const p = getDefaultProgress();
      expect(p.version).toBe(PROGRESS_SCHEMA_VERSION);
      expect(p.dailyGoal).toBe(5);
      expect(p.questionReviews).toEqual({});
    });
  });

  describe("getToday", () => {
    it("YYYY-MM-DD 形式の文字列を返す", () => {
      const today = getToday();
      expect(/^\d{4}-\d{2}-\d{2}$/.test(today)).toBe(true);
    });
  });

  describe("getComboMultiplier", () => {
    it("0 以下は 1 を返す", () => {
      expect(getComboMultiplier(0)).toBe(1);
      expect(getComboMultiplier(-1)).toBe(1);
    });
    it("1→1, 2→1.5, 3→2, 5以上→2.5", () => {
      expect(getComboMultiplier(1)).toBe(1);
      expect(getComboMultiplier(2)).toBe(1.5);
      expect(getComboMultiplier(3)).toBe(2);
      expect(getComboMultiplier(4)).toBe(2);
      expect(getComboMultiplier(5)).toBe(2.5);
      expect(getComboMultiplier(10)).toBe(2.5);
    });
  });

  describe("getXPForCorrect", () => {
    it("コンボ1で10XP", () => {
      expect(getXPForCorrect(1)).toBe(10);
    });
    it("コンボ2で15XP（1.5x）", () => {
      expect(getXPForCorrect(2)).toBe(15);
    });
    it("コンボ5で25XP（2.5x）", () => {
      expect(getXPForCorrect(5)).toBe(25);
    });
  });

  describe("xpToLevel", () => {
    it("0以下はレベル1", () => {
      expect(xpToLevel(0)).toBe(1);
      expect(xpToLevel(-1)).toBe(1);
    });
    it("100ごとにレベルが上がる", () => {
      expect(xpToLevel(99)).toBe(1);
      expect(xpToLevel(100)).toBe(2);
      expect(xpToLevel(199)).toBe(2);
      expect(xpToLevel(200)).toBe(3);
    });
  });

  describe("xpToNextLevel", () => {
    it("現在レベル内の残りXPと次のレベルまでに必要なXPを返す", () => {
      const r = xpToNextLevel(50);
      expect(r.current).toBe(50);
      expect(r.needed).toBe(50);
    });
    it("100 XP でレベル2のとき、current=0, needed=100", () => {
      const r = xpToNextLevel(100);
      expect(r.current).toBe(0);
      expect(r.needed).toBe(100);
    });
  });

  describe("applyAnswerToProgress", () => {
    const today = "2025-03-07";

    it("正解時は復習間隔が延び、XP が加算される", () => {
      const base: UserProgress = {
        ...getDefaultProgress(),
        lastStudyDate: "2025-03-06",
        streakDays: 1,
        dailyResetDate: today,
        dailyAnswered: 2,
        totalXP: 50,
        questionReviews: {},
      };
      const next = applyAnswerToProgress(base, "q-1", true, 1, today);
      expect(next.questionReviews["q-1"].interval).toBe(1);
      expect(next.questionReviews["q-1"].nextReview).toBe("2025-03-08");
      expect(next.totalXP).toBe(60);
      expect(next.dailyAnswered).toBe(3);
      expect(next.lastStudyDate).toBe(today);
    });

    it("不正解時は復習間隔が1日、XP は増えない", () => {
      const base: UserProgress = {
        ...getDefaultProgress(),
        lastStudyDate: today,
        dailyResetDate: today,
        questionReviews: { "q-1": { nextReview: "2025-03-10", interval: 2 } },
      };
      const next = applyAnswerToProgress(base, "q-1", false, 1, today);
      expect(next.questionReviews["q-1"].interval).toBe(1);
      expect(next.questionReviews["q-1"].nextReview).toBe("2025-03-08");
      expect(next.totalXP).toBe(base.totalXP);
    });

    it("昨日学習していればストリークが増える", () => {
      const base: UserProgress = {
        ...getDefaultProgress(),
        lastStudyDate: "2025-03-06",
        streakDays: 2,
        dailyResetDate: today,
        dailyAnswered: 0,
      };
      const next = applyAnswerToProgress(base, "q-1", true, 1, today);
      expect(next.streakDays).toBe(3);
    });
  });
});
