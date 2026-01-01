import { AppDataSource } from "../config/data-source";
import { PlatformFee, TierName } from "../entity/platform-fee.entity";

const platformFeeSeedData = [
  {
    tier_name: TierName.STARTER,
    min_value: 0,
    max_value: 1000,
    platform_fee_percentage: 5
  },
  {
    tier_name: TierName.PROFESSIONAL,
    min_value: 1001,
    max_value: 5000,
    platform_fee_percentage: 8
  },
  {
    tier_name: TierName.ENTERPRISE,
    min_value: 5001,
    max_value: 99999,
    platform_fee_percentage: 20
  }
];

const PlatformFeeRepository = AppDataSource.getRepository(PlatformFee);

export async function seedPlatFormFeeData() {
  try {
    const platformFeeTiers = await PlatformFeeRepository.find();
    if (!platformFeeTiers.length) {
      // Data not available, seed data
      console.log("Seeding platform fee data....");
      for (const feeTier of platformFeeSeedData) {
        const tier = PlatformFeeRepository.create(feeTier);
        await PlatformFeeRepository.save(tier);
      }
      console.log("Platform fee data seeded successfully.");
    }
  } catch (err) {
    console.error("Failed to seed platform fee data.", err);
  }
}
