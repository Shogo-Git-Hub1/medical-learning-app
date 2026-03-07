import { SubjectGrid } from "@/components/SubjectGrid";

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-pastel-ink">科目を選ぶ</h1>
        <p className="text-sm text-pastel-ink/70 mt-1">学びたい科目をタップしてください</p>
      </div>
      <SubjectGrid />
    </div>
  );
}
