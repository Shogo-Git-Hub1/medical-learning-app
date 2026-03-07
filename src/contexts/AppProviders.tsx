"use client";

import type { ReactNode } from "react";
import { ProgressProvider } from "./ProgressContext";

/**
 * アプリ全体の Provider を一括でラップする。
 *
 * ルール: useProgressContext を使うコンポーネントは、必ずこの AppProviders の子孫であること。
 * layout.tsx では <body> 直下で AppProviders で囲むので、サイドバー・メイン・ボトムナビはすべて内側に置く。
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
