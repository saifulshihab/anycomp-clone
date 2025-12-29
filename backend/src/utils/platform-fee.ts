import { AppDataSource } from "../config/data-source";
import { PlatformFee } from "../entity/platform-fee";

/**
 * Calculate platform fee given a specialist base price
 * Will return applicable tier & fee amount
 */
export const calculatePlatformFee = async (base_price: number) => {
  const PlatformFeeRepo = AppDataSource.getRepository(PlatformFee);

  const tier = await PlatformFeeRepo.createQueryBuilder("fee")
    .where(":price BETWEEN fee.min_value AND fee.max_value", {
      price: base_price
    })
    .getOne();

  if (!tier) return null;

  const applicable_fee_amount =
    (base_price * Number(tier.platform_fee_percentage)) / 100;

  return { tier, applicable_fee_amount };
};
