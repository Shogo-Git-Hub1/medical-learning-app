import Link from "next/link";
import { SubjectLessons } from "@/components/SubjectLessons";
import { SUBJECT_DISPLAY_ORDER } from "@/services/lessonService";

export function generateStaticParams() {
  return SUBJECT_DISPLAY_ORDER.map((subject) => ({
    subject: encodeURIComponent(subject),
  }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const decoded = decodeURIComponent(subject);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/subjects"
          className="rounded-lg bg-pastel-slate text-pastel-ink px-3 py-1.5 text-sm font-medium hover:bg-pastel-border/60 transition"
        >
          ← 科目一覧
        </Link>
        <h1 className="text-xl font-bold text-pastel-ink">{decoded}</h1>
      </div>
      <SubjectLessons subject={decoded} />
    </div>
  );
}
