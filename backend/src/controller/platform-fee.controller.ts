import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { PlatformFee } from "../entity/platform-fee.entity";
import { calculatePlatformFee } from "../utils/platform-fee.utils";

const PlatformFeeRepository = AppDataSource.getRepository(PlatformFee);

// Get all platform fee
export const getAllPlatformFees = async (req: Request, res: Response) => {
  const platformFees = await PlatformFeeRepository.find();
  res.json(platformFees);
};

// Create a platform fee
export const createPlatformFee = async (req: Request, res: Response) => {
  const { tier_name } = req.body;

  const tierExist = await PlatformFeeRepository.findOne({
    where: { tier_name }
  });

  if (tierExist) {
    // A platform can't have multiple fee for same tier
    return res.status(400).json({
      message: `Platform fee tier named '${tier_name}' already exist.`
    });
  }

  const platformFee = PlatformFeeRepository.create(req.body);
  const savedPlatformFee = await PlatformFeeRepository.save(platformFee);
  res.status(201).json(savedPlatformFee);
};

// Get platform fee tier, will return applicable fee given a price
export const getPlatformFeeTier = async (req: Request, res: Response) => {
  const { base_price } = req.query;

  const result = await calculatePlatformFee(base_price as unknown as number);

  if (!result) {
    return res
      .status(404)
      .json({ message: "Couldn't found platform fee tier for this price." });
  }
  const { tier, applicable_fee_amount } = result;

  res.json({ tier, applicable_fee_amount });
};
