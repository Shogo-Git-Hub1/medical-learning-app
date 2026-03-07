"use client";

/**
 * ルートレイアウトで発生したランタイムエラー（ChunkLoadError 含む）を捕捉し、
 * 再読み込みで復旧できるようにする。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkLoadError =
    error?.name === "ChunkLoadError" ||
    (typeof error?.message === "string" &&
      (error.message.includes("Loading chunk") || error.message.includes("ChunkLoadError")));

  return (
    <html lang="ja">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            {isChunkLoadError ? "読み込みに失敗しました" : "エラーが発生しました"}
          </h1>
          <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
            {isChunkLoadError
              ? "ネットワークの遅延やタイムアウトの可能性があります。下のボタンで再読み込みしてください。"
              : "予期しないエラーが発生しました。再読み込みをお試しください。"}
          </p>
          <button
            type="button"
            onClick={() => {
              if (isChunkLoadError) {
                window.location.reload();
              } else {
                reset();
              }
            }}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            再読み込み
          </button>
        </div>
      </body>
    </html>
  );
}
