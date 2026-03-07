"use client";

import { CharacterAvatar } from "@/components/CharacterAvatar";
import { CardWithAccent } from "@/components/ui/CardWithAccent";
import { CHARACTER_PROFILES } from "@/data/characters";
import type { CharacterId } from "@/types/characters";

function LoadingDots() {
  return (
    <span aria-hidden>
      {[0, 0.25, 0.5].map((delay, i) => (
        <span
          key={i}
          className="inline-block animate-dot-blink"
          style={{ animationDelay: `${delay}s` }}
        >
          .
        </span>
      ))}
    </span>
  );
}

export type QuizIntroProps = {
  introCharacter: CharacterId;
  introLine: string;
  introFading: boolean;
  onSkip: () => void;
};

/**
 * クイズ開始前のイントロ画面。キャラクターの吹き出しとロード表示。
 */
export function QuizIntro({ introCharacter, introLine, introFading, onSkip }: QuizIntroProps) {
  const profile = CHARACTER_PROFILES[introCharacter];
  return (
    <div
      className="flex flex-col min-h-[55vh] animate-fade-in-up cursor-pointer"
      onClick={onSkip}
      style={{ opacity: introFading ? 0 : 1, transition: "opacity 0.3s ease" }}
      aria-label="タップでスキップ"
    >
      <div className="flex-1 flex items-center justify-center px-2 py-6">
        <CardWithAccent variant="success" container="card" className="w-full p-4 flex items-start gap-3">
          <div
            role="group"
            aria-label={`${profile.name}: ${introLine}`}
            className="flex items-start gap-3 w-full"
          >
            <div
              className="flex-shrink-0 rounded-full p-0.5"
              style={{
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-sm)",
              }}
            >
              <CharacterAvatar
                characterId={introCharacter}
                size="lg"
                animation="idle"
              />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-pastel-ink/40">
                {profile.name}
              </p>
              <p className="mt-1.5 text-sm text-pastel-ink leading-relaxed">{introLine}</p>
            </div>
          </div>
        </CardWithAccent>
      </div>

      <div className="flex flex-col items-center pb-10 gap-3">
        <p className="text-xs font-mono text-pastel-ink/35 tracking-widest">
          ロード中<LoadingDots />
        </p>
        <div
          className="rounded-full px-4 py-1.5"
          style={{
            background: "var(--neu-bg)",
            boxShadow: "var(--neu-shadow-sm)",
          }}
        >
          <p className="text-[11px] font-mono text-pastel-ink/50 tracking-wide">タップでスキップ</p>
        </div>
      </div>
    </div>
  );
}
