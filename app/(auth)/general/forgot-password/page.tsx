import { Metadata } from "next";

import ForgotPasswordForm from "@/components/partials/auth/general/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | AI Sales Assistant",
};

export default function SignUp() {
  return <ForgotPasswordForm />;
}

// export const dynamicPhoto = "/images/general-signup.svg";
