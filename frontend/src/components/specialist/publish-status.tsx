import { Typography } from "@mui/material";
import { cn } from "../../../utils";

type Props = {
  isDraft: boolean;
};

function SpecialistPublishStatusBadge({ isDraft }: Props) {
  return (
    <div
      className={cn(
        "py-.5 inline-block rounded-lg px-2",
        isDraft ? "bg-[#C00306]" : "bg-[#18C964]"
      )}
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
    </div>
  );
}

export default SpecialistPublishStatusBadge;
