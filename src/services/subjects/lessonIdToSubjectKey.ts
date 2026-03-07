/**
 * レッスンIDのプレフィックス → 科目モジュール情報。
 * getLessonWithQuestionsAsync で dynamic import する際に使用し、
 * レッスンページのクライアントバンドルを科目単位で分割する。
 */
export type SubjectModuleInfo = {
  key: string;
  lessonsExport: string;
  questionsExport: string;
};

const PREFIX_TO_SUBJECT: Record<string, SubjectModuleInfo> = {
  cellbiology: { key: "cell-biology", lessonsExport: "cellBiologyLessons", questionsExport: "cellBiologyQuestions" },
  biochemistry: { key: "biochemistry", lessonsExport: "biochemistryLessons", questionsExport: "biochemistryQuestions" },
  histology: { key: "histology", lessonsExport: "histologyLessons", questionsExport: "histologyQuestions" },
  anatomy: { key: "anatomy", lessonsExport: "anatomyLessons", questionsExport: "anatomyQuestions" },
  physiology: { key: "physiology", lessonsExport: "physiologyLessons", questionsExport: "physiologyQuestions" },
  immunology: { key: "immunology", lessonsExport: "immunologyLessons", questionsExport: "immunologyQuestions" },
  endocrinology: { key: "endocrinology", lessonsExport: "endocrinologyLessons", questionsExport: "endocrinologyQuestions" },
  microbiology: { key: "microbiology", lessonsExport: "microbiologyLessons", questionsExport: "microbiologyQuestions" },
  virology: { key: "virology", lessonsExport: "virologyLessons", questionsExport: "virologyQuestions" },
  bacteriology: { key: "bacteriology", lessonsExport: "bacteriologyLessons", questionsExport: "bacteriologyQuestions" },
  mycology: { key: "mycology", lessonsExport: "mycologyLessons", questionsExport: "mycologyQuestions" },
  pharmacology: { key: "pharmacology", lessonsExport: "pharmacologyLessons", questionsExport: "pharmacologyQuestions" },
  pathology: { key: "pathology", lessonsExport: "pathologyLessons", questionsExport: "pathologyQuestions" },
  "genetic-medicine": { key: "genetic-medicine", lessonsExport: "geneticMedicineLessons", questionsExport: "geneticMedicineQuestions" },
  "medical-ethics": { key: "medical-ethics", lessonsExport: "medicalEthicsLessons", questionsExport: "medicalEthicsQuestions" },
};

function getPrefix(lessonId: string): string {
  const lastDash = lessonId.lastIndexOf("-");
  if (lastDash <= 0) return lessonId;
  const suffix = lessonId.slice(lastDash + 1);
  if (/^\d+$/.test(suffix)) return lessonId.slice(0, lastDash);
  return lessonId;
}

export function getSubjectModuleInfo(lessonId: string): SubjectModuleInfo | null {
  const prefix = getPrefix(lessonId);
  return PREFIX_TO_SUBJECT[prefix] ?? null;
}
