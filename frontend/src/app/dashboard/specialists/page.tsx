"use client";

import { apiErrorHandler } from "@/api/apiErrorHandler";
import {
  getAllSpecialistsApi,
  IGetAllSpecialistsResponse,
  IIGetAllSpecialistsParams
} from "@/api/specialistApi";
import SpecialistPublishStatusBadge from "@/components/specialist/publish-status";
import SpecialistVerificationStatusBadge from "@/components/specialist/verification-status";
import {
  Button,
  IconButton,
  Input,
  Pagination,
  Paper,
  Skeleton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from "@mui/material";
import { AxiosError } from "axios";
import { Download, EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function Page() {
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [specialistsResponse, setSpecialistsResponse] =
    useState<IGetAllSpecialistsResponse>({
      count: 0,
      data: [],
      page: 0,
      totalPages: 0
    });

  const [queryParams, setQueryParams] = useState<IIGetAllSpecialistsParams>({
    page_number: 1,
    page_size: 10
  });
  const [searchText, setSearchText] = useState("");

  const getAllSpecialists = useCallback(
    async (isLoading?: boolean) => {
      try {
        if (isLoading) setIsLoading(true);
        const { data } = await getAllSpecialistsApi(queryParams);
        setSpecialistsResponse(data);
      } catch (err) {
        apiErrorHandler(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    },
    [queryParams]
  );

  useEffect(() => {
    getAllSpecialists(true);
  }, [getAllSpecialists]);

  const handleSearchText = useDebouncedCallback((value: string) => {
    setQueryParams((prev) => ({ ...prev, page_number: 1, search: value }));
  }, 1000);

  return (
    <div>
      <div className="mb-4">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Specialists
        </Typography>
        <Typography variant="body2" color="#888">
          Create and publish your services for Client&apos;s & Companies
        </Typography>
      </div>

      <div className="border-b border-gray-300">
        <Tabs
          value={filter}
          onChange={(_, value) => {
            setFilter(value);
            setQueryParams((prev) => ({
              ...prev,
              page_number: 1,
              is_draft:
                value === "all"
                  ? undefined
                  : value === "draft"
                    ? "true"
                    : "false"
            }));
          }}
        >
          <Tab label="All" value="all" />
          <Tab label="Drafts" value="draft" />
          <Tab label="Published" value="published" />
        </Tabs>
      </div>
      <div className="my-5 flex items-center justify-between gap-3">
        <div>
          <Input
            placeholder="Search services"
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setSearchText(value);
              handleSearchText(value);
            }}
          />
        </div>
        <div className="my-5 flex justify-between gap-3">
          <Link href="/dashboard/specialists/create">
            <Button variant="contained" startIcon={<Plus size={16} />}>
              Create
            </Button>
          </Link>
          <Button
            sx={{ bgcolor: "primary.dark", color: "white" }}
            variant="outlined"
            startIcon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textTransform: "uppercase" }}>
              <TableCell sx={{ fontWeight: 600, color: "#888888" }}>
                Service
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                Price
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                Rating
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                Duration
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                Approval Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                Publish Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "#888888" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array(4)
                .fill(0)
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell colSpan={7}>
                      <Skeleton variant="rounded" width="100%" height={30} />
                    </TableCell>
                  </TableRow>
                ))
            ) : specialistsResponse.data.length ? (
              specialistsResponse.data.map((specialist) => (
                <TableRow
                  key={specialist.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {specialist.title}
                  </TableCell>
                  <TableCell align="center">{specialist.final_price}</TableCell>
                  <TableCell align="center">
                    {specialist.average_rating}
                  </TableCell>
                  <TableCell align="center">
                    {specialist.duration_days}
                  </TableCell>
                  <TableCell align="center">
                    <SpecialistVerificationStatusBadge
                      status={specialist.verification_status}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <SpecialistPublishStatusBadge
                      isDraft={specialist.is_draft}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EllipsisVertical size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex w-full items-center justify-center">
                    No Data
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="my-4 flex justify-center">
        <Pagination
          page={queryParams.page_number}
          count={specialistsResponse.totalPages}
          onChange={(_, page) =>
            setQueryParams((prev) => ({ ...prev, page_number: page }))
          }
        />
      </div>
    </div>
  );
}

export default Page;
