# アーキテクチャ概要

## 技術スタック

| カテゴリ | 採用技術 | 用途 |
|----------|----------|------|
| フレームワーク | Next.js 15 (App Router) | ルーティング・SSG |
| 言語 | TypeScript 5 | 型安全な開発 |
| スタイル | Tailwind CSS 3 | UIスタイリング |
| モバイル | Capacitor 8 + iOS | iOSネイティブビルド |
| 配布形態 | 静的エクスポート (`output: "export"`) | Web / PWA / iOS |

## ディレクトリ構成と役割

```
medical-learning-app/
│
├ src/
│   ├ app/           # Next.js App Router のページ（ルーティング定義）
│   │   ├ layout.tsx         # 共通レイアウト（ヘッダー・ナビ）
│   │   ├ page.tsx           # ホーム（/）
│   │   ├ roadmap/page.tsx   # ロードマップ（/roadmap）
│   │   ├ browse/page.tsx    # ブラウズ（/browse）
│   │   ├ lesson/[id]/page.tsx # レッスン（/lesson/:id）
│   │   ├ contact/page.tsx   # お問い合わせ（/contact）
│   │   └ manifest.ts        # PWAマニフェスト
│   │
│   ├ components/    # UIコンポーネント（表示ロジック）
│   │   ├ HomeDashboard.tsx  # ホーム画面（ストリーク・XP・ミッション）
│   │   ├ RoadmapList.tsx    # ロードマップ一覧（分野別・アンロック制御）
│   │   ├ BrowseContent.tsx  # ブラウズ（科目・試験タグフィルタ）
│   │   ├ LessonView.tsx     # レッスン表示（間隔反復問題を先頭に混ぜる）
│   │   ├ QuizSession.tsx    # クイズUI（出題・正誤判定・解説）
│   │   └ ContactForm.tsx    # お問い合わせフォーム（mailto方式）
│   │
│   ├ hooks/         # カスタムフック（状態管理）
│   │   └ useProgress.ts     # 進捗・XP・ストリーク・間隔反復の状態管理
│   │
│   ├ services/      # データアクセス層（将来はSupabase等に差し替え）
│   │   ├ lessonService.ts   # レッスン・問題のクエリ関数
│   │   └ subjects/          # 分野別コンテンツデータ
│   │       ├ anatomy.ts     # 解剖学
│   │       ├ physiology.ts  # 生理学
│   │       ├ pharmacology.ts # 薬理学
│   │       ├ pathology.ts   # 病理学
│   │       └ index.ts       # 全分野の集約・表示順定義
│   │
│   ├ lib/           # ユーティリティ（純粋関数・ロジック）
│   │   └ progress.ts        # localStorage CRUD・XP計算・ストリーク計算
│   │
│   └ types/         # TypeScript型定義
│       ├ index.ts   # Question, Lesson, QuestionDatabase
│       └ tags.ts    # SUBJECTS, EXAM_TAGS 定数
│
├ docs/              # 設計ドキュメント（本ディレクトリ）
├ ai_context/        # AI向けコンテキスト情報
├ ios/               # Capacitor iOSプロジェクト（Xcodeプロジェクト）
├ public/            # 静的アセット（アイコン等）
├ tests/             # テストコード
└ scripts/           # ビルド・運用スクリプト
```

## データフロー

```
services/subjects/*.ts  ← コンテンツデータ（問題・レッスン）
        ↓
services/lessonService.ts  ← クエリ関数（フィルタ・ソート・検索）
        ↓
app/*/page.tsx (Server Component)  ← ページ単位でデータを取得
        ↓
components/*.tsx (Client Component)  ← UIレンダリング・インタラクション
        ↓
hooks/useProgress.ts  ← 進捗状態の読み書き
        ↓
lib/progress.ts → localStorage  ← データ永続化
```

## ルーティング構造

| URL | ファイル | 説明 |
|-----|----------|------|
| `/` | `src/app/page.tsx` | ホームダッシュボード |
| `/roadmap` | `src/app/roadmap/page.tsx` | 分野別レッスン一覧 |
| `/browse` | `src/app/browse/page.tsx` | フィルタ付きレッスン一覧 |
| `/lesson/[id]` | `src/app/lesson/[id]/page.tsx` | クイズセッション |
| `/contact` | `src/app/contact/page.tsx` | お問い合わせ・問題報告 |

## ビルドモード

- **Web / PWA**: `npm run build` → `out/` に静的HTML生成
- **iOS**: `npm run ios` → ビルド → Capacitorコピー → Xcode起動
- **開発**: `npm run dev` → localhost:3000 でホットリロード

## 進捗の永続化

現在は `localStorage` のみ使用。キー: `medical-learning-progress`。

将来の移行パス: `lib/progress.ts` の `loadProgress` / `saveProgress` を Supabase クライアント呼び出しに差し替えるだけで移行可能な設計になっている。
