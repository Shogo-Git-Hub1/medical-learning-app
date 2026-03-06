"use client";

import type { CharacterId, CharacterLineKey } from "@/types/characters";
import { getCharacterLine, CHARACTER_PROFILES } from "@/data/characters";
import { CharacterAvatar, type CharacterAnimation } from "@/components/CharacterAvatar";

type Props = {
  characterId: CharacterId;
  lineKey: CharacterLineKey;
  /** 台詞内の {correct}, {explanation} を置換する値 */
  replacements?: { correct?: string; explanation?: string };
  /** 吹き出しの見た目（デフォルト: 通常） */
  variant?: "default" | "correct" | "wrong";
  size?: "sm" | "md" | "lg";
  /** キャラのアニメーション（未指定時は variant と characterId から自動） */
  animation?: CharacterAnimation;
  className?: string;
};

const variantClasses = {
  default: "border-pastel-border bg-white",
  correct: "border-pastel-success bg-pastel-mint",
  wrong: "border-pastel-error bg-pastel-rose",
};

/**
 * キャラクターの吹き出し＋台詞。誰が話しているかと文言を表示する。
 */
/** variant / characterId / lineKey からアニメーションを決める */
function getDefaultAnimation(
  variant: "default" | "correct" | "wrong",
  characterId: CharacterId,
  lineKey: CharacterLineKey
): CharacterAnimation {
  if (variant === "correct" && characterId === "skurun") return "happy";
  if (variant === "wrong" && characterId === "skurun") return "sad";
  if (characterId === "shirin" && ["lessonComplete", "lessonCompleteGood", "roadmapHint"].includes(lineKey)) return "bounce";
  if (variant === "default" && (characterId === "skurun" || characterId === "shirin")) return "idle";
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
  const line = getCharacterLine(lineKey, characterId, replacements);
  const avatarAnimation = animation ?? getDefaultAnimation(variant, characterId, lineKey);

  if (!line) return null;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border-2 p-3 ${variantClasses[variant]} ${className}`}
      role="group"
      aria-label={`${profile.name}: ${line}`}
    >
      <CharacterAvatar characterId={characterId} size={size} animation={avatarAnimation} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-pastel-ink/70">{profile.name}</p>
        <p className="mt-0.5 text-pastel-ink leading-relaxed">{line}</p>
      </div>
    </div>
  );
}
