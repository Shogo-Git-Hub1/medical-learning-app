"use client";

import Image from "next/image";
import type { CharacterId } from "@/types/characters";
import {
  CHARACTER_PROFILES,
  CHARACTER_ORDER,
  NAVIGATORS_IMAGE_PATH,
} from "@/data/characters";

/** キャラクターの表情・動き（スカルン＝震え/喜び、シリン＝弾む など） */
export type CharacterAnimation = "idle" | "happy" | "sad" | "bounce" | null;

type Props = {
  characterId: CharacterId;
  /** ユーザーレベル（将来のステージ別画像用。現状は未使用） */
  userLevel?: number;
  size?: "sm" | "md" | "lg";
  /** アニメーション（idle=浮遊, happy=喜び, sad=震え） */
  animation?: CharacterAnimation;
  className?: string;
};

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

/**
 * 1体のキャラクターを表示。
 * 3人並び画像から該当キャラの部分を切り出して表示する。
 */
const animationClasses: Record<NonNullable<CharacterAnimation>, string> = {
  idle: "animate-character-idle-float",
  happy: "animate-character-skurun-happy",
  sad: "animate-character-skurun-shake",
  bounce: "animate-character-shirin-bounce",
};

export function CharacterAvatar({
  characterId,
  size = "md",
  animation = null,
  className = "",
}: Props) {
  const profile = CHARACTER_PROFILES[characterId];
  const index = CHARACTER_ORDER.indexOf(characterId);
  const marginLeftPercent = index * 100;
  const animationClass = animation ? animationClasses[animation] : "";

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-pastel-slate flex-shrink-0 ${sizeClasses[size]} ${animationClass} ${className}`}
      title={profile.name}
      aria-label={profile.name}
    >
      {/* スプライト用: 1画像を横3等分し、該当キャラの部分だけ見せる */}
      <div
        className="relative h-full w-[300%]"
        style={{ marginLeft: `-${marginLeftPercent}%` }}
      >
        <Image
          src={NAVIGATORS_IMAGE_PATH}
          alt=""
          role="presentation"
          fill
          className="object-cover object-top"
          unoptimized
          sizes="192px"
        />
      </div>
    </div>
  );
}

/**
 * 3人並びの画像をそのまま表示（ホーム用など）。ゆっくり浮遊する待機アニメ付き。
 */
export function NavigatorsImage({
  className = "",
  alt = "スカルン、レジ先生、シリンちゃん",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <div className={`relative w-full aspect-[3/1] max-h-32 animate-character-idle-float ${className}`}>
      <Image
        src={NAVIGATORS_IMAGE_PATH}
        alt={alt}
        fill
        className="object-contain object-center"
        unoptimized
      />
    </div>
  );
}
