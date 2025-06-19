import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { FC } from "react";
import ReactPaginate from "react-paginate";

type PaginationPropsType = {
  page: number;
  totalPage: number;
  isEnd?: boolean;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination: FC<PaginationPropsType> = ({
  page,
  totalPage,
  isEnd = false,
  onPageChange,
  className,
}) => {
  return (
    <ReactPaginate
      onPageChange={(pageNumber) => onPageChange(pageNumber.selected + 1)}
      forcePage={page - 1}
      pageCount={totalPage}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      className={cn("flex items-center", className)}
      pageClassName=" flex items-center justify-center rounded-lg text-gray-300 font-medium"
      pageLinkClassName="px-3.5 py-1"
      previousLabel={<ChevronLeft className="size-5 text-inherit" />}
      previousClassName="cursor-pointer text-gray-500 hover:text-gray-700 mr-2"
      nextLabel={
        <ChevronRight
          className={cn("size-5 text-inherit", {
            "cursor-not-allowed opacity-50": isEnd,
          })}
        />
      }
      nextClassName="cursor-pointer text-gray-500 hover:text-gray-700 ml-2"
      activeClassName="bg-primary-500 text-white"
      disabledClassName="!cursor-not-allowed !text-gray-100 [&>a]:!cursor-not-allowed"
    />
  );
};

export default Pagination;
