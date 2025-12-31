"use client";

import { IIGetAllSpecialistsParams } from "@/api/specialistApi";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {
  totalPages: number;
};

function SpecialistPagination(props: Props) {
  const { totalPages } = props;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<IIGetAllSpecialistsParams>({
    page_number: searchParams.get("page_number") || "1",
    page_size: searchParams.get("page_size") || "10"
  });

  return (
    <div className="my-4 flex justify-center">
      <Pagination
        page={
          filters.page_number !== undefined
            ? Number(filters.page_number)
            : undefined
        }
        count={totalPages}
        onChange={(_, page) => {
          setFilters((prev) => ({ ...prev, page_number: page.toString() }));
          const params = new URLSearchParams(searchParams.toString());
          if (page !== undefined && page > 0) {
            params.set("page_number", page.toString());
          } else {
            params.delete("page_number");
          }
          router.push(`?${params.toString()}`);
        }}
      />
    </div>
  );
}

export default SpecialistPagination;
