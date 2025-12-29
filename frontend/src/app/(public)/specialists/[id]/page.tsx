import { getSpecialistApi } from "@/api/specialistApi";
import Specialist from "@/components/specialist";

type Props = { params: Promise<{ id: string }> };

async function Page(props: Props) {
  const { id } = await props.params;
  const { data } = await getSpecialistApi(id);
  return <Specialist specialist={data} />;
}

export default Page;
