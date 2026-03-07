import { describe, it, expect } from "vitest";
import {
  getQuestionsById,
  getDueReviewQuestionIdsThatExist,
  getLessonWithQuestions,
  getAllLessons,
  getLessonsGroupedBySubject,
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
});
