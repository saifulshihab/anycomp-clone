import {
  getAllSpecialistsApi,
  IIGetAllSpecialistsParams
} from "@/api/specialistApi";
import SpecialistList from "@/components/home/specialist-list";
import SpecialistPagination from "@/components/home/specialist-pagination";
import { Typography } from "@mui/material";

type Props = {
  searchParams: Promise<IIGetAllSpecialistsParams>;
};

export default async function Page(props: Props) {
  const { searchParams } = props;
  const { page_number, page_size } = await searchParams;
  const { data } = await getAllSpecialistsApi({
    is_draft: "false",
    page_number,
    page_size
  });

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
      <SpecialistPagination totalPages={data.totalPages} />
    </div>
  );
}
