/**
 * 全科目の questions / lessons を集約。
 * 新規科目追加時: (1) subjectRegistry.ts に1件追加 (2) 下の import と allQuestions/allLessons の spread に追加。
 */
import type { Question, Lesson } from "@/types";
import { SUBJECT_DISPLAY_ORDER } from "./subjectRegistry";
import { cellBiologyQuestions, cellBiologyLessons } from "./cell-biology";
import { biochemistryQuestions, biochemistryLessons } from "./biochemistry";
import { histologyQuestions, histologyLessons } from "./histology";
import { anatomyQuestions, anatomyLessons } from "./anatomy";
import { physiologyQuestions, physiologyLessons } from "./physiology";
import { immunologyQuestions, immunologyLessons } from "./immunology";
import { endocrinologyQuestions, endocrinologyLessons } from "./endocrinology";
import { microbiologyQuestions, microbiologyLessons } from "./microbiology";
import { virologyQuestions, virologyLessons } from "./virology";
import { bacteriologyQuestions, bacteriologyLessons } from "./bacteriology";
import { mycologyQuestions, mycologyLessons } from "./mycology";
import { pharmacologyQuestions, pharmacologyLessons } from "./pharmacology";
import { pathologyQuestions, pathologyLessons } from "./pathology";
import { geneticMedicineQuestions, geneticMedicineLessons } from "./genetic-medicine";
import { medicalEthicsQuestions, medicalEthicsLessons } from "./medical-ethics";

/** ロードマップでの分野の表示順（subjectRegistry の並び） */
export { SUBJECT_DISPLAY_ORDER };

const allQuestions: Question[] = [
  ...cellBiologyQuestions,
  ...biochemistryQuestions,
  ...histologyQuestions,
  ...anatomyQuestions,
  ...physiologyQuestions,
  ...immunologyQuestions,
  ...endocrinologyQuestions,
  ...microbiologyQuestions,
  ...virologyQuestions,
  ...bacteriologyQuestions,
  ...mycologyQuestions,
  ...pharmacologyQuestions,
  ...pathologyQuestions,
  ...geneticMedicineQuestions,
  ...medicalEthicsQuestions,
];

const allLessons: Lesson[] = [
  ...cellBiologyLessons,
  ...biochemistryLessons,
  ...histologyLessons,
  ...anatomyLessons,
  ...physiologyLessons,
  ...immunologyLessons,
  ...endocrinologyLessons,
  ...microbiologyLessons,
  ...virologyLessons,
  ...bacteriologyLessons,
  ...mycologyLessons,
  ...pharmacologyLessons,
  ...pathologyLessons,
  ...geneticMedicineLessons,
  ...medicalEthicsLessons,
];

export { allQuestions as subjectQuestions, allLessons as subjectLessons };
