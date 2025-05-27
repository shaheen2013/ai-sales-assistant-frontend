import { Metadata } from "next";

import SignupForm from "@/components/partials/auth/dealer/signup-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dealer Signup | AI Sales Assistant",
};

export default function SignUp() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
