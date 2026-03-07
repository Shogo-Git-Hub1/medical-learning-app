/**
 * 科目テーマ定数（subjectRegistry から再エクスポート）。
 * "use client" を持つ RoadmapPrimitives から分離することで
 * RSC バンドルの不整合を防ぐ。
 */
export type { SubjectTheme } from "./subjectRegistry";
export {
  SUBJECT_THEMES,
  DEFAULT_THEME,
} from "./subjectRegistry";
