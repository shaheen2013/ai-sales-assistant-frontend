import { Metadata } from "next";

import LoginForm from "@/components/partials/auth/dealer/login-form";

export const metadata: Metadata = {
  title: "Dealer Login | AI Sales Assistant",
};

export default function LoginPage() {
  return <LoginForm />;
}
