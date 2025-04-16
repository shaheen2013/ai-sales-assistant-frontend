import { Metadata } from "next";

import LoginForm from "@/components/partials/dashboard/login-form";

export const metadata: Metadata = {
  title: "Login | AI Sales Assistant",
};

export default function SignUp() {
  return <LoginForm />;
}
