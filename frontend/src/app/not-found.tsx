import { Box, Typography } from "@mui/material";
import { AlertTriangle } from "lucide-react";

function Page() {
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
        <AlertTriangle />
        <Typography variant="body1">Page Not Found</Typography>
      </Box>
    </Box>
  );
}

export default Page;
