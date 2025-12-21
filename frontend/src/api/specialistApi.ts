import { TSpecialist } from "@/types";
import { publicApi } from "./apiRequest";

export interface IGetAllSpecialistsResponse {
  count: number;
  data: TSpecialist[];
  totalPages: number;
}

interface QueryParams {
  page_number?: number;
  page_size?: number;
  search?: string;
}

export function getAllSpecialistsApi(params: QueryParams) {
  console.log("🚀 ~ getAllSpecialistsApi ~ params:", params);
  return publicApi.get<IGetAllSpecialistsResponse>(`/api/v1/specialists`, {
    params
  });
}
