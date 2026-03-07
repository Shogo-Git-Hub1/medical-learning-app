import { describe, it, expect } from "vitest";
import {
  isChunkOrWebpackError,
  isChunkOrWebpackErrorFromError,
} from "./errorUtils";

describe("isChunkOrWebpackError", () => {
  it("reading 'call') を含むメッセージで true", () => {
    expect(
      isChunkOrWebpackError("Cannot read properties of undefined (reading 'call')")
    ).toBe(true);
    expect(isChunkOrWebpackError("Error: reading 'call')")).toBe(true);
  });

  it("Loading chunk を含むメッセージで true", () => {
    expect(isChunkOrWebpackError("Loading chunk 123 failed")).toBe(true);
    expect(isChunkOrWebpackError("Loading chunk failed")).toBe(true);
  });

  it("ChunkLoadError を含むメッセージで true", () => {
    expect(isChunkOrWebpackError("ChunkLoadError: ...")).toBe(true);
  });

  it("無関係なメッセージで false", () => {
    expect(isChunkOrWebpackError("Network request failed")).toBe(false);
    expect(isChunkOrWebpackError("Something went wrong")).toBe(false);
    expect(isChunkOrWebpackError("")).toBe(false);
  });

  it("Error オブジェクトの message を判定する", () => {
    expect(
      isChunkOrWebpackError(new Error("Cannot read properties of undefined (reading 'call')"))
    ).toBe(true);
    expect(isChunkOrWebpackError(new Error("Other error"))).toBe(false);
  });
});

describe("isChunkOrWebpackErrorFromError", () => {
  it("error.name が ChunkLoadError のとき true", () => {
    const err = new Error("any");
    err.name = "ChunkLoadError";
    expect(isChunkOrWebpackErrorFromError(err)).toBe(true);
  });

  it("message がチャンク系のとき true", () => {
    expect(
      isChunkOrWebpackErrorFromError(
        new Error("Cannot read properties of undefined (reading 'call')")
      )
    ).toBe(true);
    expect(
      isChunkOrWebpackErrorFromError(new Error("Loading chunk 0 failed"))
    ).toBe(true);
  });

  it("name も message も該当しないとき false", () => {
    expect(isChunkOrWebpackErrorFromError(new Error("Network error"))).toBe(
      false
    );
  });
});
