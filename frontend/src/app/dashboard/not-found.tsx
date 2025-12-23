import { Box, Typography } from "@mui/material";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        py: 20,
        display: "grid",
        placeContent: "center",
        placeItems: "center"
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <AlertTriangle size={40} />
        <Typography variant="body1" sx={{ fontSize: 40 }}>
          Page Not Found
        </Typography>
        <Link href="/">Back to Home</Link>
      </Box>
    </Box>
  );
}
