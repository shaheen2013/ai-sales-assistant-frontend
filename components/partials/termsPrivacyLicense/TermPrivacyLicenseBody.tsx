import { FC } from "react";
import TermPrivacyLicenseList from "./TermPrivacyLicenseList";

type TermPrivacyLicenseBodyPropsType = {
    title: string;
    effectiveDate?: string;
    lastUpdated?: string;
    items: {
        title: string;
        description: string | string[];
        email?: string
    }[],
};

const TermPrivacyLicenseBody: FC<TermPrivacyLicenseBodyPropsType> = ({
    title,
    effectiveDate,
    lastUpdated,
    items
}) => {
    const lastWordOfTitle = title.split(" ").pop();
    return (
        <div className="px-4 py-9 xl:px-0 xl:pt-12 xl:pb-[86px] max-w-[1248px] mx-auto">
            <div className="text-center text-gray-900 text-2xl xl:text-4xl font-bold">
                {title} <span className="text-[#019935]">{lastWordOfTitle}</span>
            </div>

            {(effectiveDate || lastUpdated) && (
                <div className="text-[#717882] text-base xl:text-xl font-normal text-center mt-4">
                    {effectiveDate && (
                        <>
                            Effective Date:{" "}
                            <span className="text-[#2b3545] font-semibold">
                                {effectiveDate}
                            </span>
                            {lastUpdated && ", "}
                        </>
                    )}
                    {lastUpdated && (
                        <>
                            Last Updated:{" "}
                            <span className="text-[#2b3545] font-semibold">
                                {lastUpdated}
                            </span>
                        </>
                    )}
                </div>
            )}

            <TermPrivacyLicenseList
                data={items}
            />
        </div>
    );
}

export default TermPrivacyLicenseBody;