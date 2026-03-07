import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Nunito, Roboto } from "next/font/google";
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
          className="sticky top-0 z-10 bg-[#0d1a0d] overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(88,204,2,0.18), 0 1px 0 rgba(88,204,2,0.3)" }}
        >
          {/* スキャンライン */}
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#58cc02]/18 to-transparent pointer-events-none animate-scan-h"
            aria-hidden
          />
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span
                className="text-[#58cc02] font-bold text-xl font-nunito tracking-wide"
                style={{ textShadow: "0 0 10px rgba(88,204,2,0.85), 0 0 22px rgba(88,204,2,0.4)" }}
              >
                医療学習
              </span>
              <span className="hidden sm:block text-[#58cc02]/35 text-[10px] font-mono tracking-widest select-none">
                // MED.SYS
              </span>
            </div>
            <nav className="flex gap-0.5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white/55 hover:text-[#58cc02] text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-[#58cc02]/10 border border-transparent hover:border-[#58cc02]/30"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          {/* 底辺グローライン */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(88,204,2,0.65) 30%, rgba(88,204,2,0.65) 70%, transparent)" }}
            aria-hidden
          />
        </header>
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
