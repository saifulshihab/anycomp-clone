export interface ISpecialistInput {
  title?: string;
  description?: string;
  duration_days?: number;
  additional_offers?: {
    id: string;
    title: string;
  }[];
  base_price?: number;
  platform_fee?: number;
  final_price?: number;
}
