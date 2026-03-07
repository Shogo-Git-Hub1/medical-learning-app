"use client";

import { useEffect } from "react";

/**
 * Service Worker を登録し、オフライン対応を有効にする。
 * 本番ビルド（production）かつ HTTPS / localhost の場合のみ登録する。
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const isSecure = window.location.protocol === "https:" || isLocalhost;
    if (!isSecure) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
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
  }, []);

  return null;
}
