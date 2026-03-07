"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PushButton } from "@/components/ui/PushButton";

export default function ReviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[review error]", error);
  }, [error]);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="neu-inset rounded-2xl p-8 text-center">
        <p className="text-4xl select-none mb-3" aria-hidden>⚠️</p>
        <h1 className="text-lg font-bold text-pastel-ink font-nunito mb-2">
          復習を読み込めませんでした
        </h1>
        <p className="text-sm text-pastel-ink/70 mb-6">
          もう一度お試しください。解決しない場合はホームに戻ってから再度アクセスしてください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PushButton type="button" onClick={reset}>
            もう一度試す
          </PushButton>
          <PushButton href="/" variant="outline">
            ホームに戻る
          </PushButton>
        </div>
      </div>
    </div>
  );
}
