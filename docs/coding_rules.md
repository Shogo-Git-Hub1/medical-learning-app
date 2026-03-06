# コーディング規約

---

## ファイル・ディレクトリ命名

| 対象 | 規則 | 例 |
|------|------|-----|
| コンポーネントファイル | PascalCase | `HomeDashboard.tsx`, `QuizSession.tsx` |
| フックファイル | camelCase（`use`プレフィックス） | `useProgress.ts` |
| サービスファイル | camelCase（`Service`サフィックス） | `lessonService.ts` |
| 型定義ファイル | camelCase | `index.ts`, `tags.ts` |
| コンテンツデータファイル | camelCase（分野名） | `anatomy.ts`, `physiology.ts` |
| ページディレクトリ | kebab-case（Next.js規約） | `lesson/[id]/`, `roadmap/` |

---

## TypeScript

- `any` は使用禁止。型が不明な場合は `unknown` を使用する
- コンポーネントのPropsは `type Props = { ... }` で定義する
- 型のみのインポートは `import type` を使用する
- 型定義はすべて `src/types/` に置く。コンポーネント内にローカルな型を定義しない（小さなユーティリティ型を除く）

---

## コンポーネント設計

- コンポーネントは `export function ComponentName()` で名前付きエクスポートする（`export default` は使わない。ただし `app/*/page.tsx` は Next.js の要件により `export default` を使用）
- `"use client"` ディレクティブはインタラクション（`useState`, `useEffect`, ブラウザAPI）が必要なファイルにのみ付ける
- Propsは1つの `Props` 型にまとめる
- コンポーネント内のサブコンポーネントは同ファイル内に書いてよい（小さな場合）

---

## インポートパス

- `src/` 配下は `@/` エイリアスを使用する（`tsconfig.json` で設定済み）
- 相対インポートは同一ディレクトリ内のみ許可

```ts
// 良い例
import { getLessonsFiltered } from "@/services/lessonService";
import type { Lesson } from "@/types";
import { useProgress } from "@/hooks/useProgress";

// 悪い例
import { getLessonsFiltered } from "../../services/lessonService";
```

---

## コンテンツデータ（問題・レッスン）

- 問題ID: `q-<分野短縮>-<連番>`（例: `q-anatomy-1`, `q-pharma-2`）
- レッスンID: `<分野>-<連番>`（例: `anatomy-1`, `physiology-2`）
- `orderInSubject` は分野内で1始まりの連番。難易度が低い順に割り当てる
- 選択肢IDは `a`, `b`, `c`, `d` の固定文字列を使用する
- `explanation` は必ず記入する（学習効果・間隔反復の品質に直結）

---

## スタイリング（Tailwind CSS）

- インラインスタイル（`style={}` 属性）は使わない
- `className` に直接 Tailwind クラスを記述する
- テーマカラーは `bg-primary`（緑系）を使用する（`tailwind.config.ts` で定義）
- カード/セクションのボーダーは `border-2` + `rounded-xl` が基本スタイル

---

## 状態管理

- グローバルな進捗状態は `useProgress` フックを通じて操作する
- `lib/progress.ts` の関数をコンポーネントから直接呼ばない（フック経由のみ）
- クライアント側の一時状態（選択肢の選択状態など）は `useState` で管理する
