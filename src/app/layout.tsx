import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Nunito, Roboto } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
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
  title: "MediSpark",
  description: "医学の学習に火をつける。科目別で学ぶ、継続したくなる医療系学習アプリ",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MediSpark",
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
      <body className="font-roboto antialiased">
        {/* デスクトップ左サイドバー (md+) */}
        <DesktopSidebar />

        {/* コンテンツラッパー — デスクトップではサイドバー分だけオフセット */}
        <div className="md:ml-[240px] flex flex-col min-h-screen">
          {/* モバイル専用トップヘッダー */}
          <header
            className="md:hidden sticky top-0 z-10"
            style={{
              background: "linear-gradient(135deg, #dbeeff 0%, #c8e0ff 100%)",
              boxShadow: "0 4px 12px rgba(99,140,255,0.18), 0 1px 0 rgba(255,255,255,0.9), inset 0 1px 0 rgba(255,255,255,0.85)",
            }}
          >
            <div className="px-4 py-3 flex items-center">
              <Link href="/" className="flex items-center gap-2 select-none" aria-label="MediSpark ホーム">
                <MobileSparkIcon />
                <span
                  className="text-[#58cc02] font-bold text-xl font-nunito"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}
                >
                  MediSpark
                </span>
              </Link>
            </div>
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,140,255,0.5) 30%, rgba(99,140,255,0.5) 70%, transparent)",
              }}
              aria-hidden
            />
          </header>

          {/* メインコンテンツ */}
          <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-24 md:pb-8">
            <ServiceWorkerRegistration />
            <ProgressProvider>
              <ProgressErrorBanner />
              {children}
            </ProgressProvider>
          </main>
        </div>

        {/* モバイル専用ボトムナビ */}
        <BottomNav />
      </body>
    </html>
  );
}

function MobileSparkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L4.5 13.5H11.5L10.5 22L19.5 10.5H12.5L13 2Z"
        fill="#58cc02"
        stroke="#46a302"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
