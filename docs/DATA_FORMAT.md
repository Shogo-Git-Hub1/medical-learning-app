# 問題・レッスンデータの形式

コンテンツは **分野ごとにファイル分け** して管理します。集約は `src/data/db.ts`、タグ定数は `src/data/tags.ts` にあります。

---

## 分野ごとの管理

- **配置**: `src/data/subjects/` の下に分野ごとにファイルを置く。
  - 例: `anatomy.ts`（解剖学）, `physiology.ts`（生理学）, `pharmacology.ts`（薬理学）, `pathology.ts`（病理学）
- **各ファイルで export**: その分野の `questions` と `lessons` を export する。
- **集約**: `src/data/subjects/index.ts` で全分野を import し、`src/data/db.ts` で `questionDb` に結合する。
- **表示順**: `subjects/index.ts` の `SUBJECT_DISPLAY_ORDER` がロードマップの分野の並び順。分野内のレッスンは `orderInSubject` の昇順（難易度の連なり）。

---

## 問題 (Question)

| 項目 | 型 | 必須 | 説明 |
|------|-----|------|------|
| `id` | string | ○ | 一意のID（例: `q-anatomy-1`） |
| `lessonId` | string | ○ | 所属レッスンのID（分野付きID 例: `anatomy-1`） |
| `text` | string | ○ | 問題文 |
| `options` | `{ id: string, text: string }[]` | ○ | 選択肢（通常4つ） |
| `correctOptionId` | string | ○ | 正解の選択肢の `id` |
| `explanation` | string | - | 解説（任意） |
| `subject` | string | - | 科目（`tags.ts` の `SUBJECTS` を推奨） |
| `examTag` | string | - | 試験タグ（任意） |
| `order` | number | ○ | レッスン内の表示順 |

---

## レッスン (Lesson)

| 項目 | 型 | 必須 | 説明 |
|------|-----|------|------|
| `id` | string | ○ | 一意のID（**分野付き** 例: `anatomy-1`, `physiology-1`） |
| `title` | string | ○ | タイトル |
| `questionIds` | string[] | ○ | 含める問題のIDの並び |
| `subject` | string | - | 科目（ロードマップの分野表示・フィルタに使用） |
| `examTag` | string | - | 試験タグ（任意） |
| `order` | number | ○ | 全体の並び順（集約時のソート用） |
| `orderInSubject` | number | ○ | **同一分野内での並び順**（1, 2, 3… で難易度の連なり。この順でアンロック） |

---

## 追加手順

### 既存分野にレッスン・問題を足す場合

1. 該当する `src/data/subjects/<分野>.ts` を開く。
2. `questions` に問題オブジェクトを追加（`lessonId` は新レッスンID 例: `anatomy-3`）。
3. `lessons` にレッスンを追加。`orderInSubject` を「その分野の最後のレッスン + 1」にする（難易度順）。
4. `src/data/subjects/index.ts` は変更不要（既存の import のまま）。

### 新規分野を増やす場合

1. `src/data/subjects/<新分野>.ts` を新規作成し、`questions` と `lessons` を export。
2. `src/data/subjects/index.ts` に import を追加し、`allQuestions` / `allLessons` と `SUBJECT_DISPLAY_ORDER` に追加。
3. レッスンIDは `<分野名>-1`, `<分野名>-2` のように一意にすること。

### タグの追加

- 科目・試験タグを増やす場合は `src/data/tags.ts` の `SUBJECTS` / `EXAM_TAGS` に追加（任意）。フィルタには「実際にレッスンで使われている」ものだけが表示されます。

---

## タグ定数 (tags.ts)

- **SUBJECTS**: 解剖学, 生理学, 薬理学, 病理学, 微生物学, 公衆衛生
- **EXAM_TAGS**: 医師国家試験, 看護師国家試験, 薬剤師国家試験, 歯科医師国家試験
