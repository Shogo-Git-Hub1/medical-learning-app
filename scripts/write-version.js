/**
 * ビルド時に public/version.json を生成する。
 * デプロイ後の「古いクライアント＋新サーバー」検知に利用する。
 */
const fs = require("fs");
const path = require("path");

const version = process.env.BUILD_ID || Date.now().toString(36);
const dir = path.join(__dirname, "..", "public");
const file = path.join(dir, "version.json");

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, JSON.stringify({ version }) + "\n", "utf8");
console.log("[write-version] version.json written:", version);
