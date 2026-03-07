"use client";

import { useState, useEffect } from "react";
import type { CharacterId, CharacterLineKey } from "@/types/characters";
import { getCharacterLine, CHARACTER_PROFILES } from "@/data/characters";
import { CharacterAvatar, type CharacterAnimation } from "@/components/CharacterAvatar";

type Props = {
  characterId: CharacterId;
  lineKey: CharacterLineKey;
  replacements?: { correct?: string; explanation?: string };
  variant?: "default" | "correct" | "wrong";
  size?: "sm" | "md" | "lg";
  animation?: CharacterAnimation;
  className?: string;
};

/** variant ごとのデザイントークン */
const VARIANT_STYLES = {
  default: {
    shadow: "var(--neu-shadow-sm)",
    bg: "var(--neu-bg)",
    accent: "linear-gradient(90deg, transparent, rgba(175,175,175,0.4), transparent)",
    accentGlow: "none",
    nameColor: "text-pastel-ink/40",
  },
  correct: {
    shadow: "var(--neu-shadow-sm), 0 0 14px rgba(88,204,2,0.22)",
    bg: "rgba(232,245,224,0.65)",
    accent: "linear-gradient(90deg, transparent, rgba(88,204,2,0.65), transparent)",
    accentGlow: "0 0 8px rgba(88,204,2,0.4)",
    nameColor: "text-pastel-primary/70",
  },
  wrong: {
    shadow: "var(--neu-shadow-sm)",
    bg: "rgba(255,218,218,0.55)",
    accent: "linear-gradient(90deg, transparent, rgba(232,100,100,0.65), transparent)",
    accentGlow: "none",
    nameColor: "text-pastel-error/70",
  },
} as const;

function getDefaultAnimation(
  variant: "default" | "correct" | "wrong",
  characterId: CharacterId,
  lineKey: CharacterLineKey
): CharacterAnimation {
  if (variant === "correct" && characterId === "skurun") return "happy";
  if (variant === "wrong" && characterId === "skurun") return "sad";
  if (
    characterId === "shirin" &&
    ["lessonComplete", "lessonCompleteGood", "roadmapHint"].includes(lineKey)
  )
    return "bounce";
  if (
    variant === "default" &&
    (characterId === "skurun" || characterId === "shirin")
  )
    return "idle";
  return null;
}

export function CharacterLine({
  characterId,
  lineKey,
  replacements,
  variant = "default",
  size = "md",
  animation,
  className = "",
}: Props) {
  const profile = CHARACTER_PROFILES[characterId];
  const [line, setLine] = useState<string>("");
  const avatarAnimation =
    animation ?? getDefaultAnimation(variant, characterId, lineKey);

  useEffect(() => {
    setLine(getCharacterLine(lineKey, characterId, replacements));
  }, [lineKey, characterId, replacements]);

  if (!line) return null;

  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-3 relative overflow-hidden ${className}`}
      style={{
        background: styles.bg,
        boxShadow: styles.shadow,
      }}
      role="group"
      aria-label={`${profile.name}: ${line}`}
    >
      {/* バリアントアクセントライン */}
      <div
        className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full"
        style={{
          background: styles.accent,
          boxShadow: styles.accentGlow,
        }}
        aria-hidden
      />

      {/* キャラクターアバター（ニューモーフィズム丸枠で浮き出す） */}
      <div
        className="flex-shrink-0 rounded-full p-0.5"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "var(--neu-shadow-sm)",
        }}
      >
        <CharacterAvatar
          characterId={characterId}
          size={size}
          animation={avatarAnimation}
        />
      </div>

      {/* テキスト */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className={`text-[10px] font-mono font-bold uppercase tracking-wider ${styles.nameColor}`}>
          {profile.name}
        </p>
        <p className="mt-1 text-sm text-pastel-ink leading-relaxed">{line}</p>
      </div>
    </div>
  );
}
