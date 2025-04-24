"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function withAuth(
  WrapperComponent: React.ComponentType,
  options = []
) {
  const { key }: any = options;

  return function AuthComponent(props: any) {
    const router = useRouter();
    const { data: session, status } = useSession();

    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated";

    if (isLoading) {
      return (
        <div className="h-[calc(100vh-140px)] flex justify-center items-center ">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (!isAuthenticated && !isLoading) {
      router.push(`/dealer/login`);
      return null;
    }

    return <WrapperComponent {...props} />;
  };
}
