import * as z from "zod";
import { TierName } from "../entity/platform-fee.entity";

export const PlatformFeeSchema = z.object({
  tier_name: z.enum(TierName, { error: "Invalid tier name." }),
  min_value: z.number("Tier minimum value is required."),
  max_value: z.number("Tier maximum value is required."),
  platform_fee_percentage: z.number("Platform fee percentage is required.")
});

export const GetPlatformFeeTierQueryParamsSchema = z.object({
  base_price: z.string("Base price query param is required.")
});
