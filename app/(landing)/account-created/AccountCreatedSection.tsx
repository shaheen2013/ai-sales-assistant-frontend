"use client";

import React, { use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Button from "@/components/button";
import { useResendEmailVerificationMutation } from "@/features/auth/authSlice";
import { useToast } from "@/hooks/useToast";
import { beautifyErrors } from "@/lib/utils";

export default function AccountCreatedSection() {
  const params = useSearchParams();
  const toast = useToast();

  const email = params.get("email") || "";

  const [resendEmailVerification, { isLoading }] =
    useResendEmailVerificationMutation();

  const handleResendEmail = async () => {
    try {
      const { data, error } = await resendEmailVerification({ email });

      if (error) {
        console.log("Error resending email verification:", error);
        toast("error", beautifyErrors(error));
        return;
      }

      if (data) {
        console.log("Email verification resent successfully:", data);
        alert(
          "Email verification link has been resent. Please check your inbox."
        );
      }
    } catch (error) {
      console.log("Error resending email verification:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="max-w-[700px] w-[700px] border rounded-xl p-6">
        {/* svg icon */}
        <div className="flex justify-center mb-2">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M93 24C101.284 24 108 30.7157 108 39V87C108 95.2843 101.284 102 93 102H27C18.7157 102 12 95.2843 12 87V39C12 30.7157 18.7157 24 27 24H93ZM102 47.766L61.5211 71.5858C60.7387 72.046 59.7997 72.1227 58.9651 71.8159L58.4789 71.5858L18 47.778V87C18 91.9706 22.0294 96 27 96H93C97.9706 96 102 91.9706 102 87V47.766ZM93 30H27C22.0294 30 18 34.0294 18 39V40.812L60 65.5195L102 40.806V39C102 34.0294 97.9706 30 93 30Z"
              fill="#5D6679"
            />
          </svg>
        </div>

        {/* title */}
        <h2 className="text-center text-gray-500 text-2xl font-semibold mb-3">
          Confirm Your Email & Finish Setting Up Your Profile!
        </h2>

        {/* subtitle */}
        <p className="text-center text-gray-400 mb-9">
          We&aposve sent a link to your email{" "}
          <span className="text-primary-500">{email && `(${email})`}</span>{" "}
          address. If you don&apost see it, check your spam or junk folder.
        </p>

        {/* buttons */}
        <div className="flex justify-center gap-4 mb-9 lg:flex-row flex-col">
          <Button variant="outline-gray">Contact Support</Button>
          <Button
            variant="primary"
            // loading={isLoading}
            disabled={isLoading}
            onClick={handleResendEmail}
          >
            {isLoading ? "Processing..." : "Resend Mail"}
          </Button>
        </div>

        <div className="">
          <Link
            href="/privacy-policy"
            className="block text-center text-gray-400 underline text-sm"
          >
            Terms of Use & Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
