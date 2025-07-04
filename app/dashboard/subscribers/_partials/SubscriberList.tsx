"use client";

import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ChevronDown, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/shadcn/input";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
  SelectContent,
} from "@/components/shadcn/select";

import SubscriberTable from "./SubscriberTable";
import { Skeleton } from "@/components/shadcn/skeleton";
import Pagination from "@/components/pagination/Pagination";
import { subscriberTableColumns } from "./SubscriberTableColumn";
import { useGetDealersQuery } from "@/features/dealer/dealerSlice";

const SubscriberList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || 1;
  // const search = searchParams.get("search") || "";

  /*--React State--*/
  // const [search, setSearch] = useState<string>("");
  const [subscriberType, setSubscriberType] =
    useState<string>("all_subscribers");

  const [debouncedSearchValue, setSearch] = useDebounceValue("", 500);

  /*--RTK Query--*/
  const {
    data: dealersData,
    isLoading: dealersLoading,
    isFetching: dealersFetching,
  } = useGetDealersQuery({
    offset: (Number(page) - 1) * 10,
    limit: 10,
    search: debouncedSearchValue || "",
    ...(subscriberType !== "all_subscribers" && {
      subscription_name: subscriberType,
    }),
  });

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const calculatedTitle = () => {
    if (subscriberType === "all_subscribers") {
      return "All Premium Subscribers";
    } else if (subscriberType === "business") {
      return "Business Subscribers";
    } else if (subscriberType === "enterprise") {
      return "Enterprise Subscribers";
    }
    return "";
  };

  return (
    <div className="p-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#eaebec]">
      <div className="flex md:flex-row flex-col items-center justify-between">
        <h4 className="text-gray-500 text-2xl font-semibold">Subscribers</h4>
        <Select
          defaultValue="all_subscribers"
          value={subscriberType}
          onValueChange={(e) => {
            setSubscriberType(e);
            const params = new URLSearchParams(searchParams);
            params.set("page", "1");
            params.set("subscription_name", e);
            params.delete("search");

            setSearch("");
            router.push(`?${params.toString()}`);
          }}
        >
          <SelectTrigger className="max-w-fit [&>svg]:hidden [&>span]:pointer-events-auto [&>span]:text-primary-500 [&>span]:text-sm [&>span]:font-medium gap-1.5">
            <SelectValue placeholder="All Subscribers" />
            <div>
              <ChevronDown className="size-5 text-primary-500" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all_subscribers">All Subscribers</SelectItem>
              <SelectItem value="business">Business Subscribers</SelectItem>
              <SelectItem value="enterprise">Enterprise Subscribers</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {dealersLoading ? (
        <div className="h-full flex flex-col gap-4 justify-center items-center mt-6">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </div>
      ) : (
        <div className="p-4 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-[#eaebec] mt-4">
          <div className="flex md:flex-row flex-col items-center justify-between pb-4 border-b border-b-[#EAEBEC] mb-4">
            <p className="text-lg font-medium text-[#535862]">
              {calculatedTitle()}
            </p>
            <Input
              preIcon={<Search className="size-5 text-[#a2a1a7]" />}
              placeholder="Search"
              className="xl:min-w-[320px] rounded-lg"
              onChange={(e) => {
                setSearch(e.target.value);
                const params = new URLSearchParams(searchParams);
                params.set("search", e.target.value);
                params.set("page", "1");
                router.push(`?${params.toString()}`);
              }}
            />
            <div className="flex items-center gap-0.5">
              <p className="text-gray-600 text-lg font-medium ">Total -</p>
              <div className="px-2 py-[6.5px] rounded-md shadow-[0px_1.125px_2.25px_0px_rgba(10,13,18,0.05)] outline outline-[1.12px] outline-offset-[-1.12px] outline-[#D5D7DA] text-base font-medium text[#414651] min-w-[36px] flex items-center justify-center">
                {dealersData?.count || 0}
              </div>
            </div>
          </div>

          <div className="rounded-2xl mt-4">
            <SubscriberTable
              columns={subscriberTableColumns}
              data={dealersData?.results || []}
              loading={dealersFetching}
            />

            <div className="flex items-center justify-center mt-4">
              <Pagination
                isEnd={dealersData?.next === null}
                page={Number(page)}
                onPageChange={onPageChange}
                totalPage={Math.ceil((dealersData?.count || 0) / 10)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriberList;
