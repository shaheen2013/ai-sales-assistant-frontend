import TermPrivacyLicenseBanner from '@/components/partials/termsPrivacyLicense/TermPrivacyLicenseBanner'
import TermPrivacyLicenseBody from '@/components/partials/termsPrivacyLicense/TermPrivacyLicenseBody'
import ProSeller from '@/components/pro-seller/ProSeller'
import { licenseConstData } from '@/static/licenseConstData'
import React from 'react'


const page = () => {
    return (
        <div>
            <TermPrivacyLicenseBanner
                title="Licensing & Usage Rights"
                subtitle="Learn about your rights to use the Teez platform, including license terms, usage restrictions, and integration policies. This section outlines what you're allowed to do with the app, how your subscription governs access, and how we protect our intellectual property."
            />
            <TermPrivacyLicenseBody
                title='Licensing & Rights'
                items={licenseConstData}
            />
            <ProSeller />
        </div>
    )
}

export default page