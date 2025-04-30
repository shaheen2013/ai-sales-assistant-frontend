import { Suspense } from "react";
import VerifyEmailPartial from "@/components/partials/verify-email-partial";

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailPartial />
    </Suspense>
  );
}
