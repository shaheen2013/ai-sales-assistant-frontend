import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="">
      {/* brand */}
      <div className="lg:mb-16 flex flex-col justify-center items-center container gap-9">
        <Image
          src="/icons/homepage/footer-brand.svg"
          width={700}
          height={160}
          alt="logo"
        />
        <div className="max-w-[1000px] text-center justify-start text-[#555d6a] text-base xl:text-2xl font-normal">
          Teez is an AI-powered sales assistant that helps car dealers engage
          with buyers through voice and text. It answers questions, books
          appointments, and connects users to real sales reps when
          needed—streamlining the car buying and selling experience.
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-6 my-9 xl:mt-12 xl:mb-16 justify-center">
        <div className="text-[#555d6a] text-xl xl:text-2xl font-medium">
          Social Media
        </div>
        <div className="flex gap-3">
          <Link
            href="https://facebook.com"
            className="h-10 w-10 bg-primary-50 flex justify-center items-center rounded-lg"
          >
            <Image
              src="/icons/social/facebook.svg"
              width={20}
              height={20}
              alt="facebook"
              className="w-4 h-4"
            />
          </Link>

          <Link
            href="https://twitter.com"
            className="h-10 w-10 bg-primary-50 flex justify-center items-center rounded-lg"
          >
            <Image
              src="/icons/social/x.svg"
              width={20}
              height={20}
              alt="facebook"
              className="w-4 h-4"
            />
          </Link>

          <Link
            href="https://linkedin.com"
            className="h-10 w-10 bg-primary-50 flex justify-center items-center rounded-lg"
          >
            <Image
              src="/icons/social/linkedin.svg"
              width={20}
              height={20}
              alt="facebook"
              className="w-4 h-4"
            />
          </Link>

          <Link
            href="https://instagram.com"
            className="h-10 w-10 bg-primary-50 flex justify-center items-center rounded-lg"
          >
            <Image
              src="/icons/social/instagram.svg"
              width={20}
              height={20}
              alt="facebook"
              className="w-4 h-4"
            />
          </Link>
        </div>
      </div>

      {/* copyright */}
      <div className="container">
        <div className=" bg-[#06052F] text-white flex lg:flex-row flex-col lg:text-left text-center justify-between lg:p-8 p-4 mb-9 rounded-xl ">
          <div className="mb-9 lg:mb-0 lg:text-xl text-lg font-medium ">
            Copyright ©2025 Teez
          </div>

          <div className="flex items-center gap-5">
            <Link href="/terms-of-use" className="font-normal text-base">
              Terms Of Use
            </Link>
            <Link href="/privacy-policy" className="font-normal text-base">
              Privacy Policy
            </Link>
            <Link href="/licencing" className="font-normal text-base">
              Licencing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
