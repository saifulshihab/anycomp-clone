import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Media } from "./media";
import { ServiceOffer } from "./service-offer";

export enum SpecialistVerificationStatus {
  APPROVED = "APPROVED",
  UNDER_REVIEW = "UNDER_REVIEW",
  REJECTED = "REJECTED"
}

@Entity("specialists")
export class Specialist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { unique: true, length: 300 })
  slug: string;

  @Column("varchar", { length: 1200 })
  description: string;

  @Column("decimal", { default: 0, precision: 5, scale: 2 })
  average_rating: number;

  @Column("int", { default: 0 })
  total_number_of_ratings: number;

  @Column("decimal", { default: 0, precision: 10, scale: 2 })
  base_price: number;

  @Column("decimal", { default: 0, precision: 10, scale: 2 })
  platform_fee: number;

  @Column("decimal", { default: 0, precision: 10, scale: 2 })
  final_price: number;

  @Column("int", { default: 0 })
  duration_days: number;

  @Column("boolean", { default: true })
  is_draft: boolean;

  @Column("enum", {
    enum: SpecialistVerificationStatus,
    default: SpecialistVerificationStatus.UNDER_REVIEW
  })
  verification_status: SpecialistVerificationStatus;

  @Column("boolean", { default: false })
  is_verified: boolean;

  @OneToMany(() => Media, (media) => media.specialists, { cascade: true })
  media: Media[];

  @OneToMany(() => ServiceOffer, (offer) => offer.specialists, {
    cascade: true
  })
  service_offerings: ServiceOffer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
