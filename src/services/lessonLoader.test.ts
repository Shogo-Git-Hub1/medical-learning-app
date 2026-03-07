import { describe, it, expect } from "vitest";
import { getSubjectModuleInfo } from "./subjects/lessonIdToSubjectKey";
import { getLessonWithQuestionsAsync } from "./lessonLoader";

describe("lessonIdToSubjectKey", () => {
  it("lessonId から科目モジュール情報を返す", () => {
    expect(getSubjectModuleInfo("cellbiology-1")).toEqual({
      key: "cell-biology",
      lessonsExport: "cellBiologyLessons",
      questionsExport: "cellBiologyQuestions",
    });
    expect(getSubjectModuleInfo("anatomy-1")).toEqual({
      key: "anatomy",
      lessonsExport: "anatomyLessons",
      questionsExport: "anatomyQuestions",
    });
    expect(getSubjectModuleInfo("genetic-medicine-2")).toEqual({
      key: "genetic-medicine",
      lessonsExport: "geneticMedicineLessons",
      questionsExport: "geneticMedicineQuestions",
    });
  });
  it("未知の lessonId の場合は null", () => {
    expect(getSubjectModuleInfo("unknown-1")).toBeNull();
  });
});

describe("getLessonWithQuestionsAsync", () => {
  it("存在する lessonId でレッスンと問題を返す", async () => {
    const data = await getLessonWithQuestionsAsync("cellbiology-1");
    expect(data).not.toBeNull();
    expect(data!.lesson.id).toBe("cellbiology-1");
    expect(data!.questions.length).toBeGreaterThan(0);
    expect(data!.questions.every((q) => data!.lesson.questionIds.includes(q.id))).toBe(true);
  });
  it("存在しない lessonId の場合は null", async () => {
    expect(await getLessonWithQuestionsAsync("no-such-lesson")).toBeNull();
  });
});
