"use client";

import { DefaultSession } from "next-auth";
import { useSession } from "next-auth/react";

// Extend the Session type to include user_type
declare module "next-auth" {
  interface Session {
    user: {
      user_type?: string;
    } & DefaultSession["user"];
  }
}

interface keyInterface {
  key: "user" | "dealer";
}

import { useRouter } from "next/navigation";

export default function useAuth(
  WrapperComponent: React.ComponentType,
  options: keyInterface
) {
  const { key = "user" } = options;

  return function AuthComponent(props: any) {
    const router = useRouter();
    const { data: session, status } = useSession();

    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated";

    const isUser = session?.user?.user_type == "user";
    const isDealer = session?.user?.user_type == "dealer";

    const isUserAuthenticated = isUser && key === "user" && isAuthenticated;
    const isDealerAuthenticated =
      isDealer && key === "dealer" && isAuthenticated;

    const roleAuthMap = {
      user: isUserAuthenticated,
      dealer: isDealerAuthenticated,
    };

    if (isLoading) {
      return (
        <div className="h-[calc(100vh-140px)] flex justify-center items-center ">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (!isAuthenticated && !isLoading) {
      router.push(key == "dealer" ? `/dealer/login` : `/user/login`);
      return null;
    }

    if (roleAuthMap[key]) {
      return <WrapperComponent {...props} />;
    }

    return "Unauthorized";
  };
}
