import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export enum TierName {
  STARTER = "STARTER",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE"
}

@Entity("platform_fee")
export class PlatformFee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: TierName, nullable: true })
  tier_name: TierName;

  @Column("int", { default: 0 })
  min_value: number;

  @Column("int", { default: 0 })
  max_value: number;

  @Column("numeric", { default: 0, precision: 5, scale: 2 })
  platform_fee_percentage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
