export enum SpecialistVerificationStatus {
  APPROVED = "APPROVED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REJECTED = "REJECTED"
}

export type TSpecialist = {
  id: string;
  title: string;
  slug: string;
  description: string;
  average_rating?: number;
  total_number_of_ratings?: number;
  base_price?: number;
  platform_fee?: number;
  final_price?: number;
  duration_days?: number;
  is_draft: boolean;
  verification_status?: SpecialistVerificationStatus;
  is_verified: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
