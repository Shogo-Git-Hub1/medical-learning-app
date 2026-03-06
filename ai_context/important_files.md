# 重要ファイル一覧（AI向けコンテキスト）

新機能追加・バグ修正・コンテンツ追加の際に参照すべきファイル。

---

## コンテンツ追加時

| ファイル | 役割 |
|----------|------|
| `src/services/subjects/anatomy.ts` | 解剖学の問題・レッスンデータ |
| `src/services/subjects/physiology.ts` | 生理学の問題・レッスンデータ |
| `src/services/subjects/pharmacology.ts` | 薬理学の問題・レッスンデータ |
| `src/services/subjects/pathology.ts` | 病理学の問題・レッスンデータ |
| `src/services/subjects/index.ts` | 全分野の集約・表示順（新分野追加時に編集） |
| `src/types/tags.ts` | 科目・試験タグ定数（タグ追加時に編集） |
| `docs/database.md` | コンテンツ追加の手順書 |

---

## UIコンポーネント修正時

| ファイル | 役割 |
|----------|------|
| `docs/DESIGN.md` | **デザインガイド**（6色・Nunito/Roboto・押し込みボタン方針） |
| `src/components/ui/PushButton.tsx` | 押し込み式ボタン（primary / outline / chip / option 等） |
| `src/components/QuizSession.tsx` | クイズの出題・正誤判定・解説・結果表示UI |
| `src/components/LessonView.tsx` | 間隔反復問題の混在ロジック + QuizSessionの起動 |
| `src/components/HomeDashboard.tsx` | ホーム画面（ストリーク・ミッション・XPカード） |
| `src/components/RoadmapList.tsx` | ロードマップ一覧（分野別・アンロック表示） |
| `src/components/BrowseContent.tsx` | ブラウズ画面（フィルタチップ・レッスン一覧） |
| `src/components/ContactForm.tsx` | お問い合わせ・問題報告フォーム |
| `src/app/globals.css` | グローバルCSSとTailwindのベーススタイル |
| `tailwind.config.ts` | Tailwindのカラーテーマ（`primary`など）の定義 |

---

## ルーティング・ページ修正時

| ファイル | 役割 |
|----------|------|
| `src/app/layout.tsx` | 共通レイアウト（ヘッダー・ナビゲーション） |
| `src/app/page.tsx` | ホームページ（`/`） |
| `src/app/roadmap/page.tsx` | ロードマップページ（`/roadmap`） |
| `src/app/browse/page.tsx` | ブラウズページ（`/browse`） |
| `src/app/lesson/[id]/page.tsx` | レッスンページ（`/lesson/:id`）・`generateStaticParams` 定義 |
| `src/app/contact/page.tsx` | お問い合わせページ（`/contact`） |
| `src/app/manifest.ts` | PWAマニフェスト |

---

## 進捗・ゲーミフィケーション修正時

| ファイル | 役割 |
|----------|------|
| `src/hooks/useProgress.ts` | 進捗の状態管理フック（コンポーネントからはここを使う） |
| `src/lib/progress.ts` | localStorage CRUD・XP計算・ストリーク計算・間隔反復ロジック |

---

## サービス層修正時

| ファイル | 役割 |
|----------|------|
| `src/services/lessonService.ts` | レッスン・問題のクエリ関数（将来DB移行時に変更するファイル） |

---

## 設定ファイル

| ファイル | 役割 |
|----------|------|
| `next.config.ts` | Next.js設定（`output: "export"` でCapacitor対応） |
| `capacitor.config.ts` | Capacitor設定（appId, webDir） |
| `tsconfig.json` | TypeScript設定（`@/` エイリアス定義） |
| `tailwind.config.ts` | Tailwindカスタムテーマ |
| `package.json` | スクリプト定義（`dev`, `build`, `ios`） |
