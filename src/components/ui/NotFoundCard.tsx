"use client";

import type { ReactNode } from "react";
import { CardWithAccent } from "@/components/ui/CardWithAccent";

export type NotFoundCardProps = {
  /** 見出し（例: レッスンが見つかりません） */
  title: string;
  /** 見出し上のラベル（例: // 404 NOT FOUND） */
  subLabel?: string;
  /** カード下に表示する戻るボタンなど */
  children?: ReactNode;
};

/**
 * 404 や「見つかりません」用の共通カード。
 * レッスン Not Found や他ルートの Not Found で再利用する。
 */
export function NotFoundCard({ title, subLabel, children }: NotFoundCardProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <CardWithAccent variant="error" container="card" className="p-8 text-center">
        {subLabel && (
          <p className="font-mono text-xs text-pastel-ink/40 mb-2">{subLabel}</p>
        )}
        <h1 className="text-lg font-bold text-pastel-ink">{title}</h1>
      </CardWithAccent>
      {children}
    </div>
  );
}
