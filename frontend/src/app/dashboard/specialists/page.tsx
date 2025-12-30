"use client";

import { apiErrorHandler } from "@/api/apiErrorHandler";
import {
  deleteSpecialistApi,
  getAllSpecialistsApi,
  IGetAllSpecialistsResponse,
  IIGetAllSpecialistsParams
} from "@/api/specialistApi";
import ActionMenu from "@/components/specialist/create/action-menu";
import SpecialistPublishStatusBadge from "@/components/specialist/publish-status";
import SpecialistVerificationStatusBadge from "@/components/specialist/verification-status";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Pagination,
  Paper,
  Skeleton,
  styled,
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
import { Download, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
  color: "#888888"
});

function Page() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogId, setDeleteDialogId] = useState<string | undefined>();

  const [specialistsResponse, setSpecialistsResponse] =
    useState<IGetAllSpecialistsResponse>({
      count: 0,
      data: [],
      page: 0,
      totalPages: 0
    });

  const [searchText, setSearchText] = useState("");
  const [queryParams, setQueryParams] = useState<IIGetAllSpecialistsParams>({
    page_number: 1,
    page_size: 10
  });

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

  const onDelete = async () => {
    try {
      if (!deleteDialogId) return;
      setIsDeleting(true);
      await deleteSpecialistApi(deleteDialogId);
      await getAllSpecialists();
      setDeleteDialogId(undefined);
      toast.success("Specialist deleted.");
    } catch (err) {
      apiErrorHandler(err as AxiosError);
    } finally {
      setIsDeleting(false);
    }
  };

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
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "60vh", minHeight: "50vh", overflowX: "auto" }}
      >
        <Table
          stickyHeader
          sx={{ overflowX: "auto" }}
          aria-label="specialists table"
        >
          <TableHead>
            <TableRow sx={{ textTransform: "uppercase" }}>
              <StyledTableCell>Service</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
              <StyledTableCell align="center">Duration</StyledTableCell>
              <StyledTableCell align="center">Approval Status</StyledTableCell>
              <StyledTableCell align="center">Publish Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
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
                    <ActionMenu
                      onView={() =>
                        router.push(`/dashboard/specialists/${specialist.id}`)
                      }
                      onDelete={() => setDeleteDialogId(specialist.id)}
                    />
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
      <Dialog
        open={deleteDialogId !== undefined}
        onClose={() => setDeleteDialogId(undefined)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Specialist</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want delete this specialist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            disabled={isDeleting}
            onClick={() => setDeleteDialogId(undefined)}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            loading={isDeleting}
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Page;
