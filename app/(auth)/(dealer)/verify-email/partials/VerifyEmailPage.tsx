"use client";

import Spinner from "@/components/spinner/Spinner";
import { useEmailVerificationQuery } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
  } else {
    toast("success", data?.detail || "Email verified successfully");
  }
  router.push("/login");

  return <div></div>;
}
