import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Specialist } from "./specialist";

@Entity("service_offerings")
export class ServiceOffer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-json")
  specialist: Specialist;

  @ManyToOne(() => Specialist, (specialist) => specialist.service_offerings, {
    onDelete: "CASCADE"
  })
  specialists: Specialist;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
