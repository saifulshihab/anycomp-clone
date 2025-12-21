"use client";

import { getAllSpecialistsApi } from "@/api/specialistApi";
import SpecialistPublishStatusBadge from "@/components/specialist/publish-status";
import SpecialistVerificationStatusBadge from "@/components/specialist/verification-status";
import { TSpecialist } from "@/types";
import {
  Box,
  Button,
  IconButton,
  Input,
  Pagination,
  Paper,
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
import { Download, EllipsisVertical, Plus } from "lucide-react";
import { useEffect, useState } from "react";

function Page() {
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [specialists, setSpecialists] = useState<TSpecialist[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [queryParams, setQueryParams] = useState<{
    pageSize?: number;
    pageNumber?: number;
  }>({
    pageNumber: 1,
    pageSize: 10
  });

  useEffect(() => {
    (async () => {
      const { data } = await getAllSpecialistsApi({
        page_number: queryParams.pageNumber
      });
      setTotalPages(data.totalPages);
      setSpecialists(data.data);
    })();
  }, [queryParams]);

  return (
    <Box>
      <Box sx={{ marginY: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Specialists
        </Typography>
        <Typography variant="body2" color="#888">
          Create and publish your services for Client&apos;s & Companies
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={filter} onChange={(_, value) => setFilter(value)}>
          <Tab label="All" value="all" />
          <Tab label="Drafts" value="draft" />
          <Tab label="Published" value="published" />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 5,
          gap: 3,
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Input placeholder="Search services" />
        </Box>
        <Box
          sx={{
            display: "flex",
            my: 5,
            gap: 3,
            justifyContent: "space-between"
          }}
        >
          <Button variant="contained" startIcon={<Plus size={16} />}>
            Create
          </Button>
          <Button
            sx={{ bgcolor: "primary.dark", color: "white" }}
            variant="outlined"
            startIcon={<Download size={16} />}
          >
            Export
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {specialists.length ? (
              specialists.map((specialist) => (
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
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    No Data
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          page={queryParams.pageNumber}
          count={totalPages}
          onChange={(_, page) =>
            setQueryParams((prev) => ({ ...prev, pageNumber: page }))
          }
        />
      </Box>
    </Box>
  );
}

export default Page;
