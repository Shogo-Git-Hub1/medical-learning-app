import { describe, it, expect } from "vitest";
import {
  getQuestionsById,
  getDueReviewQuestionIdsThatExist,
  getLessonWithQuestions,
  getAllLessons,
  getLessonsGroupedBySubject,
  getNextLessonAfter,
  getLessonStates,
  getCurrentLessonIndex,
  firstUncompleted,
  findRecommendedLesson,
  SUBJECT_DISPLAY_ORDER,
} from "./lessonService";
import type { UserProgress } from "@/lib/progress";

describe("lessonService", () => {
  describe("getQuestionsById", () => {
    it("空配列の場合は空配列を返す", () => {
      expect(getQuestionsById([])).toEqual([]);
    });
    it("存在するIDの配列を渡すと、対応する問題を order 順で返す", () => {
      const lessons = getAllLessons();
      expect(lessons.length).toBeGreaterThan(0);
      const first = lessons[0];
      const ids = first.questionIds;
      const questions = getQuestionsById(ids);
      expect(questions.length).toBe(ids.length);
      expect(questions.every((q) => ids.includes(q.id))).toBe(true);
      for (let i = 1; i < questions.length; i++) {
        expect(questions[i].order >= questions[i - 1].order).toBe(true);
      }
    });
    it("存在しないIDは結果に含まれない", () => {
      const result = getQuestionsById(["non-existent-id", "another-fake"]);
      expect(result).toEqual([]);
    });
  });

  describe("getDueReviewQuestionIdsThatExist", () => {
    it("今日が復習日のIDのみ返し、DBに存在するものだけに絞る", () => {
      const today = new Date().toISOString().slice(0, 10);
      const lessons = getAllLessons();
      const firstLesson = lessons[0];
      const questionIds = firstLesson.questionIds;
      const progress: UserProgress = {
        version: 1,
        lastStudyDate: today,
        streakDays: 1,
        dailyGoal: 5,
        dailyAnswered: 0,
        dailyResetDate: today,
        totalXP: 0,
        completedLessonIds: [],
        questionReviews: {},
      };
      questionIds.forEach((id) => {
        progress.questionReviews[id] = { nextReview: today, interval: 1 };
      });
      const due = getDueReviewQuestionIdsThatExist(progress);
      expect(due.length).toBe(questionIds.length);
      expect(due.every((id) => questionIds.includes(id))).toBe(true);
    });
    it("復習日が未来のIDは含まれない", () => {
      const future = "2030-12-31";
      const progress: UserProgress = {
        version: 1,
        lastStudyDate: "",
        streakDays: 0,
        dailyGoal: 5,
        dailyAnswered: 0,
        dailyResetDate: "",
        totalXP: 0,
        completedLessonIds: [],
        questionReviews: {
          "q-some": { nextReview: future, interval: 1 },
        },
      };
      const due = getDueReviewQuestionIdsThatExist(progress);
      expect(due).toEqual([]);
    });
    it("DBに存在しないIDは結果に含まれない", () => {
      const today = new Date().toISOString().slice(0, 10);
      const progress: UserProgress = {
        version: 1,
        lastStudyDate: today,
        streakDays: 0,
        dailyGoal: 5,
        dailyAnswered: 0,
        dailyResetDate: today,
        totalXP: 0,
        completedLessonIds: [],
        questionReviews: {
          "non-existent-q": { nextReview: today, interval: 1 },
        },
      };
      const due = getDueReviewQuestionIdsThatExist(progress);
      expect(due).toEqual([]);
    });
  });

  describe("getLessonWithQuestions", () => {
    it("存在する lessonId でレッスンと問題一覧を返す", () => {
      const all = getAllLessons();
      expect(all.length).toBeGreaterThan(0);
      const data = getLessonWithQuestions(all[0].id);
      expect(data).not.toBeNull();
      expect(data!.lesson.id).toBe(all[0].id);
      expect(data!.questions.length).toBe(all[0].questionIds.length);
    });
    it("存在しない lessonId の場合は null", () => {
      expect(getLessonWithQuestions("no-such-lesson")).toBeNull();
    });
  });

  describe("getLessonsGroupedBySubject", () => {
    it("SUBJECT_DISPLAY_ORDER の順で分野が並ぶ", () => {
      const grouped = getLessonsGroupedBySubject();
      const keys = Object.keys(grouped);
      expect(keys.length).toBeGreaterThan(0);
      for (let i = 0; i < keys.length; i++) {
        expect(keys[i]).toBe(SUBJECT_DISPLAY_ORDER[i]);
      }
    });
  });

  describe("getNextLessonAfter", () => {
    it("review の場合は null", () => {
      expect(getNextLessonAfter("review")).toBeNull();
    });
    it("存在しない lessonId の場合は null", () => {
      expect(getNextLessonAfter("no-such-lesson")).toBeNull();
    });
    it("ロードマップ順で次のレッスンを返す", () => {
      const all = getAllLessons();
      expect(all.length).toBeGreaterThan(1);
      const next = getNextLessonAfter(all[0].id);
      expect(next).not.toBeNull();
      expect(next!.id).toBe(all[1].id);
    });
    it("最後のレッスンの場合は null", () => {
      const all = getAllLessons();
      const lastId = all[all.length - 1].id;
      expect(getNextLessonAfter(lastId)).toBeNull();
    });
  });

  describe("getLessonStates / getCurrentLessonIndex", () => {
    it("未完了のレッスンが先頭なら currentIndex は 0", () => {
      const all = getAllLessons();
      const first = all.slice(0, 3);
      expect(getCurrentLessonIndex(first, [])).toBe(0);
      const states = getLessonStates(first, []);
      expect(states[0]).toEqual({ done: false, locked: false });
      expect(states[1]).toEqual({ done: false, locked: true });
    });
    it("すべて完了なら currentIndex は -1", () => {
      const all = getAllLessons();
      const first = all.slice(0, 2);
      const completedIds = first.map((l) => l.id);
      expect(getCurrentLessonIndex(first, completedIds)).toBe(-1);
      const states = getLessonStates(first, completedIds);
      expect(states.every((s) => s.done)).toBe(true);
    });
    it("1つ目完了なら currentIndex は 1", () => {
      const all = getAllLessons();
      const first = all.slice(0, 3);
      const completedIds = [first[0].id];
      expect(getCurrentLessonIndex(first, completedIds)).toBe(1);
      const states = getLessonStates(first, completedIds);
      expect(states[0]).toEqual({ done: true, locked: false });
      expect(states[1]).toEqual({ done: false, locked: false });
      expect(states[2]).toEqual({ done: false, locked: true });
    });
  });

  describe("firstUncompleted / findRecommendedLesson", () => {
    const emptyProgress: UserProgress = {
      version: 1,
      lastStudyDate: "",
      streakDays: 0,
      dailyGoal: 5,
      dailyAnswered: 0,
      dailyResetDate: "",
      totalXP: 0,
      completedLessonIds: [],
      questionReviews: {},
    };

    it("未完了がなければ allDone", () => {
      const all = getAllLessons();
      const completedIds = all.map((l) => l.id);
      const progress: UserProgress = { ...emptyProgress, completedLessonIds: completedIds };
      const grouped = getLessonsGroupedBySubject();
      const rec = firstUncompleted(progress, grouped);
      expect(rec.kind).toBe("allDone");
    });

    it("未完了があれば kind が next で最初の未完了レッスンを返す", () => {
      const grouped = getLessonsGroupedBySubject();
      const rec = firstUncompleted(emptyProgress, grouped);
      expect(rec.kind).toBe("next");
      expect("lesson" in rec && "subject" in rec).toBe(true);
      if (rec.kind === "next") {
        expect(rec.lesson).toBeDefined();
        expect(SUBJECT_DISPLAY_ORDER).toContain(rec.subject);
      }
    });

    it("lastResult なしなら firstUncompleted と同じ", () => {
      const rec = findRecommendedLesson(emptyProgress, null);
      expect(rec.kind).toBe("next");
    });

    it("正答率 80% 未満なら retry", () => {
      const all = getAllLessons();
      const firstId = all[0].id;
      const progress: UserProgress = { ...emptyProgress, completedLessonIds: [] };
      const rec = findRecommendedLesson(progress, { lessonId: firstId, accuracy: 0.5 });
      expect(rec.kind).toBe("retry");
      if (rec.kind === "retry") {
        expect(rec.lesson.id).toBe(firstId);
        expect(rec.lastAccuracy).toBe(0.5);
      }
    });
  });
});
