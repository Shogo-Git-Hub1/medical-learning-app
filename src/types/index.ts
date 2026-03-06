/**
 * 問題の1つの選択肢
 */
export type QuestionOption = {
  id: string;
  text: string;
};

/**
 * 1問の構造化された問題
 */
export type Question = {
  id: string;
  lessonId: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation?: string;
  /** 科目タグ（解剖学・生理学など） */
  subject?: string;
  /** 試験タグ（医師国家試験など） */
  examTag?: string;
  /** 表示順（レッスン内） */
  order: number;
};

/**
 * 1つのレッスン（複数問のまとまり）
 */
export type Lesson = {
  id: string;
  title: string;
  /** このレッスンに含まれる問題IDの並び */
  questionIds: string[];
  subject?: string;
  /** 試験タグ（医師国家試験など） */
  examTag?: string;
  /** 全体ロードマップ用の並び順（後方互換） */
  order: number;
  /** 同一分野内での並び順（難易度順の連なり） */
  orderInSubject: number;
};

/**
 * 問題＋レッスン情報のデータベース
 */
export type QuestionDatabase = {
  questions: Question[];
  lessons: Lesson[];
};
