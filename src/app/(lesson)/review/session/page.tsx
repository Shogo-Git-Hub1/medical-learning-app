import { Suspense } from "react";
import { ReviewContent } from "@/components/ReviewContent";

export default function ReviewSessionPage() {
  return (
    <Suspense>
      <ReviewContent />
    </Suspense>
  );
}
