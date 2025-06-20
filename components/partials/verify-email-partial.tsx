"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { useEmailVerificationQuery } from "@/features/auth/authSlice";

export default function VerifyEmailPartial() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const { data, error } = useEmailVerificationQuery({
    uid: uid,
    token: token,
  });

  useEffect(() => {
    if (error) {
      const errorMessage = beautifyErrors(error);
      toast("error", errorMessage);
      router.push("/login");
      return;
    }

    if (data) {
      toast("success", data?.detail);
      router.push("/login");
    }
  }, [data, router, error, toast]);

  return (
    <div className="h-screen flex justify-center items-center">Loading...</div>
  );
}
