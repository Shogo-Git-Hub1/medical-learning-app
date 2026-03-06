import type { Question, Lesson } from "@/types";
import { anatomyQuestions, anatomyLessons } from "./anatomy";
import { physiologyQuestions, physiologyLessons } from "./physiology";
import { pharmacologyQuestions, pharmacologyLessons } from "./pharmacology";
import { pathologyQuestions, pathologyLessons } from "./pathology";
import { cellBiologyQuestions, cellBiologyLessons } from "./cell-biology";
import { biochemistryQuestions, biochemistryLessons } from "./biochemistry";
import { histologyQuestions, histologyLessons } from "./histology";
import { immunologyQuestions, immunologyLessons } from "./immunology";
import { endocrinologyQuestions, endocrinologyLessons } from "./endocrinology";
import { microbiologyQuestions, microbiologyLessons } from "./microbiology";
import { virologyQuestions, virologyLessons } from "./virology";
import { bacteriologyQuestions, bacteriologyLessons } from "./bacteriology";
import { mycologyQuestions, mycologyLessons } from "./mycology";
import { geneticMedicineQuestions, geneticMedicineLessons } from "./genetic-medicine";
import { medicalEthicsQuestions, medicalEthicsLessons } from "./medical-ethics";

/** ロードマップでの分野の表示順（難易度・学習の流れ） */
export const SUBJECT_DISPLAY_ORDER = [
  "細胞生物学",
  "生化学",
  "組織学",
  "解剖学",
  "生理学",
  "免疫学",
  "内分泌学",
  "微生物学総論",
  "ウイルス学",
  "細菌学",
  "真菌学",
  "薬理学",
  "病理学",
  "遺伝子医学",
  "医療倫理",
] as const;

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
