"use client";

import { useProgressContext } from "@/contexts/ProgressContext";

/**
 * 進捗・レベル・復習ID取得・記録用のフック。
 * ProgressProvider 内で使用すること。
 */
export function useProgress() {
  return useProgressContext();
}
