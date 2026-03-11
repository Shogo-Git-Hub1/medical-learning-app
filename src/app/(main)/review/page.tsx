"use client";

import Link from "next/link";
import { useProgressContext } from "@/contexts/ProgressContext";
import { getDueReviewQuestionIdsThatExist, REVIEW_BATCH_SIZE } from "@/services/lessonService";

export default function ReviewPage() {
  const { progress } = useProgressContext();
  const dueIds = getDueReviewQuestionIdsThatExist(progress);
  const dueCount = dueIds.length;
  const batchCount = Math.min(dueCount, REVIEW_BATCH_SIZE);

  if (dueCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: "rgba(88,204,2,0.12)", border: "2px solid rgba(88,204,2,0.25)" }}
        >
          ✅
        </div>
        <div>
          <p className="font-bold text-lg font-nunito" style={{ color: "#46a302" }}>
            今日の復習はありません
          </p>
          <p className="text-sm text-pastel-ink/50 mt-1">また明日チェックしてみましょう</p>
        </div>
        <Link
          href="/subjects"
          className="rounded-2xl px-6 py-3 font-bold text-sm font-nunito text-white transition-all duration-150 active:scale-[0.97]"
          style={{ background: "#58cc02", boxShadow: "0 3px 0 #46a302" }}
        >
          レッスンへ
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-mono text-pastel-ink/40 uppercase tracking-widest mb-1">
          復習
        </p>
        <p className="text-xl font-bold font-nunito text-pastel-ink">
          間隔反復で記憶を定着させよう
        </p>
      </div>

      {/* メインカード */}
      <div
        className="rounded-2xl p-6 flex flex-col items-center gap-5 text-center"
        style={{
          background: "linear-gradient(135deg, #7E57C2, #512DA8)",
        }}
      >
        <span className="text-5xl select-none" aria-hidden>🧠</span>
        <div>
          <p className="text-white/70 text-xs font-mono mb-1">DUE FOR REVIEW</p>
          <p className="text-white font-bold text-4xl font-nunito leading-none">
            {dueCount}
            <span className="text-white/70 text-lg ml-1">問</span>
          </p>
          {dueCount > REVIEW_BATCH_SIZE && (
            <p className="text-white/60 text-xs mt-2">
              まずは {REVIEW_BATCH_SIZE} 問からスタートします
            </p>
          )}
        </div>

        <Link
          href="/review/session"
          className="w-full rounded-2xl py-3.5 font-bold text-base font-nunito text-[#512DA8] transition-all duration-150 active:scale-[0.97]"
          style={{ background: "#ffffff" }}
        >
          {batchCount} 問スタート →
        </Link>
      </div>

      {/* ヒント */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-shadow-sm)", border: "1.5px solid rgba(0,0,0,0.06)" }}
      >
        <p className="text-[10px] font-mono text-pastel-ink/40 uppercase tracking-widest mb-2">
          間隔反復とは
        </p>
        <p className="text-xs text-pastel-ink/60 leading-relaxed">
          正解した問題は少し後に、間違えた問題はすぐに出題されます。繰り返すことで長期記憶に定着させます。
        </p>
      </div>
    </div>
  );
}
