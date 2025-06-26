"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { beautifyErrors } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import Spinner from "@/components/spinner/Spinner";

import { useEmailVerificationQuery } from "@/features/auth/authSlice";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const toast = useToast();
  const router = useRouter();

  const uid = params.get("uid");
  const token = params.get("token");

  const { error, isFetching, data } = useEmailVerificationQuery({
    uid: uid,
    token: token,
  });

  if (isFetching) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (error) {
    toast("error", beautifyErrors(error));
    router.push("/login");
  } else {
    toast("success", data?.detail || "Email verified successfully");
  }

  if (window && window.localStorage) {
    window.localStorage.setItem("onboarding", "true");
    router.push("/login");
  }

  return <div></div>;
}
