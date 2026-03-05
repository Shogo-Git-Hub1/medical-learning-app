# 医療系学習アプリ — 実装計画

## 方針の整理

| 項目 | 決定内容 |
|------|----------|
| **プラットフォーム** | まず Web アプリ → 将来 iOS |
| **コンテンツ** | 資格・試験対策 + 科目別（解剖学・生理学など） |
| **継続施策** | ストリーク / デイリーミッション / レベル・XP / ロードマップ / 間隔反復 |

---

## 技術スタック（案）

- **フレームワーク**: Next.js (App Router) + TypeScript
- **スタイル**: Tailwind CSS（Duolingo風のカラフルで明るいUI）
- **状態・永続化**: まずは localStorage + 構造だけ用意し、後からバックエンド（Supabase / Firebase など）に差し替え可能に
- **将来の iOS**: PWA または Capacitor で Web をラップして配布を想定

---

## 機能と実装フェーズ

### Phase 1: 土台（まずここから）
- プロジェクト作成・ルーティング
- 共通レイアウト（ヘッダー、ナビ）
- ダミーの「レッスン一覧」と「1レッスン＝数問」の流れ
- サンプル問題（選択式）の表示と正誤判定

### Phase 2: 継続率アップの5要素 ✅
1. **ストリーク** — 最終学習日を localStorage に保存し、連続日数をホームに表示
2. **デイリーミッション** — デフォルト「今日は5問」、達成数/目標をホームに表示
3. **レベル・XP** — 正解で +10 XP、100 XP ごとにレベルアップ、ホームに表示
4. **レッスンロードマップ** — 完了したレッスンに ✓、前レッスン完了で次をアンロック
5. **間隔反復** — 問題ごとに次復習日を SM-2 風（1→2→4→…日）で記録し、レッスン開始時に「今日復習すべき問題」を先頭に混ぜて出題

### Phase 3: コンテンツ・拡張 ✅
- **科目・試験タグでフィルタ** — ブラウズページで科目・試験タグのチップを選択してレッスン一覧を絞り込み
- **問題データの追加・管理** — `src/data/db.ts` と `src/data/tags.ts`、`docs/DATA_FORMAT.md` で形式を明文化
- 必要に応じてバックエンド・認証の導入（将来）

### PWA 対応 ✅
- **マニフェスト** — `app/manifest.ts` で name / start_url / display: standalone / theme_color / icons
- **メタ情報** — viewport（themeColor, viewportFit: cover）、appleWebApp（capable, title）
- **アイコン** — `public/icon-192.png`, `public/icon-512.png` でホーム画面追加用

### Capacitor（iOS ネイティブビルド）✅
- **静的エクスポート** — `next.config` の `output: "export"` でビルドを `out/` に出力
- **Capacitor 設定** — `capacitor.config.ts` で appId `app.medicallearning.web`、webDir `out`
- **iOS プラットフォーム** — `ios/` に Xcode プロジェクトを追加済み
- **コマンド** — `npm run ios` でビルド → Web をコピー → Xcode を起動

### 将来
- App Store 申請用の証明書・プロビジョニング、バックエンド・認証

---

## 次のステップ

1. このリポジトリで Next.js プロジェクトを初期化する
2. Phase 1 の画面とデータ構造を実装する
3. 続けて Phase 2 の5要素を1つずつ実装する

この PLAN をベースに、まずは Phase 1 のコードから進めます。
