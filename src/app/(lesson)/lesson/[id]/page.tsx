import { Suspense } from "react";
import { getLessonWithQuestions, getAllLessons } from "@/services/lessonService";
import { LessonView } from "@/components/LessonView";
import { LessonBackButton } from "@/components/LessonBackButton";
import { NotFoundCard } from "@/components/ui/NotFoundCard";

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
      <NotFoundCard title="レッスンが見つかりません" subLabel="// 404 NOT FOUND">
        <Suspense>
          <LessonBackButton />
        </Suspense>
      </NotFoundCard>
    );
  }

  const { lesson, questions } = data;

  return (
    <Suspense>
      <LessonView lesson={lesson} questions={questions} />
    </Suspense>
  );
}
