export enum TierName {
  STARTER = "STARTER",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE"
}

export interface IPlatformFee {
  id: string;
  tier_name: TierName;
  min_value: number;
  max_value: number;
  platform_fee_percentage: number;
  created_at: Date;
  updated_at: Date;
}
