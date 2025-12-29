import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Specialist } from "./specialist";

export enum MediaType {
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video"
}

export enum MimeType {
  IMAGE_JPEG = "image/jpeg",
  IMAGE_PNG = "image/png",
  IMAGE_WEBP = "image/webp"
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  file_name: string;

  @Column("int", { default: 0 })
  file_size: number;

  @Column("int", { default: 0 })
  display_order: number;

  @Column("enum", { enum: MimeType, nullable: true })
  mime_type: MimeType;

  @Column("enum", { enum: MediaType, nullable: true })
  media_type: MediaType;

  @ManyToOne(() => Specialist, (specialist) => specialist.media, {
    onDelete: "CASCADE"
  })
  specialists: Specialist;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
