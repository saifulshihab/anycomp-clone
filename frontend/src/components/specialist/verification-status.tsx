import { SpecialistVerificationStatus } from "@/types";
import { Box, Typography } from "@mui/material";

type Props = {
  status: SpecialistVerificationStatus | undefined;
};

function SpecialistVerificationStatusBadge({ status }: Props) {
  return status && status.length ? (
    <Box
      sx={{
        px: 2,
        display: "inline-block",
        py: "2px",
        borderRadius: 2,
        bgcolor:
          status === SpecialistVerificationStatus.APPROVED
            ? "#18C96466"
            : status === SpecialistVerificationStatus.UNDER_REVIEW
            ? "#61E7DA66"
            : status === SpecialistVerificationStatus.REJECTED
            ? "#C0030666"
            : ""
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color:
            status === SpecialistVerificationStatus.APPROVED
              ? "#18C964"
              : status === SpecialistVerificationStatus.UNDER_REVIEW
              ? "#61E7DA"
              : status === SpecialistVerificationStatus.REJECTED
              ? "#C00306"
              : ""
        }}
      >
        {status[0].toUpperCase() + status.substring(1).toLowerCase()}
      </Typography>
    </Box>
  ) : null;
}

export default SpecialistVerificationStatusBadge;
