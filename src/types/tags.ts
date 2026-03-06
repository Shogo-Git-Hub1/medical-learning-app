/**
 * 科目・試験タグの定数
 * フィルタUIやバリデーションで利用。問題・レッスン追加時に参照。
 */
export const SUBJECTS = [
  "解剖学",
  "生理学",
  "薬理学",
  "病理学",
  "微生物学",
  "公衆衛生",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const EXAM_TAGS = [
  "医師国家試験",
  "看護師国家試験",
  "薬剤師国家試験",
  "歯科医師国家試験",
] as const;

export type ExamTag = (typeof EXAM_TAGS)[number];
