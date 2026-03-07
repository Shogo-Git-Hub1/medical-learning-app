/**
 * Service Worker: オフライン対応のためのキャッシュ
 *
 * 重要: _next/static は NetworkFirst にすること。
 * CacheFirst にするとデプロイ後に「古いビルドのチャンク」が返り、
 * 新ビルドの webpack ランタイムと不整合して
 * "Cannot read properties of undefined (reading 'call')" が発生する。
 * オフライン時のみキャッシュにフォールバックする。
 */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

workbox.setConfig({ debug: false });

const OFFLINE_FALLBACK = "/offline.html";
const CACHE_NAME_RUNTIME = "medical-learning-runtime-v2";

// オフライン用フォールバックページをプリキャッシュ
workbox.precaching.precacheAndRoute([{ url: OFFLINE_FALLBACK, revision: null }]);

// ナビゲーション（HTML）: ネットワーク優先 → キャッシュ → オフライン表示
workbox.routing.registerRoute(
  ({ request }) => request.mode === "navigate",
  async ({ event }) => {
    try {
      const networkResponse = await fetch(event.request);
      const cache = await caches.open(CACHE_NAME_RUNTIME);
      cache.put(event.request, networkResponse.clone());
      return networkResponse;
    } catch {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return caches.match(OFFLINE_FALLBACK);
    }
  }
);

// _next/static: ネットワーク優先。デプロイ後の古いチャンク混在を防ぐためキャッシュはオフライン時のみ使用
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/_next/static/"),
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE_NAME_RUNTIME,
    networkTimeoutSeconds: 5,
  })
);

// 同一オリジンのその他（manifest, icon など）: 再検証付きキャッシュ
workbox.routing.registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith("/"),
  new workbox.strategies.StaleWhileRevalidate({ cacheName: CACHE_NAME_RUNTIME })
);
