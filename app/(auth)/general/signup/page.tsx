import { Metadata } from "next";

import SignupForm from "@/components/partials/auth/general/signup-form";

export const metadata: Metadata = {
  title: "Signup | AI Sales Assistant",
};

export default function SignUp() {
  return <SignupForm />;
}

// export const dynamicPhoto = "/images/general-signup.svg";
