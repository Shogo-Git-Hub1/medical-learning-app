import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { ProgressErrorBanner } from "@/components/ProgressErrorBanner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DesktopSidebar />

      {/* コンテンツラッパー — デスクトップではサイドバー分だけオフセット */}
      <div className="md:ml-[240px] flex flex-col min-h-screen">
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
