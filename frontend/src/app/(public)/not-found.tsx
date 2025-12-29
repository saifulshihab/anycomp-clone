import { Typography } from "@mui/material";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-content-center place-items-center py-20">
      <div className="flex flex-col items-center gap-2">
        <AlertTriangle size={40} />
        <Typography variant="body1" sx={{ fontSize: 40 }}>
          Page Not Found
        </Typography>
        <Link href="/">Back to Home</Link>
      </div>
    </div>
  );
}
