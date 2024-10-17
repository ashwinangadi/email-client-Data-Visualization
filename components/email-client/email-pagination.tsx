import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const EmailPagination = ({
  totalEmails,
  paginate,
}: {
  totalEmails: number;
  paginate: number;
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const limit = 10;

  const totalPages = Math.ceil(totalEmails / limit);
  const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);
    if (paginate < totalPages) {
      params.set("page", (paginate + 1).toString());
      const newURL = `${pathname}?${params.toString()}`;
      replace(newURL);
    }
  };

  const handlePreviousPage = () => {
    if (paginate > 1) {
      const params = new URLSearchParams(searchParams);
      params.set("page", (paginate - 1).toString());
      const newURL = `${pathname}?${params.toString()}`;
      replace(newURL);
    }
  };

  return (
    <Pagination className=" mt-3 mb-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              handlePreviousPage();
            }}
          />
        </PaginationItem>
        {totalPagesArray.map((pageNumber) => (
          <PaginationLink
            key={pageNumber}
            isActive={pageNumber === paginate}
            href={`${pathname}?page=${pageNumber}`}
          >
            {pageNumber}
          </PaginationLink>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              handleNextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default EmailPagination;
