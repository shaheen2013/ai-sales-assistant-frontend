import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset Password | AI Sales Assistant",
};

export default function ResetRedirect({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { uid, token } = searchParams;

  // You can determine the role dynamically if needed (e.g., from cookies/session).
  const role = "dealer"; // or 'admin'

  const params = new URLSearchParams();
  if (uid) params.append("uid", uid);
  if (token) params.append("token", token);

  redirect(`/${role}/reset-password?${params.toString()}`);
}
