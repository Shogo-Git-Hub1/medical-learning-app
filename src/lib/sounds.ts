/**
 * Web Audio API による効果音ユーティリティ。
 * ファイル不要・外部依存なし。ブラウザのみ動作（SSR時は無視）。
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext!)();
  } catch {
    return null;
  }
}

/** 正解音：明るく上昇する3音 */
export function playCorrect() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523, 659, 784]; // C5 → E5 → G5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    const start = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0.25, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
    osc.start(start);
    osc.stop(start + 0.25);
  });
}

/** 不正解音：短い下降音 */
export function playWrong() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

/** レッスン完了音：明るいファンファーレ風 */
export function playComplete() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const melody = [
    { freq: 523, start: 0, dur: 0.15 },   // C5
    { freq: 659, start: 0.15, dur: 0.15 }, // E5
    { freq: 784, start: 0.3, dur: 0.15 },  // G5
    { freq: 1047, start: 0.45, dur: 0.4 }, // C6 (長め)
  ];

  melody.forEach(({ freq, start, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur);
  });
}
