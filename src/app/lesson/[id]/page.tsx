import Link from "next/link";
import { getLessonWithQuestions, getAllLessons } from "@/data/db";
import { LessonView } from "@/components/LessonView";

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ id: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getLessonWithQuestions(id);

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">レッスンが見つかりません</h1>
        <Link
          href="/roadmap"
          className="inline-block rounded-lg bg-slate-200 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-300"
        >
          ← ロードマップに戻る
        </Link>
      </div>
    );
  }

  const { lesson, questions } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/roadmap"
          className="rounded-lg bg-slate-200 text-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-300"
        >
          ← 戻る
        </Link>
        <h1 className="text-xl font-bold text-slate-800">{lesson.title}</h1>
      </div>
      <LessonView lesson={lesson} questions={questions} />
    </div>
  );
}
