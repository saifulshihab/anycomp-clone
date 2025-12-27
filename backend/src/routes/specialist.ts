import express from "express";
import { upload } from "../config/upload";
import {
  createSpecialist,
  getAllSpecialists,
  getSpecialist,
  uploadSpecialistMedia
} from "../controller/specialist";
import inputValidator from "../validators/input-validator";
import {
  GetAllSpecialistsQueryParamsSchema,
  SpecialistIdParamSchema,
  SpecialistSchema
} from "../validators/specialist-validator";

const router = express.Router();

router
  .route("/")
  .get(
    inputValidator(null, null, GetAllSpecialistsQueryParamsSchema),
    getAllSpecialists
  )
  .post(inputValidator(SpecialistSchema), createSpecialist);

router
  .route("/:id")
  .get(inputValidator(null, SpecialistIdParamSchema), getSpecialist);

router.post(
  "/media/:id",
  inputValidator(null, SpecialistIdParamSchema),
  upload.array("media", 3),
  uploadSpecialistMedia
);

export default router;
