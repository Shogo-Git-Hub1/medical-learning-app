import Link from "next/link";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { ProgressErrorBanner } from "@/components/ProgressErrorBanner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DesktopSidebar />

      {/* コンテンツラッパー — デスクトップではサイドバー分だけオフセット */}
      <div className="md:ml-[240px] flex flex-col min-h-screen">
        {/* モバイル専用トップヘッダー */}
        <header
          className="md:hidden sticky top-0 z-10"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 4px 12px rgba(197,202,209,0.45), 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div className="px-4 py-3 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 select-none"
              aria-label="MediSpark ホーム"
            >
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
                "linear-gradient(90deg, transparent, rgba(88,204,2,0.45) 30%, rgba(88,204,2,0.45) 70%, transparent)",
            }}
            aria-hidden
          />
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 pb-24 md:pb-8">
          <ProgressErrorBanner />
          {children}
        </main>
      </div>

      {/* モバイル専用ボトムナビ */}
      <BottomNav />
    </>
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
