import {
  ISpecialist,
  ISpecialistInput,
  ISpecialistWithMediaAndOfferings
} from "@/types/specialist";
import { publicApi } from "./apiRequest";

export interface IGetAllSpecialistsResponse {
  count: number;
  data: ISpecialist[];
  page: number;
  totalPages: number;
}

export interface IIGetAllSpecialistsParams {
  page_number?: string;
  page_size?: string;
  is_draft?: string;
  search?: string;
}

export function getAllSpecialistsApi(params: IIGetAllSpecialistsParams) {
  return publicApi.get<IGetAllSpecialistsResponse>("/api/v1/specialists", {
    params
  });
}

export function getSpecialistApi(specialistId: string) {
  return publicApi.get<ISpecialistWithMediaAndOfferings>(
    `/api/v1/specialists/${specialistId}`
  );
}

export function createSpecialistApi(data: ISpecialistInput) {
  return publicApi.post<ISpecialist>("/api/v1/specialists", data);
}

export function publishSpecialistApi(specialistId: string) {
  return publicApi.patch<ISpecialist>(
    `/api/v1/specialists/${specialistId}/publish`
  );
}

export function uploadSpecialistMediaApi(
  specialistId: string,
  formData: FormData,
  params: { display_order: string }
) {
  return publicApi.post<IGetAllSpecialistsResponse>(
    `/api/v1/specialists/media/${specialistId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      params
    }
  );
}

export function deleteSpecialistApi(specialistId: string) {
  return publicApi.delete(`/api/v1/specialists/${specialistId}`);
}
