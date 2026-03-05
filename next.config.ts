import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Capacitor で iOS ビルドするために静的エクスポート */
  output: "export",
};

export default nextConfig;
