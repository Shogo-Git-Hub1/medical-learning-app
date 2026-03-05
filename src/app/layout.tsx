import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

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
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <header className="bg-primary shadow-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-white font-bold text-lg">医療学習</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-white/90 hover:text-white text-sm">ホーム</Link>
              <Link href="/roadmap" className="text-white/90 hover:text-white text-sm">ロードマップ</Link>
              <Link href="/browse" className="text-white/90 hover:text-white text-sm">ブラウズ</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
