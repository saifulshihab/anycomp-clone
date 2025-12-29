import { getAllSpecialistsApi } from "@/api/specialistApi";
import SpecialistList from "@/components/home/specialist-list";
import { Typography } from "@mui/material";

export default async function Home() {
  const { data } = await getAllSpecialistsApi({ is_draft: "false" });
  return (
    <div>
      <div className="my-4">
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Register a New Company
        </Typography>
        <Typography variant="body2" color="#888">
          Get Your Company Registered with a Trusted Specialists
        </Typography>
      </div>
      <SpecialistList specialists={data.data} />
    </div>
  );
}
