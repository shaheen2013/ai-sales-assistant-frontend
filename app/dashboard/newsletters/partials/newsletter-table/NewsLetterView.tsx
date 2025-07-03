import Link from "next/link";
import moment from "moment";
import React, { FC } from "react";

import { shortenFileName } from "@/lib/utils";
import Badge from "@/components/badge/Badge";
import { NewsLetterResponseType } from "@/types/newsletterType";
import { Dialog, DialogContent, DialogTitle } from "@/components/shadcn/dialog";

type NewsLetterViewProps = {
  data: NewsLetterResponseType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const variants = ["green", "purple", "orange", "red", "blue"];

const NewsLetterView: FC<NewsLetterViewProps> = ({
  data,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogTitle>Newsletter</DialogTitle>
        <div className="flex flex-col gap-5">
          {/* <div className="flex flex-col gap-1"> */}
          {/* <h4 className="text-base font-medium text-gray-700">Name</h4> */}
          {/* <p className="text-sm text-gray-600 font-normal">{data?.name}</p> */}
          {/* </div> */}
          <div className="flex flex-col gap-1">
            <h4 className="text-base font-medium text-gray-700">Subject</h4>
            <p className="text-sm text-gray-600 font-normal">{data?.subject}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-base font-medium text-gray-700">Summary</h4>
            <p className="text-sm text-gray-600 font-normal">{data?.summary}</p>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-base font-medium text-gray-700">Files</h4>
            <div className="flex gap-2 flex-wrap">
              {data?.files?.map((item, index) => (
                <Link href={item} key={index} target="_blank">
                  <Badge
                    variant={variants[index] as any}
                    text={shortenFileName(
                      item?.split("/")[item?.split("/").length - 1]
                    )}
                    isDot={false}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-base font-medium text-gray-700">Dealer</h4>

            <div className="flex gap-2 flex-wrap">
              {data?.dealer?.map((item, index) => (
                <Badge
                  variant={variants[index] as any}
                  text={item?.name || "N/A"}
                  isDot={false}
                  key={index}
                />
              ))}

              {data?.dealer?.length === 0 && (
                <p className="text-sm text-gray-600 font-normal">N/A</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-base font-semibold text-gray-700">Date</h4>
            <p className="text-sm text-gray-600 font-normal">
              {moment.utc(data?.created_at).format("MMM DD, YYYY | hh:mm A")}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsLetterView;
