import { TSpecialist } from "@/types";
import { publicApi } from "./apiRequest";

export interface IGetAllSpecialistsResponse {
  count: number;
  data: TSpecialist[];
  page: number;
  totalPages: number;
}

export interface IIGetAllSpecialistsParams {
  page_number?: number;
  page_size?: number;
  is_draft?: string;
  search?: string;
}

export function getAllSpecialistsApi(params: IIGetAllSpecialistsParams) {
  return publicApi.get<IGetAllSpecialistsResponse>(`/api/v1/specialists`, {
    params
  });
}
