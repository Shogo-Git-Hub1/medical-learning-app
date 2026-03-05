import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-slate-300 mb-2">404</h1>
      <p className="text-slate-600 mb-6">お探しのページが見つかりませんでした。</p>
      <Link
        href="/"
        className="rounded-xl bg-primary text-white font-semibold py-3 px-6 shadow-md hover:bg-primary-dark transition"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
