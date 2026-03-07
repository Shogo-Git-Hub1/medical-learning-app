"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PushButton } from "@/components/ui/PushButton";

export default function LessonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[lesson error]", error);
  }, [error]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="neu-card rounded-2xl p-8 text-center relative overflow-hidden">
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(232,100,100,0.6), transparent)",
          }}
          aria-hidden
        />
        <p className="font-mono text-xs text-pastel-ink/40 mb-2">{"// Error"}</p>
        <h1 className="text-lg font-bold text-pastel-ink mb-2">レッスンを読み込めませんでした</h1>
        <p className="text-sm text-pastel-ink/70 mb-6">
          通信エラーや一時的な不具合の可能性があります。下のボタンでやり直すか、ロードマップに戻ってください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PushButton type="button" onClick={reset}>
            もう一度試す
          </PushButton>
          <PushButton href="/roadmap" variant="outline">
            ロードマップに戻る
          </PushButton>
        </div>
      </div>
    </div>
  );
}
