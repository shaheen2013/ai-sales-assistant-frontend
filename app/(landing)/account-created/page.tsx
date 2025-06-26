import { Suspense } from "react";
import AccountCreatedSection from "./AccountCreatedSection";

export default function AccountCreated() {
  return (
    <Suspense>
      <AccountCreatedSection />
    </Suspense>
  );
}
