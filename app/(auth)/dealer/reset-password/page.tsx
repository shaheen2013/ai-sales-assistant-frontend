import { Metadata } from "next";

import ResetPasswordForm from "@/components/partials/auth/user/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password | AI Sales Assistant",
};

export default function SignUp() {
  return <ResetPasswordForm />;
}

// export const dynamicPhoto = "/images/general-signup.svg";
