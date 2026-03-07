# 「Cannot read properties of undefined (reading 'call')」の根本原因と対策

## 現象

Next.js 開発中や本番で、次のエラーが**よく**発生する:

```
TypeError: Cannot read properties of undefined (reading 'call')
```

スタックトレースは `.next/static/chunks/webpack.js` の `options.factory` や `__webpack_require__` を指す。

## 根本原因

このエラーは **Webpack がモジュールを読み込むとき、対応するチャンクの「factory 関数」が未定義**になっているときに発生する。主な要因は次のとおり。

### 1. **Service Worker が古い JS チャンクを返している（本プロジェクトの主因）**

- `public/sw.js` で `/_next/static/` を **CacheFirst** にしていた。
- デプロイで新しいビルドを出すと、HTML やメインの JS は新ビルドを取得しても、**SW のキャッシュから古いビルドのチャンクが返る**ことがある。
- 新ビルドの webpack ランタイムと古いチャンクのモジュール ID が一致せず、`__webpack_require__(moduleId)` の `moduleId` に対応する factory が存在しない → **undefined.call** で落ちる。

**対策（実施済み）:**

- `/_next/static/` を **NetworkFirst** に変更。ネットワークを優先し、オフライン時のみキャッシュを使う。
- キャッシュ名を `medical-learning-runtime-v2` に変更し、既存の古いキャッシュを切り捨て。

### 2. デプロイ後の「バージョンずれ」（スキュー）

- ユーザーが**古いビルドのタブを開いたまま**、サーバーだけ新ビルドに更新された状態で操作（ナビゲーションや Server Action など）をすると、クライアントのランタイムとサーバー／チャンクのバージョンが食い違う。
- 結果として、クライアントが参照するモジュール ID が新ビルドのチャンクに存在せず、同様のエラーになる。

**対策（実施済み）:**

- ビルド時に `public/version.json` を生成（`scripts/write-version.js`）。
- クライアントで `ServiceWorkerRegistration` が `/version.json` を取得し、前回保存したバージョンと比較。変わっていれば SW を解除してからフルリロードし、一貫したバンドルのみで動くようにする。

### 3. HMR（開発時）やキャッシュの不整合

- `npm run dev` 中に HMR で古いモジュール参照が残ったり、`.next` やブラウザキャッシュが壊れた状態になると、同じ「factory が undefined」が起こりうる。

**対策（推奨）:**

- 開発で再現する場合: `npm run dev:clean`（`.next` 削除してから `next dev`）や、ブラウザのハードリロード・「サイトのデータを削除」を試す。
- 本番と同様に SW を有効にしていた場合は、開発中は SW の登録解除や「ストレージの消去」も有効。

### 4. 循環依存や export の不備

- あるモジュールが別モジュールを import し、その時点ではまだ export が未定義（循環や評価順）だと、bundle 上で factory が undefined になることがある。
- 本プロジェクトでは `lessonService` → `subjects/index` → 各科目モジュールの一本道の依存であり、現時点で循環は確認していない。必要なら `madge` 等で循環を検証するとよい。

## 実施した変更まとめ

| 対象 | 内容 |
|------|------|
| `public/sw.js` | `/_next/static/` を CacheFirst → **NetworkFirst** に変更。コメントで理由を明記。 |
| `scripts/write-version.js` | ビルド時に `public/version.json` を生成。 |
| `package.json` | `build` で `node scripts/write-version.js && next build` を実行。 |
| `ServiceWorkerRegistration.tsx` | バージョン不一致時に SW 解除＋リロード。チャンクエラー時に「再読み込みしますか？」と確認。 |

## 開発時によく出る場合

- `npm run dev:clean` で `.next` を消してから `next dev` をやり直す。
- ブラウザで「サイトのデータを削除」やハードリロード（Ctrl+Shift+R）を行う。
- 本番ビルドを `npm run start` で試していた場合は、Service Worker がキャッシュしている可能性が高い。SW を登録解除するか、シークレットウィンドウで開く。

`version.json` は `npm run build` 時のみ生成されるため、開発時は `/version.json` が 404 でも無視される（バージョン確認はスキップされる）。

## 参考

- [Next.js #61995](https://github.com/vercel/next.js/issues/61995) — 同様のエラー。キャッシュ・SW・バージョンスキューが原因として言及されている。
- [Next.js #78122](https://github.com/vercel/next.js/issues/78122) — デプロイ後の古いクライアントで発生する同種の事象。
