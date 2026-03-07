import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <div className="neu-inset rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[40vh]">
        <span className="text-5xl" aria-hidden>🚧</span>
        <h1 className="text-xl font-bold font-nunito text-pastel-ink/70">プロフィール</h1>
        <p className="text-sm text-pastel-ink/40">準備中です</p>
      </div>

      <Link
        href="/contact"
        className="flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-150 active:scale-[0.97]"
        style={{
          background: "var(--neu-bg)",
          boxShadow: "0 4px 0 rgba(0,0,0,0.10), var(--neu-shadow)",
          border: "1.5px solid rgba(0,0,0,0.07)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl select-none" aria-hidden>✉️</span>
          <span className="text-sm font-bold font-nunito text-pastel-ink">お問い合わせ</span>
        </div>
        <span className="text-pastel-ink/30 text-xl" aria-hidden>›</span>
      </Link>
    </div>
  );
}
