"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function DashboardLogout() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      signOut({ callbackUrl: "/login" });
    }
  }, [session, router]);

  return <Suspense>{/* <div>Dashboard Logout</div> */}</Suspense>;
}
