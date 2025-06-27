import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC } from "react";

type TermPrivacyLicenseListPropsType = {
  data: {
    title: string;
    description: string | string[];
    email?: string;
    isDashed?: boolean;
  }[];
};

const TermPrivacyLicenseList: FC<TermPrivacyLicenseListPropsType> = ({
  data,
}) => {
  return (
    <div className="mt-6 xl:mt-12 flex flex-col gap-6">
      {data?.map((item, index) => (
        <div key={index}>
          <div className="text-[#555d6a] text-xl font-semibold">
            {index + 1}. {item?.title}
          </div>
          {Array.isArray(item?.description) ? (
            <div className="mt-3 text-[#717882] text-base xl:text-lg font-normal leading-7">
              {item?.description?.map((subItem, index) => (
                <p
                  key={index}
                  className={cn(
                    "xl:mb-7",
                    index === item?.description?.length - 1 && "xl:mb-0"
                  )}
                >
                  {item?.isDashed !== false && "- "}
                  {subItem}
                </p>
              ))}
            </div>
          ) : (
            <div className="mt-3 text-[#717882] text-base xl:text-lg font-normal">
              {item?.description}
            </div>
          )}
          {item?.email && (
            <div className="text-primary-400 text-lg font-normal leading-7">
              <a href={`mailto:${item?.email}`} className="hover:underline">
                {item?.email}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TermPrivacyLicenseList;
