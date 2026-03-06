# データ設計

コンテンツは **分野ごとにファイル分け** して管理する。集約は `src/services/lessonService.ts`、タグ定数は `src/types/tags.ts`。

---

## 型定義 (`src/types/index.ts`)

### Question（問題）

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | `string` | ○ | 一意のID。命名規則: `q-<分野短縮>-<連番>`（例: `q-anatomy-1`） |
| `lessonId` | `string` | ○ | 所属レッスンのID（例: `anatomy-1`） |
| `text` | `string` | ○ | 問題文 |
| `options` | `{ id: string, text: string }[]` | ○ | 選択肢（通常4つ）。選択肢IDは `a`, `b`, `c`, `d` |
| `correctOptionId` | `string` | ○ | 正解の選択肢ID |
| `explanation` | `string` | - | 解説（推奨。間隔反復の学習効果を高める） |
| `subject` | `string` | - | 科目（`SUBJECTS` 定数を参照） |
| `examTag` | `string` | - | 試験タグ（`EXAM_TAGS` 定数を参照） |
| `order` | `number` | ○ | レッスン内の表示順（1始まり） |

### Lesson（レッスン）

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | `string` | ○ | 一意のID。命名規則: `<分野>-<連番>`（例: `anatomy-1`, `physiology-2`） |
| `title` | `string` | ○ | レッスン名（例: `解剖学 序論`） |
| `questionIds` | `string[]` | ○ | 含める問題IDの配列（表示順） |
| `subject` | `string` | - | 科目（ロードマップのセクション分けとフィルタに使用） |
| `examTag` | `string` | - | 試験タグ（フィルタに使用） |
| `order` | `number` | ○ | 全体の並び順（全分野をまたいだ並び順） |
| `orderInSubject` | `number` | ○ | **分野内の難易度順**（1, 2, 3…）。この順でアンロック制御される |

---

## タグ定数 (`src/types/tags.ts`)

```ts
SUBJECTS = ["解剖学", "生理学", "薬理学", "病理学", "微生物学", "公衆衛生"]
EXAM_TAGS = ["医師国家試験", "看護師国家試験", "薬剤師国家試験", "歯科医師国家試験"]
```

フィルタUIには「実際にレッスンで使われている」値のみ表示される（`getSubjectsInUse` / `getExamTagsInUse`）。

---

## コンテンツの管理場所

```
src/services/subjects/
  anatomy.ts      # 解剖学の問題・レッスン
  physiology.ts   # 生理学の問題・レッスン
  pharmacology.ts # 薬理学の問題・レッスン
  pathology.ts    # 病理学の問題・レッスン
  index.ts        # 全分野の集約・SUBJECT_DISPLAY_ORDER の定義
```

`SUBJECT_DISPLAY_ORDER` でロードマップの分野表示順を制御している（現在: 解剖学 → 生理学 → 薬理学 → 病理学）。

---

## コンテンツ追加手順

### 既存分野にレッスン・問題を追加する

1. `src/services/subjects/<分野>.ts` を開く
2. `questions` 配列に問題オブジェクトを追加する
   - `lessonId` は新レッスンのID（例: `anatomy-3`）
   - `id` はユニークであること（例: `q-anatomy-7`）
3. `lessons` 配列にレッスンを追加する
   - `orderInSubject` を「その分野の最後のレッスン + 1」にする
4. `src/services/subjects/index.ts` は変更不要

### 新規分野を追加する

1. `src/services/subjects/<新分野>.ts` を新規作成し、`questions` と `lessons` を export
2. `src/services/subjects/index.ts` を編集:
   - import を追加する
   - `allQuestions` / `allLessons` に展開を追加する
   - `SUBJECT_DISPLAY_ORDER` に分野名を追加する
3. レッスンIDは `<分野>-1`, `<分野>-2` のように一意にする

### タグを追加する

`src/types/tags.ts` の `SUBJECTS` / `EXAM_TAGS` に追加する（任意。フィルタUIへの即時反映のみ目的）。

---

## 進捗データ (`lib/progress.ts`)

localStorage キー: `medical-learning-progress`

```ts
type UserProgress = {
  lastStudyDate: string;       // YYYY-MM-DD
  streakDays: number;          // 連続学習日数
  dailyGoal: number;           // デイリーミッション目標問題数（デフォルト5）
  dailyAnswered: number;       // 今日解答した問題数
  dailyResetDate: string;      // 日付変更の基準日
  totalXP: number;             // 累計XP
  completedLessonIds: string[]; // 完了済みレッスンIDの配列
  questionReviews: Record<string, QuestionReview>; // 間隔反復スケジュール
};

type QuestionReview = {
  nextReview: string; // 次回復習日 YYYY-MM-DD
  interval: number;   // 現在の反復間隔（日数）
};
```

**間隔反復アルゴリズム**: SM-2準拠の簡易版。正解時は間隔を2倍（上限21日）、不正解時はリセット（1日後）。
