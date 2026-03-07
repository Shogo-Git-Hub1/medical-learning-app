import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Nunito, Roboto } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ProgressErrorBanner } from "@/components/ProgressErrorBanner";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "医療学習アプリ",
  description: "資格・試験対策 × 科目別で学ぶ、継続したくなる医療系学習",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "医療学習",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1a0d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const NAV_LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/subjects", label: "科目" },
  { href: "/roadmap", label: "ロードマップ" },
  { href: "/browse", label: "ブラウズ" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${nunito.variable} ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col font-roboto antialiased">
        <header
          className="sticky top-0 z-10"
          style={{
            background: "linear-gradient(135deg, #dbeeff 0%, #c8e0ff 100%)",
            boxShadow: "0 4px 12px rgba(99,140,255,0.18), 0 1px 0 rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <span
              className="text-[#2563eb] font-bold text-xl font-nunito tracking-wide"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(37,99,235,0.2)" }}
            >
              医療学習
            </span>
            {/* デスクトップのみ表示するナビ */}
            <nav className="hidden md:flex gap-0.5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[#3b5bdb]/70 hover:text-[#2563eb] text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#2563eb]/10 border border-transparent hover:border-[#2563eb]/25"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          {/* 底辺ライン */}
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99,140,255,0.5) 30%, rgba(99,140,255,0.5) 70%, transparent)",
            }}
            aria-hidden
          />
        </header>

        {/* モバイルボトムナビの高さ分だけ下にパディング */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-24 md:pb-6">
          <ServiceWorkerRegistration />
          <ProgressProvider>
            <ProgressErrorBanner />
            {children}
          </ProgressProvider>
        </main>

        {/* モバイル専用ボトムナビ */}
        <BottomNav />
      </body>
    </html>
  );
}
