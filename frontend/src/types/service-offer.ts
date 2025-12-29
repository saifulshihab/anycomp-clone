import { ISpecialist } from "./specialist";

export interface IServiceOffer {
  id: string;
  specialist: ISpecialist;
  created_at: Date;
  updated_at: Date;
}
