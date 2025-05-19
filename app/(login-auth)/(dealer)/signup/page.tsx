import { Metadata } from "next";

import SignupForm from "@/components/partials/auth/dealer/signup-form";

export const metadata: Metadata = {
  title: "Dealer Signup | AI Sales Assistant",
};

export default function SignUp() {
  return <SignupForm />;
}
