import { Box, Typography } from "@mui/material";

type Props = {
  isDraft: boolean;
};

function SpecialistPublishStatusBadge({ isDraft }: Props) {
  return (
    <Box
      sx={{
        px: 2,
        display: "inline-block",
        py: "2px",
        borderRadius: 2,
        bgcolor: isDraft ? "#18C964" : "#C00306"
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: "white"
        }}
      >
        {isDraft ? "Not Published" : "Published"}
      </Typography>
    </Box>
  );
}

export default SpecialistPublishStatusBadge;
