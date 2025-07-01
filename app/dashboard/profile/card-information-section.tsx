"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useGetDealerCardsQuery } from "@/features/dealer/dealerSlice";
// import {
//   Badge,
//   Check,
//   ChevronDown,
//   ChevronUp,
//   Edit2,
//   Trash2,
// } from 'lucide-react';
import Image from "next/image";

const cardImages: { [key: string]: string } = {
  visa: "/images/dashboard/profile/visa.png",
  amex: "/images/dashboard/profile/american-express.png",
  mastercard: "/images/dashboard/profile/mastercard.png",
};

const CardInformationSection = () => {
  /*--RTK Query--*/
  const { data: cardsData, isLoading: isCardsLoading } =
    useGetDealerCardsQuery();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-gray-400">
          Card Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCardsLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-7 rounded-md" />
                <Skeleton className="w-20 h-7 rounded-md" />
              </div>
              <Skeleton className="w-5 h-5 rounded-md" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-7 rounded-md" />
                <Skeleton className="w-20 h-7 rounded-md" />
              </div>
              <Skeleton className="w-5 h-5 rounded-md" />
            </div>
          </div>
        ) : (
          <Accordion type="multiple" defaultValue={["card_0"]}>
            {cardsData?.map((card, index) => (
              <AccordionItem
                value={`card_${index}`}
                className="p-0 rounded-none border-b border-[#eaebec]"
                key={index}
              >
                <AccordionTrigger className="">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-[#f7f7f9] rounded flex items-center justify-center mr-3">
                        <Image
                          src={cardImages[card?.brand]}
                          alt={card?.display_brand}
                          width={40}
                          height={24}
                          className="w-8 h-5 object-contain"
                        />
                      </div>
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium text-gray-400 text-lg capitalize">
                            {card?.display_brand?.split("_")?.join(" ")}
                          </p>
                          {/* <p className="text-sm text-[#747b87]">45 Baker Terrace</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 py-4 px-8 text-sm">
                    <div>
                      <p className="text-[#747b87]">Number</p>
                      <p className="font-medium text-gray-400">
                        **** {card?.last4}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#747b87]">Expires</p>
                      <p className="font-medium text-gray-400">
                        {card?.exp_month}/{card?.exp_year}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default CardInformationSection;
