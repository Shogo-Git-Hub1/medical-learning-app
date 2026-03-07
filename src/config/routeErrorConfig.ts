import type { ReactNode } from "react";

/**
 * ルート別 error.tsx で使う表示設定。
 * error と onReset は Next.js の error boundary から渡すため含まない。
 */
export type RouteErrorConfig = {
  logLabel: string;
  title: string;
  description: string;
  resetLabel: string;
  backHref: string;
  backLabel: string;
  variant?: "card" | "inset";
  icon?: ReactNode;
};

export const ROUTE_ERROR_CONFIG: Record<string, RouteErrorConfig> = {
  browse: {
    logLabel: "[browse error]",
    title: "一覧を表示できませんでした",
    description: "再読み込みするか、ホームからやり直してください。",
    resetLabel: "再読み込み",
    backHref: "/",
    backLabel: "ホームに戻る",
  },
  lesson: {
    logLabel: "[lesson error]",
    title: "レッスンを読み込めませんでした",
    description:
      "通信エラーや一時的な不具合の可能性があります。下のボタンでやり直すか、科目一覧に戻ってください。",
    resetLabel: "もう一度試す",
    backHref: "/subjects",
    backLabel: "科目一覧に戻る",
  },
  review: {
    logLabel: "[review error]",
    title: "復習を読み込めませんでした",
    description:
      "もう一度お試しください。解決しない場合はホームに戻ってから再度アクセスしてください。",
    resetLabel: "もう一度試す",
    backHref: "/",
    backLabel: "ホームに戻る",
    variant: "inset",
    icon: "⚠️",
  },
};
