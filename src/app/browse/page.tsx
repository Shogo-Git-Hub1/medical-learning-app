import { BrowseContent } from "@/components/BrowseContent";

export default function BrowsePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">ブラウズ</h1>
      <p className="text-slate-600">
        科目や試験タグで絞り込んでレッスンを選べます。
      </p>
      <BrowseContent />
    </div>
  );
}
