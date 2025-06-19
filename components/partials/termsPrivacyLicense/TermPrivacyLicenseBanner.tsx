import React, { FC } from 'react'

type TermPrivacyLicenseBannerPropsType = {
    title: string;
    subtitle: string;
}

const TermPrivacyLicenseBanner: FC<TermPrivacyLicenseBannerPropsType> = ({ subtitle, title }) => {
    return (
        <div className='bg-primary-500 px-4 py-9 xl:px-24 xl:py-14'>
            <div className="text-center text-white text-2xl xl:text-5xl font-bold">{title}</div>
            <div className="text-center text-white text-sm font-normal xl:text-lg xl:font-medium mt-4 max-w-[1248px] mx-auto">{subtitle}</div>
        </div>
    )
}

export default TermPrivacyLicenseBanner