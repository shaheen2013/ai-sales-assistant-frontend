import { Metadata } from "next";

import ForgotPasswordForm from "@/components/partials/auth/dealer/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | AI Sales Assistant",
};

export default function ForgotPassword() {
  return <ForgotPasswordForm />;
}
