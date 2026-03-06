/**
 * ナビゲーターキャラクターの型定義
 * 仕様: docs/CHARACTERS.md
 */

/** キャラクターID */
export type CharacterId = "skurun" | "regi" | "shirin";

/** スカルンの進化ステージ（レベルに応じて見た目が変化） */
export type SkarunStage = "bone" | "muscle" | "nerve" | "full";

/** レジ先生・シリンちゃんの進化ステージ */
export type RegiShirinStage = "trainee" | "full";

/** キャラクターごとのステージ（ユニオン） */
export type CharacterStage = SkarunStage | RegiShirinStage;

/** 画面・状況別の台詞キー */
export type CharacterLineKey =
  | "homeGreeting"
  | "quizCorrect"
  | "quizWrong"
  | "lessonComplete"
  | "lessonCompleteGood"
  | "roadmapHint"
  | "browseRecommend"
  | "contactThanks"
  | "regiExplanation";

/** キャラクターの基本プロフィール */
export type CharacterProfile = {
  id: CharacterId;
  name: string;
  role: string;
  description: string;
};
