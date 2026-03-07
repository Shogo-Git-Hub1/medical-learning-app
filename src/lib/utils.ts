/**
 * 文字列から 0 〜 (length-1) の決定的なインデックスを返す。
 * SSR/クライアントで同じ結果にし、ハイドレーション不一致を防ぐ用途（例: lessonId からキャラ選択）。
 */
export function getStableCharacterIndex(lessonId: string, length: number): number {
  let h = 0;
  for (let i = 0; i < lessonId.length; i++) {
    h = (h * 31 + lessonId.charCodeAt(i)) >>> 0;
  }
  return h % length;
}

/**
 * Fisher–Yates シャッフル。配列のコピーをランダムに並び替えて返す。
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
