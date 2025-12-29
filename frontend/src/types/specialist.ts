import { IMedia } from "./media";
import { IServiceOffer } from "./service-offer";

export enum SpecialistVerificationStatus {
  APPROVED = "APPROVED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REJECTED = "REJECTED"
}

export interface ISpecialist {
  id: string;
  title: string;
  slug: string;
  description: string;
  average_rating: number;
  total_number_of_ratings: number;
  base_price: number;
  platform_fee: number;
  final_price: number;
  duration_days: number;
  is_draft: boolean;
  verification_status: SpecialistVerificationStatus;
  is_verified: boolean;
  media: IMedia[];
  service_offerings: IServiceOffer[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ISpecialistInput {
  title?: string;
  description?: string;
  duration_days?: number;
  base_price?: number;
  platform_fee?: number;
  final_price?: number;
  service_offerings?: {
    id: string;
    title: string;
  }[];
}

export interface ISpecialistWithMediaAndOfferings extends ISpecialist {
  media: IMedia[];
  service_offerings: IServiceOffer[];
}
