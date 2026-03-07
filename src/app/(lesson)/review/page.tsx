import { Suspense } from "react";
import { ReviewContent } from "@/components/ReviewContent";

export default function ReviewPage() {
  return (
    <Suspense>
      <ReviewContent />
    </Suspense>
  );
}
