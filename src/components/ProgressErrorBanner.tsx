"use client";

import { useProgressContext } from "@/contexts/ProgressContext";

/**
 * 進捗の読み込み失敗・保存失敗を画面上部に表示し、閉じられるようにする。
 */
export function ProgressErrorBanner() {
  const { loadError, saveError, clearLoadError, clearSaveError } = useProgressContext();

  if (!loadError && !saveError) return null;

  return (
    <div className="sticky top-0 z-50 flex flex-col gap-2 p-3 max-w-2xl mx-auto" role="alert">
      {loadError && (
        <div
          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm shadow-lg"
          style={{
            background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
            border: "1px solid rgba(239,108,68,0.4)",
            color: "#bf360c",
          }}
        >
          <p className="font-medium flex-1">{loadError}</p>
          <button
            type="button"
            onClick={clearLoadError}
            className="shrink-0 rounded-lg px-3 py-1.5 font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ background: "rgba(239,108,68,0.2)" }}
            aria-label="閉じる"
          >
            閉じる
          </button>
        </div>
      )}
      {saveError && (
        <div
          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm shadow-lg"
          style={{
            background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
            border: "1px solid rgba(211,47,47,0.4)",
            color: "#b71c1c",
          }}
        >
          <p className="font-medium flex-1">{saveError}</p>
          <button
            type="button"
            onClick={clearSaveError}
            className="shrink-0 rounded-lg px-3 py-1.5 font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ background: "rgba(211,47,47,0.2)" }}
            aria-label="閉じる"
          >
            閉じる
          </button>
        </div>
      )}
    </div>
  );
}
