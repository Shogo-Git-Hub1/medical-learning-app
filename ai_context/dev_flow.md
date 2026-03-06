# 開発フロー（AI向けコンテキスト）

---

## 開発サーバーの起動

```bash
npm run dev
# → http://localhost:3000
```

---

## コンテンツ追加のフロー

### 既存分野に問題・レッスンを追加する

```bash
# 1. 対象の分野ファイルを開く
# src/services/subjects/anatomy.ts (解剖学の例)

# 2. questions 配列に問題を追加
# 3. lessons 配列にレッスンを追加（orderInSubject は最後の+1）
# 4. ビルドして確認
npm run build
```

**IDの命名ルール**:
- 問題ID: `q-<分野短縮>-<連番>`（例: `q-anatomy-7`）
- レッスンID: `<分野>-<連番>`（例: `anatomy-3`）

詳細は `docs/database.md` を参照。

### 新規分野を追加する

```bash
# 1. 新しい分野ファイルを作成
# src/services/subjects/microbiology.ts

# 2. subjects/index.ts を編集して import と SUBJECT_DISPLAY_ORDER に追加

# 3. ビルドして確認
npm run build
```

---

## Webビルド

```bash
npm run build
# → out/ に静的HTMLを生成
```

`next.config.ts` で `output: "export"` が設定されているため、サーバーAPIは使用不可。

---

## iOSビルド

```bash
npm run ios
# → npm run build → npx cap sync ios → npx cap open ios
# Xcodeが起動するので、Xcodeからシミュレータまたは実機にビルドする
```

**前提**: Xcode がインストール済みであること。

---

## 型チェック

```bash
npx tsc --noEmit
# TypeScriptのエラーを確認（ビルドファイルは生成しない）
```

---

## Lint

```bash
npm run lint
# ESLint（eslint-config-next）でコードチェック
```

---

## よくある作業パターン

### 問題のコンテンツ修正
1. `src/services/subjects/<分野>.ts` を開く
2. 該当の問題を修正（`text`, `explanation`, `correctOptionId` など）
3. `npm run build` でエラーがないことを確認

### UIの文言・スタイル修正
1. `src/components/<コンポーネント>.tsx` を開く
2. 修正する
3. `npm run dev` でブラウザ確認

### 新しいページを追加する
1. `src/app/<ページ名>/page.tsx` を作成する
2. `src/app/layout.tsx` のナビゲーションにリンクを追加する
3. 静的エクスポート対象に含まれることを確認（動的ルートは `generateStaticParams` が必要）

---

## 注意事項

- **`output: "export"` 制約**: `next/headers`, `cookies()`, `redirect()` などのサーバー専用APIは使用不可
- **`"use client"` の付け忘れ**: `useState`, `useEffect`, `useProgress` を使うコンポーネントには必須
- **問題ID・レッスンIDの重複**: 全分野横断でユニークであること。重複するとデータ不整合が発生する
- **`orderInSubject` の順序**: アンロック制御に直結しているため、難易度順を維持すること
