/**
 * 科目モジュールのローディング用情報を data/subjectRegistry の REGISTRY から導く。
 * SUBJECT_DISPLAY_ORDER の再エクスポートと、lessonId プレフィックス → モジュール情報の対応を提供。
 */

import { SUBJECT_REGISTRY } from "@/data/subjectRegistry";

export type SubjectModuleInfo = {
  key: string;
  lessonsExport: string;
  questionsExport: string;
};

function keyToCamelCase(key: string): string {
  return key
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

const PREFIX_TO_MODULE: Record<string, SubjectModuleInfo> = Object.fromEntries(
  SUBJECT_REGISTRY.map((r) => {
    const camel = keyToCamelCase(r.key);
    return [
      r.prefix,
      {
        key: r.key,
        lessonsExport: `${camel}Lessons`,
        questionsExport: `${camel}Questions`,
      },
    ];
  })
);

/** ロードマップでの分野の表示順（data/subjectRegistry の REGISTRY の並び） */
export { SUBJECT_DISPLAY_ORDER } from "@/data/subjectRegistry";

/** レッスンIDプレフィックスからモジュール情報を取得（lessonIdToSubjectKey で使用） */
export function getSubjectModuleInfoByPrefix(prefix: string): SubjectModuleInfo | null {
  return PREFIX_TO_MODULE[prefix] ?? null;
}
