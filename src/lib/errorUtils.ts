/**
 * チャンク／Webpack 系エラーの判定を一元化。
 * ServiceWorkerRegistration の error ハンドラと global-error の両方で利用する。
 */

/**
 * メッセージがチャンク読み込み失敗や Webpack のランタイムエラーかどうかを判定する。
 * デプロイ後の古いクライアント・SW キャッシュ不整合で発生し、再読み込みで復旧できる。
 */
export function isChunkOrWebpackError(messageOrError: string | Error): boolean {
  const message =
    typeof messageOrError === "string"
      ? messageOrError
      : messageOrError?.message ?? "";
  if (typeof message !== "string" || !message) return false;

  return (
    message.includes("reading 'call')") ||
    message.includes("Loading chunk") ||
    message.includes("ChunkLoadError")
  );
}

/**
 * Error オブジェクトについて、ChunkLoadError または上記メッセージに該当するか判定する。
 * global-error の Error Boundary で使用。
 */
export function isChunkOrWebpackErrorFromError(error: Error & { name?: string }): boolean {
  if (error?.name === "ChunkLoadError") return true;
  return isChunkOrWebpackError(error);
}
