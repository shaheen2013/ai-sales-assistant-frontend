import { Metadata } from "next";

import LoginForm from "@/components/partials/auth/user/login-form";

export const metadata: Metadata = {
  title: "Login | AI Sales Assistant",
};

export default function LoginPage() {
  return <LoginForm />;
}
