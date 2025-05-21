import { Metadata } from "next";

import SignupForm from "@/components/partials/auth/user/signup-form";

export const metadata: Metadata = {
  title: "Signup | AI Sales Assistant",
};

export default function SignUp() {
  return <SignupForm />;
}

