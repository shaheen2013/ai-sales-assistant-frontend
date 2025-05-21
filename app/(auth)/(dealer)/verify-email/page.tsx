import { Metadata } from "next";

import VerifyEmailPage from "./partials/VerifyEmailPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Enter Code | AI Sales Assistant",
};

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailPage />
    </Suspense>
  );
}
