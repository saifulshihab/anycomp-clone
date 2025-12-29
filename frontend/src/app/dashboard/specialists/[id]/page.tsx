"use client";

import { apiErrorHandler } from "@/api/apiErrorHandler";
import { getSpecialistApi } from "@/api/specialistApi";
import Specialist from "@/components/specialist";
import { ISpecialistWithMediaAndOfferings } from "@/types/specialist";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const { id } = useParams();

  const [specialist, setSpecialist] = useState<
    ISpecialistWithMediaAndOfferings | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await getSpecialistApi(id as string);
        setSpecialist(data);
      } catch (err) {
        apiErrorHandler(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return <Specialist isLoading={isLoading} specialist={specialist} />;
}

export default Page;
