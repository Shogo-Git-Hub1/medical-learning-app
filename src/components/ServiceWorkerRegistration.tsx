"use client";

import { useEffect } from "react";
import { isChunkOrWebpackError } from "@/lib/errorUtils";

const VERSION_KEY = "medispark-build-version";
const VERSION_URL = "/version.json";

/**
 * デプロイ後のバージョン不一致を検知し、必要なら SW 解除＋リロードする。
 * キャッシュを避けるため fetch に cache: "no-store" を指定する。
 */
async function checkVersionAndReloadIfStale(): Promise<void> {
  try {
    const res = await fetch(VERSION_URL, { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as { version?: string };
    const serverVersion = data?.version;
    if (!serverVersion) return;

    const stored = sessionStorage.getItem(VERSION_KEY);
    if (stored !== null && stored !== serverVersion) {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const reg of regs) await reg.unregister();
      }
      sessionStorage.setItem(VERSION_KEY, serverVersion);
      window.location.reload();
      return;
    }
    sessionStorage.setItem(VERSION_KEY, serverVersion);
  } catch {
    // バージョンファイルが無い（dev 等）なら無視
  }
}

/**
 * Webpack のチャンク読み込み失敗（よくある原因: デプロイ後の古いクライアント）で
 * 発生する "Cannot read properties of undefined (reading 'call')" を捕捉し、
 * ユーザーに再読み込みを促す。
 */
function installChunkErrorHandler(): () => void {
  const handler = (event: ErrorEvent) => {
    const msg = event.message ?? "";
    if (!isChunkOrWebpackError(msg)) return;
    event.preventDefault();
    const reload = window.confirm(
      "表示を最新の状態に更新するため、ページを再読み込みしますか？"
    );
    if (reload) window.location.reload();
  };
  window.addEventListener("error", handler);
  return () => window.removeEventListener("error", handler);
}

/**
 * Service Worker を登録し、オフライン対応を有効にする。
 * 本番ビルド（production）かつ HTTPS / localhost の場合のみ登録する。
 * あわせてビルドバージョン確認とチャンクエラー時のリロード案内を行う。
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isLocalhost =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const isSecure = window.location.protocol === "https:" || isLocalhost;

    // バージョン確認: タブ表示時・初回にサーバーと一致するか確認
    checkVersionAndReloadIfStale();
    const onVisibility = () => {
      if (document.visibilityState === "visible") checkVersionAndReloadIfStale();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const cleanupError = installChunkErrorHandler();

    if (!("serviceWorker" in navigator) || !isSecure) {
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        cleanupError();
      };
    }

    let cancelled = false;
    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        if (cancelled) return;
        if (reg.installing) {
          console.debug("[SW] Installing");
        } else if (reg.waiting) {
          console.debug("[SW] Waiting");
        } else if (reg.active) {
          console.debug("[SW] Active");
        }
      } catch (e) {
        console.warn("[SW] Registration failed:", e);
      }
    };
    register();

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      cleanupError();
    };
  }, []);

  return null;
}
