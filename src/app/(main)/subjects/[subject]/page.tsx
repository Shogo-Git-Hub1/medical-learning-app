import { SubjectRoadmap } from "@/components/SubjectRoadmap";
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
  return <SubjectRoadmap subject={decoded} />;
}
