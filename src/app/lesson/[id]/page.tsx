import { Suspense } from "react";
import { getLessonWithQuestions, getAllLessons } from "@/services/lessonService";
import { LessonView } from "@/components/LessonView";
import { LessonBackButton } from "@/components/LessonBackButton";

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
      <div className="space-y-6 animate-fade-in-up">
        <div className="neu-card rounded-2xl p-8 text-center relative overflow-hidden">
          <div
            className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(232,100,100,0.6), transparent)" }}
            aria-hidden
          />
          <p className="font-mono text-xs text-pastel-ink/40 mb-2">{"// 404 NOT FOUND"}</p>
          <h1 className="text-lg font-bold text-pastel-ink">レッスンが見つかりません</h1>
        </div>
        <Suspense>
          <LessonBackButton />
        </Suspense>
      </div>
    );
  }

  const { lesson, questions } = data;

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* ─── レッスンヘッダーカード ─────────────────────────── */}
      <div className="neu-card rounded-2xl px-5 py-4 relative overflow-hidden">
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(88,204,2,0.55), transparent)" }}
          aria-hidden
        />
        <div className="flex items-center gap-3">
          {/* useSearchParams を使うため Suspense でラップ */}
          <Suspense
            fallback={
              <div className="neu-card-sm rounded-xl px-3 py-2 w-16 h-9 flex-shrink-0" />
            }
          >
            <LessonBackButton />
          </Suspense>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-pastel-ink/35 tracking-widest uppercase mb-0.5">
              {`${lesson.subject ?? "レッスン"} // LV.${lesson.level}`}
            </p>
            <h1 className="text-base font-bold text-pastel-ink font-nunito truncate">
              {lesson.title}
            </h1>
          </div>

          {/* 問題数バッジ */}
          <div
            className="flex-shrink-0 rounded-xl px-2.5 py-1 text-[10px] font-mono font-bold text-pastel-primary"
            style={{
              background: "var(--neu-bg)",
              boxShadow: "var(--neu-shadow-sm), 0 0 8px rgba(88,204,2,0.2)",
            }}
          >
            {questions.length}問
          </div>
        </div>
      </div>

      {/* ─── クイズ本体 ─────────────────────────────────────── */}
      <LessonView lesson={lesson} questions={questions} />
    </div>
  );
}
