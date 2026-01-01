import express from "express";
import {
  createPlatformFee,
  getAllPlatformFees,
  getPlatformFeeTier
} from "../controller/platform-fee.controller";
import inputValidator from "../validators/input-validator";
import {
  GetPlatformFeeTierQueryParamsSchema,
  PlatformFeeSchema
} from "../validators/platform-fee.validator";

const router = express.Router();

router
  .route("/")
  // Get platform fee lists
  .get(getAllPlatformFees)
  // Create a platform fee
  .post(inputValidator(PlatformFeeSchema), createPlatformFee);

router
  // Calculate & get platform fee given a base price
  .get(
    "/tier",
    inputValidator(null, null, GetPlatformFeeTierQueryParamsSchema),
    getPlatformFeeTier
  );

// TODO: Edit platform fee
// router.route("/:id").put();

export default router;
