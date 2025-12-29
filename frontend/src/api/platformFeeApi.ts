import { IPlatformFee } from "@/types/platform-fee";
import { publicApi } from "./apiRequest";

export interface IPlatformFeeTierResponse {
  tier: IPlatformFee;
  applicable_fee_amount: number;
}

export function getPlatformFeeTierApi(basePrice: number) {
  return publicApi.get<IPlatformFeeTierResponse>("/api/v1/platform_fee/tier", {
    params: { base_price: basePrice }
  });
}


