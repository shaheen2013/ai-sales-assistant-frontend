import { Metadata } from "next";

import EnterCodeForm from "@/components/partials/auth/user/enter-code-form";

export const metadata: Metadata = {
  title: "Enter Code | AI Sales Assistant",
};

export default function EnterCodePage() {
  return <EnterCodeForm />;
}

