import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Specialist } from "../entity/specialist";

const SpecialistRepository = AppDataSource.getRepository(Specialist);

export const getSpecialists = async (req: Request, res: Response) => {
  const specialists = await SpecialistRepository.find();
  res.json(specialists);
};

export const createSpecialist = async (req: Request, res: Response) => {
  const specialist = SpecialistRepository.create(req.body);
  const result = await SpecialistRepository.save(specialist);
  res.status(201).json(result);
};
