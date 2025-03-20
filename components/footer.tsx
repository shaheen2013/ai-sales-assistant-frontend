import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="">
      <div className="container lg:py-14 pb-12 mx-auto grid grid-cols-4 lg:gap-12 gap-9">
        <div className="lg:col-span-1 col-span-2">
          <h2 className="text-gray-400 font-semibold text-2xl mb-6">
            Solutions
          </h2>

          <div className="flex flex-col">
            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Solutions 1
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Solutions 2
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Solutions 3
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Solutions 4
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1 col-span-2">
          <h2 className="text-gray-400 font-semibold text-2xl mb-6">
            AI Suite
          </h2>

          <div className="flex flex-col">
            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              AI Suite 1
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              AI Suite 2
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              AI Suite 3
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              AI Suite 4
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1 col-span-4">
          <h2 className="text-gray-400 font-semibold text-2xl mb-6">
            Resources
          </h2>

          <div className="flex flex-col">
            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Resources 1
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Resources 1
            </Link>

            <Link href="/" className="text-gray-300 text-base font-normal mb-4">
              Resources 1
            </Link>
          </div>
        </div>

        {/* social media */}
        <div className="lg:col-span-1 col-span-4">
          <h2 className="text-gray-400 font-semibold text-2xl mb-6">
            Social Media
          </h2>

          <div className="flex gap-2">
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
                src="/icons/social/twitter.svg"
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
      </div>

      {/* brand */}
      <div className="lg:mb-16 mb-12 flex justify-center items-center container">
        <Image
          src="/icons/homepage/footer-brand.svg"
          width={700}
          height={160}
          alt="logo"
        />
      </div>

      {/* copyright */}
      <div className="container">
        <div className=" bg-[#06052F] text-white flex lg:flex-row flex-col lg:text-left text-center justify-between lg:p-8 p-4 mb-9 rounded-xl ">
          <div className="mb-9 lg:mb-0 lg:text-xl text-lg font-medium ">
            Copyright ©2025 Teez
          </div>

          <div className="flex items-center gap-6">
            <Link href="/term-of-use" className="font-normal text-base">
              Term Of Use
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
