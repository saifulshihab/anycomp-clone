import { ISpecialist } from "./specialist";

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

export interface IMedia {
  id: string;
  file_name: string;
  file_size: string;
  display_order: number;
  mime_type: MimeType;
  media_type: MediaType;
  specialists: ISpecialist;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
