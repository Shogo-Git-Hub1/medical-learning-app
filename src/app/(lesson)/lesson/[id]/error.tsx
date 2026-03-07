"use client";

import { RouteErrorFallback } from "@/components/RouteErrorFallback";
import { ROUTE_ERROR_CONFIG } from "@/config/routeErrorConfig";

export default function LessonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const config = ROUTE_ERROR_CONFIG.lesson;
  return <RouteErrorFallback {...config} error={error} onReset={reset} />;
}
