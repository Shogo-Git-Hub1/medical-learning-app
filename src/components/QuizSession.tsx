"use client";

import { useState } from "react";
import Link from "next/link";
import type { Question } from "@/lib/types";

type Props = {
  questions: Question[];
  lessonTitle: string;
};

export function QuizSession({ questions, lessonTitle }: Props) {
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const current = questions[index];
  const isLast = index === questions.length - 1;
  const correct = current?.options.find((o) => o.id === current.correctOptionId);
  const isCorrect = selectedId === current?.correctOptionId;

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedId(optionId);
    setShowFeedback(true);
    setResults((r) => [...r, optionId === current.correctOptionId]);
  };

  const handleNext = () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      setSelectedId(null);
      setShowFeedback(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 text-center text-slate-700">
        <p className="font-medium">このレッスンには問題がありません。</p>
        <Link href="/roadmap" className="mt-4 inline-block text-primary underline">
          ロードマップに戻る
        </Link>
      </div>
    );
  }

  // 全問終了
  if (showFeedback && isLast) {
    const correctCount = results.filter(Boolean).length + (isCorrect ? 1 : 0);
    const total = questions.length;

    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-primary bg-green-50 p-6 text-center">
          <h2 className="text-xl font-bold text-slate-800">レッスン完了</h2>
          <p className="mt-2 text-slate-600">
            {lessonTitle}
          </p>
          <p className="mt-4 text-2xl font-bold text-primary">
            {correctCount} / {total} 問正解
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href="/roadmap"
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-md hover:bg-primary-dark transition"
          >
            ロードマップに戻る
          </Link>
          <Link
            href="/"
            className="rounded-xl border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            ホーム
          </Link>
        </div>
      </div>
    );
  }

  // 1問の表示
  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        問題 {index + 1} / {questions.length}
      </p>
      <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 leading-relaxed">
          {current.text}
        </h2>
        <ul className="mt-6 space-y-3">
          {current.options.map((opt) => {
            const chosen = selectedId === opt.id;
            const isRight = opt.id === current.correctOptionId;
            let style = "border-slate-200 bg-slate-50 hover:border-slate-300";
            if (showFeedback) {
              if (isRight) style = "border-green-500 bg-green-50";
              else if (chosen && !isRight) style = "border-red-400 bg-red-50";
            } else if (chosen) {
              style = "border-primary bg-green-50";
            }
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  disabled={showFeedback}
                  className={`w-full rounded-xl border-2 p-4 text-left font-medium text-slate-800 transition ${style} disabled:cursor-default`}
                >
                  {opt.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {showFeedback && (
        <div className="space-y-4">
          <div
            className={`rounded-xl border-2 p-4 ${
              isCorrect ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "正解です。" : `不正解。正解は「${correct?.text}」です。`}
            </p>
            {current.explanation && (
              <p className="mt-2 text-sm text-slate-600">{current.explanation}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white shadow-md hover:bg-primary-dark transition"
          >
            {isLast ? "結果を見る" : "次へ"}
          </button>
        </div>
      )}
    </div>
  );
}

