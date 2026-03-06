# サービス・フック API リファレンス

---

## lessonService (`src/services/lessonService.ts`)

レッスン・問題のクエリ関数。現在はメモリ上のデータを参照しているが、将来のDB移行時はこのファイルの実装のみ変更する。

### 関数一覧

#### `getQuestionsById(ids: string[]): Question[]`
指定IDの問題を取得し、`order` 順にソートして返す。

#### `getLessonWithQuestions(lessonId: string): { lesson: Lesson, questions: Question[] } | null`
レッスンIDからレッスンとその問題一覧を取得する。存在しない場合は `null`。

#### `getAllLessons(): Lesson[]`
全レッスンを `SUBJECT_DISPLAY_ORDER` の分野順・分野内 `orderInSubject` 順で返す。

#### `getLessonsGroupedBySubject(): Record<string, Lesson[]>`
分野名をキーに、分野内レッスンの配列を返す。ロードマップとブラウズページで使用。

#### `getLessonsBySubject(subject: string | null): Lesson[]`
科目でフィルタ。`null` の場合は全件返す。

#### `getLessonsByExamTag(examTag: string | null): Lesson[]`
試験タグでフィルタ。`null` の場合は全件返す。

#### `getLessonsFiltered(subject: string | null, examTag: string | null): Lesson[]`
科目・試験タグの両方でフィルタ（両方 `null` なら全件）。ブラウズページで使用。

#### `getSubjectsInUse(): string[]`
レッスンデータに実際に存在する科目名の配列を返す。フィルタUIのチップ生成に使用。

#### `getExamTagsInUse(): string[]`
レッスンデータに実際に存在する試験タグの配列を返す。

#### `SUBJECT_DISPLAY_ORDER`
ロードマップの分野表示順の定数。`subjects/index.ts` から再エクスポートされる。

---

## useProgress (`src/hooks/useProgress.ts`)

ユーザー進捗の状態管理フック。localStorage の読み書きをラップし、React の状態として提供する。

### 戻り値

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `progress` | `UserProgress` | 現在の進捗データ |
| `level` | `number` | 現在のレベル（`totalXP / 100 + 1`） |
| `xpInLevel` | `number` | 現レベル内の現在XP（0〜99） |
| `xpNeededForNext` | `number` | 次レベルまでの残りXP |
| `recordAnswer` | `(questionId, correct) => void` | 解答を記録（XP・ストリーク・間隔反復を更新） |
| `completeLesson` | `(lessonId) => void` | レッスン完了を記録 |
| `getDueReviewQuestionIds` | `() => string[]` | 今日復習すべき問題IDの配列を返す |
| `ensureDailyReset` | `() => void` | 日付変更時のデイリーリセット処理 |

### XPとレベルの計算

- 正解1問: +10 XP（`XP_PER_CORRECT = 10`）
- レベル = `Math.floor(totalXP / 100) + 1`
- レベル内XP = `totalXP % 100`

---

## progress (`src/lib/progress.ts`)

localStorage に直接アクセスするユーティリティ。`useProgress` フックを通じて使用するのが原則。

| 関数 | 説明 |
|------|------|
| `loadProgress()` | localStorage から進捗を読み込む（SSR時はデフォルト値を返す） |
| `saveProgress(progress)` | localStorage に進捗を保存する |
| `getToday()` | ローカル時刻の `YYYY-MM-DD` 文字列を返す |
| `getDefaultProgress()` | デフォルトの進捗データを返す |
| `xpToLevel(totalXP)` | XPからレベルを計算する |
| `xpToNextLevel(totalXP)` | レベル内のXP進捗（current / needed）を返す |

---

## 将来のDB移行方針（Supabase）

`lessonService.ts` と `lib/progress.ts` の2ファイルが移行対象。

1. **コンテンツ（問題・レッスン）**: `lessonService.ts` の各関数をSupabaseクエリに置き換える
2. **進捗データ**: `lib/progress.ts` の `loadProgress` / `saveProgress` をSupabaseの行読み書きに置き換える
3. **認証**: 移行時に Supabase Auth を導入し、ユーザーIDで進捗を紐づける

コンポーネントとフックは変更不要。
