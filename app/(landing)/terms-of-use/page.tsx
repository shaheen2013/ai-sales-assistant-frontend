import TermPrivacyLicenseBanner from '@/components/partials/termsPrivacyLicense/TermPrivacyLicenseBanner'
import TermPrivacyLicenseBody from '@/components/partials/termsPrivacyLicense/TermPrivacyLicenseBody'
import ProSeller from '@/components/pro-seller/ProSeller'
import { termsOfUsConstData } from '@/static/termsOfUseConstData'
import React from 'react'


const page = () => {
    return (
        <div>
            <TermPrivacyLicenseBanner
                title="It's Easy with Us"
                subtitle='Welcome to Teez, your AI-powered sales assistant for car dealerships and buyers. By using our platform, services, and website, you agree to the following terms and conditions.'
            />
            <TermPrivacyLicenseBody
                title='Terms of Use'
                effectiveDate='19th February, 2022'
                lastUpdated='19th February, 2022'
                items={termsOfUsConstData}
            />
            <ProSeller />
        </div>
    )
}

export default page