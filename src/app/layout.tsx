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
  themeColor: "#58cc02",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${nunito.variable} ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col font-roboto antialiased">
        <header className="bg-pastel-primary shadow-[0_4px_0_0_rgba(70,163,2,0.6)] sticky top-0 z-10 border-b-2 border-pastel-primary-dark">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-white font-bold text-lg drop-shadow-sm">医療学習</h1>
            <nav className="flex gap-2">
              <Link href="/" className="text-white/95 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/15 transition">ホーム</Link>
              <Link href="/roadmap" className="text-white/95 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/15 transition">ロードマップ</Link>
              <Link href="/browse" className="text-white/95 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/15 transition">ブラウズ</Link>
              <Link href="/contact" className="text-white/95 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/15 transition">お問い合わせ</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
