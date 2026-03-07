import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { useProgressContext, ProgressProvider } from "./ProgressContext";

/** Provider の外で useProgressContext を呼んでも throw せずデフォルトの level が返ることを検証 */
function ConsumerOuter() {
  const value = useProgressContext();
  return <span data-testid="level">{value.level}</span>;
}

/** Provider 内側で level が提供されることを検証 */
function ConsumerInner() {
  const value = useProgressContext();
  return <span data-testid="level">{value.level}</span>;
}

describe("ProgressContext", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    warnSpy.mockRestore();
  });

  it("Provider の外で useProgressContext を呼んでも throw せずデフォルト値が返る", () => {
    render(<ConsumerOuter />);
    expect(screen.getByTestId("level").textContent).toBe("1");
  });

  it("ProgressProvider の内側では level が提供される", () => {
    render(
      <ProgressProvider>
        <ConsumerInner />
      </ProgressProvider>
    );
    expect(screen.getByTestId("level").textContent).toBe("1");
  });
});
