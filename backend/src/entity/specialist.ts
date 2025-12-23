import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

enum SpecialistVerificationStatus {
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

  @Column("decimal", { default: 0 })
  average_rating: number;

  @Column("int", { default: 0 })
  total_number_of_ratings: number;

  @Column("decimal", { default: 0 })
  base_price: number;

  @Column("decimal", { default: 0 })
  platform_fee: number;

  @Column("decimal", { default: 0 })
  final_price: number;

  @Column("int", { default: 0 })
  duration_days: number;

  @Column("boolean", { default: false })
  is_draft: boolean;

  @Column("enum", { enum: SpecialistVerificationStatus, nullable: true })
  verification_status: SpecialistVerificationStatus;

  @Column("boolean", { default: false })
  is_verified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
