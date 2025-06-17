import TermPrivacyLicenseBanner from "@/components/partials/termsPrivacyLicense/TermPrivacyLicenseBanner";
import TermPrivacyLicenseBody from "@/components/partials/termsPrivacyLicense/TermPrivacyLicenseBody";
import ProSeller from "@/components/pro-seller/ProSeller";
import { privacyPolicyConstData } from "@/static/privacyPolicyConstData";
import React from "react";

export default function page() {
  return (
    <div>
      <TermPrivacyLicenseBanner
        title="Our Privacy & Policy"
        subtitle="This Privacy Policy describes how Teez (“we,” “our,” or “us”) collects, uses, and protects your personal information when you use our mobile app, website, and related services. By using Teez, you agree to the terms of this Privacy Policy."
      />
      <TermPrivacyLicenseBody
        title='Privacy Policy'
        effectiveDate='19th February, 2022'
        lastUpdated='19th February, 2022'
        items={privacyPolicyConstData}
      />
      <ProSeller />
    </div>
  );
}
