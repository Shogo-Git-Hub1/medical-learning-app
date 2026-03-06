# デザインガイド

医療学習アプリの色・タイポグラフィ・UIの基準をまとめています。Duolingo を参考にしたパステルカラーと押し込み式ボタンで統一しています。

---

## カラーパレット（6色）

| 色名 | ヘックス | 用途 |
|------|----------|------|
| **Lime Green** | `#58CC02` | メイン（ヘッダー・プライマリボタン・正解） |
| **Golden Yellow** | `#FFC800` | ストリーク・ハイライト・コンボ |
| **Light Pink / Peach** | `#FFB2B2` | 不正解・エラー・ピンク系アクセント |
| **Medium Gray** | `#AFAFAF` | 枠線・補助テキスト・無効状態 |
| **Light Blue / Cyan** | `#BBF2FF` | XP・情報・青系パステル |
| **Medium Purple** | `#9069CD` | アクセント・紫系パステル |

### 補足色

- **Primary Dark**: `#46A302` — プライマリの影・ボーダー（押し込みボタンなど）
- **Pastel Ink（本文）**: `#3C3C3C` — メインテキスト
- **背景**: `#FFFFFF` — 画面全体の背景は白

### 実装場所

- **Tailwind**: `tailwind.config.ts` の `theme.extend.colors`
- **CSS変数**: `src/app/globals.css` の `:root`

---

## タイポグラフィ

| フォント | 用途 | 読み込み |
|----------|------|----------|
| **Nunito** | 見出し（h1〜h4） | `next/font/google`（`--font-nunito`） |
| **Roboto** | 本文・UIテキスト・ボタン | `next/font/google`（`--font-roboto`） |

- **body**: `font-roboto`（layout で指定）
- **見出し**: `globals.css` で `font-family: var(--font-nunito)` を指定

---

## UIコンポーネント方針

- **押し込み式ボタン**: 通常時は下方向のシャドウで浮き、押下時に `translateY` で沈み、シャドウを細くする（Duolingo風）
- **ボタンバリアント**: `primary` / `secondary` / `outline` / `chip` / `option` / `optionCorrect` / `optionWrong`
- **選択肢（クイズ）**: パステルベース（ミント・ピンク・青など）、正解は緑・不正解はピンクでフィードバック

コンポーネント実装: `src/components/ui/PushButton.tsx`

---

## 参照

- デザインのベース: Duolingo 風のパステルUI
- 色・フォントの元: デザインガイド（6色 + Nunito / Roboto）
