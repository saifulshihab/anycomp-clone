import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Media, MediaType, MimeType } from "../entity/media";
import { ServiceOffer } from "../entity/service-offer";
import { Specialist } from "../entity/specialist";
import { calculatePlatformFee } from "../utils/platform-fee";
import {
  createSpecialistUniqueSlug,
  deleteFileFromDisk
} from "../utils/specialist";

const SpecialistRepository = AppDataSource.getRepository(Specialist);
const MediaRepository = AppDataSource.getRepository(Media);
const ServiceOfferRepository = AppDataSource.getRepository(ServiceOffer);

// Get all specialists
export const getAllSpecialists = async (req: Request, res: Response) => {
  // Default values
  let pageNo = 1;
  let pageSize = 10;

  const search = req.query.search || "";
  const is_draft = req.query.is_draft || "";

  if (req.query.page_number) pageNo = Number(req.query.page_number);
  if (req.query.page_size) pageSize = Number(req.query.page_size);

  const qb = SpecialistRepository.createQueryBuilder(
    "specialist"
  ).leftJoinAndSelect("specialist.media", "media");

  // Filtering & searching
  if (is_draft) {
    qb.where("(specialist.is_draft = :is_draft)", {
      is_draft: is_draft === "true" ? true : false
    });
  }

  if (search) {
    qb.andWhere("(specialist.title ILIKE :search)", {
      search: `%${search}%`
    });
  }

  // Apply pagination
  qb.skip((pageNo - 1) * pageSize).take(pageSize);

  const [specialists, count] = await qb.getManyAndCount();

  res.json({
    count,
    data: specialists,
    page: pageNo,
    totalPages: Math.ceil(count / pageSize)
  });
};

// Get a specialist
export const getSpecialist = async (req: Request, res: Response) => {
  const specialist = await SpecialistRepository.findOne({
    where: { id: req.params.id as string },
    relations: { media: true, service_offerings: true }
  });
  if (!specialist) {
    return res.status(404).json({ message: "Specialist not found!" });
  }
  res.json(specialist);
};

// Create a specialist
export const createSpecialist = async (req: Request, res: Response) => {
  const { title, description, base_price, service_offerings, duration_days } =
    req.body;

  // Create slug
  const slug = await createSpecialistUniqueSlug(title);

  // Calculate final price with platform fee
  const result = await calculatePlatformFee(base_price);
  if (!result) {
    return res
      .status(400)
      .json({ message: "Failed to calculate platform fee." });
  }

  const platform_fee = result.applicable_fee_amount;
  const final_price = base_price + platform_fee;

  const specialist = new Specialist();

  specialist.title = title;
  specialist.description = description;
  specialist.slug = slug;
  specialist.base_price = base_price;
  specialist.platform_fee = platform_fee;
  specialist.duration_days = duration_days;
  specialist.final_price = final_price;

  const savedSpecialist = await SpecialistRepository.save(specialist);

  // Create additional service offerings
  for (const offer of service_offerings as { id: string; title: string }[]) {
    const specialistOffer = await SpecialistRepository.findOne({
      where: { id: offer.id }
    });
    if (!specialistOffer) {
      return res
        .status(400)
        .json({ message: "Failed to create additional service offerings." });
    }

    const newOffer = new ServiceOffer();

    newOffer.specialist = specialistOffer;
    newOffer.specialists = savedSpecialist;

    await ServiceOfferRepository.save(newOffer);
  }

  res.status(201).json(savedSpecialist);
};

// Upload media for a specialist
export const uploadSpecialistMedia = async (req: Request, res: Response) => {
  const specialistId = req.params.id as string;
  const displayOrder = JSON.parse(req.query.display_order as any);

  const specialist = await SpecialistRepository.findOne({
    where: { id: specialistId }
  });
  if (!specialist) {
    return res
      .status(400)
      .json({ message: "Failed to upload specialist media." });
  }

  // Upload media files
  if (req.files && req.files.length) {
    let index = 1;
    for (const file of req.files as Express.Multer.File[]) {
      const media = new Media();
      media.file_name = file.filename;
      media.file_size = file.size;
      media.display_order = displayOrder[file.originalname];
      media.media_type = MediaType.IMAGE;
      media.mime_type = file.mimetype as MimeType;
      media.specialists = specialist;

      await MediaRepository.save(media);
      index++;
    }
  }

  res.json({ message: "Media uploaded successfully." });
};

// Publish a specialist
export const publishSpecialist = async (req: Request, res: Response) => {
  const specialistId = req.params.id as string;

  const specialist = await SpecialistRepository.findOne({
    where: { id: specialistId }
  });
  if (!specialist) {
    return res.status(404).json({ message: "Specialist not found!" });
  }

  specialist.is_draft = false;
  await SpecialistRepository.save(specialist);

  res.json(specialist);
};

// Edit specialist
export const editSpecialist = async (req: Request, res: Response) => {
  const specialist = await SpecialistRepository.findOne({
    where: { id: req.params.id as string }
  });
  res.json(specialist);
};

// Delete a specialist
export const deleteSpecialist = async (req: Request, res: Response) => {
  const specialistId = req.params.id as string;

  const imageFileNames: string[] = [];
  const images = await MediaRepository.createQueryBuilder("media")
    .where("media.specialists = :specialistId", { specialistId })
    .getMany();

  images.forEach((image) => {
    imageFileNames.push(image.file_name);
  });

  await SpecialistRepository.delete(specialistId);
  // Delete image files
  deleteFileFromDisk(imageFileNames);

  res.json({ message: "Specialist deleted." });
};
