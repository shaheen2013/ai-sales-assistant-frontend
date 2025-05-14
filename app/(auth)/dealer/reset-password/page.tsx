import { Metadata } from "next";
import { Suspense } from "react";

import ResetPasswordForm from "@/components/partials/auth/dealer/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | AI Sales Assistant",
};

export default function ResetRedirect() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
