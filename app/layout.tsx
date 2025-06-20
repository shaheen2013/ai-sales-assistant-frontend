import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// components
import ReduxProvider from "@/components/ReduxProvider";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/shadcn/sonner";

import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Sales Assistant",
  description: "An AI-powered sales assistant to help you close deals faster.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
