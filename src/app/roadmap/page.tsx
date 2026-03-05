import { RoadmapList } from "@/components/RoadmapList";

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">レッスンロードマップ</h1>
      <p className="text-slate-600">
        道のりに沿って学習を進めましょう。次のレッスンから始められます。
      </p>
      <RoadmapList />
    </div>
  );
}
