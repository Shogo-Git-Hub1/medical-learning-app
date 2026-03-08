"use client";

import Link from "next/link";
import { PushButton } from "@/components/ui/PushButton";

type Props = {
  onResume: () => void;
  exitHref: string;
  remainingCount: number;
  /** 将来キャラクターを挿入するスロット（未指定時は非表示） */
  characterSlot?: React.ReactNode;
};

function getExitMessage(remaining: number): string {
  if (remaining <= 1) return "最後の1問！あと少しです！";
  if (remaining <= 3) return `あと${remaining}問！もうひと頑張り！`;
  return `あと${remaining}問で完了！諦めないで！`;
}

/**
 * クイズ途中離脱確認ボトムシート。
 * × ボタン押下時に表示する。characterSlot に将来キャラクターを差し込める。
 */
export function QuizExitSheet({ onResume, exitHref, remainingCount, characterSlot }: Props) {
  return (
    <>
      {/* バックドロップ */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.45)" }}
        aria-hidden
        onClick={onResume}
      />

      {/* シート本体 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="レッスンを終了しますか？"
        className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
        style={{
          background: "#ffffff",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.14)",
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)",
        }}
      >
        <div className="px-6 pt-5 pb-2 flex flex-col items-center gap-5 max-w-sm mx-auto">
          {/* ドラッグハンドル */}
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.13)" }}
            aria-hidden
          />

          {/* キャラクタースロット（将来拡張用） */}
          {characterSlot && (
            <div className="w-24 h-24 flex items-center justify-center">
              {characterSlot}
            </div>
          )}

          {/* メッセージ */}
          <div className="text-center space-y-1.5">
            <p
              className="text-lg font-bold font-nunito leading-snug"
              style={{ color: "rgba(0,0,0,0.80)" }}
            >
              {getExitMessage(remainingCount)}
            </p>
            <p
              className="text-sm"
              style={{ color: "rgba(0,0,0,0.42)" }}
            >
              途中までの回答は保存済みです。
            </p>
          </div>

          {/* ボタン群 */}
          <div className="w-full flex flex-col gap-3 pb-2">
            <PushButton
              variant="primary"
              className="w-full text-base"
              onClick={onResume}
            >
              続ける
            </PushButton>

            <Link
              href={exitHref}
              className="w-full py-3 flex items-center justify-center rounded-xl text-base font-semibold transition-all duration-150 active:opacity-70"
              style={{ color: "#e05252" }}
              aria-label="レッスンを終了する"
            >
              終了する
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
