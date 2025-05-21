"use client";

import Spinner from "@/components/spinner/Spinner";
import { useEmailVerificationQuery } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/useToast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const toast = useToast();
  const router = useRouter();

  const uid = params.get("uid");
  const token = params.get("token");

  const { isError, isFetching, data } = useEmailVerificationQuery({
    uid: uid,
    token: token,
  });

  console.log("data", data);
  console.log("isError", isError);

  if (isFetching) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  toast("success", data?.detail || "Email verified successfully");
  router.push("/login");

  return <div>VerifyEmailPage</div>;
}
