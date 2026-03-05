# 問題・レッスンデータの形式

コンテンツを追加・管理するときの参照用です。実データは `src/data/db.ts`、タグ定数は `src/data/tags.ts` にあります。

## 問題 (Question)

| 項目 | 型 | 必須 | 説明 |
|------|-----|------|------|
| `id` | string | ○ | 一意のID（例: `q-anatomy-1`） |
| `lessonId` | string | ○ | 所属レッスンのID |
| `text` | string | ○ | 問題文 |
| `options` | `{ id: string, text: string }[]` | ○ | 選択肢（通常4つ） |
| `correctOptionId` | string | ○ | 正解の選択肢の `id` |
| `explanation` | string | - | 解説（任意） |
| `subject` | string | - | 科目（`tags.ts` の `SUBJECTS` を推奨） |
| `examTag` | string | - | 試験タグ（`tags.ts` の `EXAM_TAGS` を推奨） |
| `order` | number | ○ | レッスン内の表示順 |

## レッスン (Lesson)

| 項目 | 型 | 必須 | 説明 |
|------|-----|------|------|
| `id` | string | ○ | 一意のID（例: `1`, `2`） |
| `title` | string | ○ | タイトル |
| `questionIds` | string[] | ○ | 含める問題のIDの並び |
| `subject` | string | - | 科目（ブラウズのフィルタで使用） |
| `examTag` | string | - | 試験タグ（ブラウズのフィルタで使用） |
| `order` | number | ○ | ロードマップ上の並び順 |

## 追加手順

1. `src/data/db.ts` の `questionDb.questions` に問題オブジェクトを追加する。
2. 新規レッスンの場合は `questionDb.lessons` にレッスンを追加し、`questionIds` で問題を紐付ける。
3. 既存レッスンに問題を足す場合は、該当レッスンの `questionIds` に新しい問題の `id` を追加する。
4. 科目・試験タグを増やす場合は `src/data/tags.ts` の `SUBJECTS` / `EXAM_TAGS` に追加する（任意）。

## タグ定数 (tags.ts)

- **SUBJECTS**: 解剖学, 生理学, 薬理学, 病理学, 微生物学, 公衆衛生
- **EXAM_TAGS**: 医師国家試験, 看護師国家試験, 薬剤師国家試験, 歯科医師国家試験

フィルタには「実際にレッスンで使われている」科目・試験タグだけが表示されます。
