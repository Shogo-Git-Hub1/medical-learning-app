/**
 * Service Worker: オフライン対応のためのキャッシュ
 * 静的エクスポート（out/）配信時、主要ルートと静的アセットをキャッシュし、
 * オフライン時は offline フォールバックを表示する。
 */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js"
);

workbox.setConfig({ debug: false });

const OFFLINE_FALLBACK = "/offline.html";
const CACHE_NAME_RUNTIME = "medical-learning-runtime-v1";

// オフライン用フォールバックページをプリキャッシュ
workbox.precaching.precacheAndRoute([{ url: OFFLINE_FALLBACK, revision: null }]);

// ナビゲーション（HTML ドキュメント）: ネットワーク優先 → キャッシュ → オフライン表示
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

// _next/static: キャッシュ優先（ハッシュ付きなので長期キャッシュ可）
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/_next/static/"),
  new workbox.strategies.CacheFirst({ cacheName: CACHE_NAME_RUNTIME })
);

// 同一オリジンのその他（manifest, icon など）: キャッシュありで再検証
workbox.routing.registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.startsWith("/"),
  new workbox.strategies.StaleWhileRevalidate({ cacheName: CACHE_NAME_RUNTIME })
);
