import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuizSession } from "./QuizSession";
import type { Question } from "@/types";

vi.mock("@/contexts/ProgressContext", () => ({
  useProgressContext: () => ({
    recordAnswer: vi.fn(),
    completeLesson: vi.fn(),
  }),
}));

vi.mock("@/lib/sounds", () => ({
  playCorrect: vi.fn(),
  playWrong: vi.fn(),
  playComplete: vi.fn(),
}));

const singleQuestion: Question[] = [
  {
    id: "q-test-1",
    lessonId: "test-lesson",
    text: "テスト問題",
    options: [
      { id: "a", text: "正解" },
      { id: "b", text: "不正解" },
    ],
    correctOptionId: "a",
    explanation: "説明",
    order: 1,
  },
];

describe("QuizSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("スキップ後・正解選択・次へで完了画面が出る", async () => {
    render(
      <QuizSession
        questions={singleQuestion}
        lessonId="test-lesson"
        lessonTitle="テスト"
        backHref="/"
      />
    );

    // イントロをスキップ
    const skipArea = screen.getByLabelText("タップでスキップ");
    fireEvent.click(skipArea);

    // 正解を選択（選択肢はシャッフルされる。「選択肢 N: 正解」のみマッチし「不正解」は除外）
    const correctOption = await screen.findByRole("button", { name: /選択肢 \d+: 正解$/ });
    fireEvent.click(correctOption);

    // 解答する
    const confirmButton = await screen.findByRole("button", { name: "解答する" });
    fireEvent.click(confirmButton);

    // 次へ
    const nextButton = await screen.findByRole("button", { name: "結果を見る" });
    fireEvent.click(nextButton);

    // 完了画面が出ていることをレッスン名とリトライボタンで確認
    expect(screen.getByText("テスト")).toBeTruthy();
    expect(screen.getByRole("button", { name: "もう一度挑戦" })).toBeTruthy();
  });
});
