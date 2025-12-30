"use client";

import { apiErrorHandler } from "@/api/apiErrorHandler";
import { getSpecialistApi, publishSpecialistApi } from "@/api/specialistApi";
import Specialist from "@/components/specialist";
import { revalidateHomePage } from "@/lib/actions";
import { ISpecialistWithMediaAndOfferings } from "@/types/specialist";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const { id } = useParams();
  // Assume user id logged in dashboard
  const isAuthenticated = true;
  const [specialist, setSpecialist] = useState<
    ISpecialistWithMediaAndOfferings | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSpecialistApi(id as string);
        setSpecialist(data);
      } catch (err) {
        apiErrorHandler(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const onPublish = async () => {
    try {
      if (!isAuthenticated || !specialist?.id) return;
      setIsPublishing(true);
      await publishSpecialistApi(specialist.id);
      toast.success("Specialist published successfully.");
      // Redirect to all specialists page after the specialist was published
      revalidateHomePage();
    } catch (err) {
      apiErrorHandler(err as AxiosError);
    } finally {
      setIsPublishing(false);
    }
  };
  return (
    <Specialist
      isLoading={isLoading}
      specialist={specialist}
      isPublishing={isPublishing}
      isAuthenticated={isAuthenticated}
      onPublish={onPublish}
    />
  );
}

export default Page;
