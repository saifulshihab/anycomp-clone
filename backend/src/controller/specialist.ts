import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Media, MediaType } from "../entity/media";
import { Specialist } from "../entity/specialist";

const SpecialistRepository = AppDataSource.getRepository(Specialist);
const MediaRepository = AppDataSource.getRepository(Media);

// Get all specialists
export const getAllSpecialists = async (req: Request, res: Response) => {
  // Default values
  let pageNo = 1;
  let pageSize = 10;

  const search = req.query.search || "";
  const is_draft = req.query.is_draft || "";

  if (req.query.page_number) pageNo = Number(req.query.page_number);
  if (req.query.page_size) pageSize = Number(req.query.page_size);

  const qb = SpecialistRepository.createQueryBuilder("specialist");

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
    where: { id: req.params.id as string }
  });
  if (!specialist) {
    return res.status(404).json({ message: "Item not found!" });
  }
  res.json(specialist);
};

// Create a specialist
export const createSpecialist = async (req: Request, res: Response) => {
  const specialist = SpecialistRepository.create(req.body);
  const savedSpecialist = await SpecialistRepository.save(specialist);
  res.status(201).json(savedSpecialist);
};

// Upload media for a specialist
export const uploadSpecialistMedia = async (req: Request, res: Response) => {
  const specialistId = req.params.id as string;

  if (req.files && req.files.length) {
    // Upload media files
    for (const file of req.files as Express.Multer.File[]) {
      const media = MediaRepository.create({
        file_name: file.filename,
        file_size: file.size,
        display_order: 1,
        media_type: MediaType.AUDIO,
        mime_type: file.mimetype,
        specialists: specialistId
      } as any);
      await MediaRepository.save(media);
    }
  }

  res.json({ message: "Media uploaded successfully." });
};

// Edit specialist
export const editSpecialist = async (req: Request, res: Response) => {
  console.log(req.params);
  const specialist = await SpecialistRepository.findOne({
    where: { id: req.params.id as string }
  });
  res.json(specialist);
};

// Delete a specialist
export const deleteSpecialist = async (req: Request, res: Response) => {
  await SpecialistRepository.delete(req.params.id as string);
  res.json({ message: "Specialist deleted." });
};
