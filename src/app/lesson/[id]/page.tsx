import Link from "next/link";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">レッスン {id}（プレビュー）</h1>
      <p className="text-slate-600">
        ここに選択式問題が表示されます。Phase 1 で実装します。
      </p>
      <Link
        href="/roadmap"
        className="inline-block rounded-lg bg-slate-200 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-300"
      >
        ← ロードマップに戻る
      </Link>
    </div>
  );
}
