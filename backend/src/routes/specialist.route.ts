import express from "express";
import { upload } from "../config/upload";
import {
  createSpecialist,
  deleteSpecialist,
  getAllSpecialists,
  getSpecialist,
  publishSpecialist,
  uploadSpecialistMedia
} from "../controller/specialist.controller";
import { UUIDParamSchema } from "../validators";
import inputValidator from "../validators/input-validator";
import {
  GetAllSpecialistsQueryParamsSchema,
  SpecialistSchema,
  UploadSpecialistMediaQueryParamsSchema
} from "../validators/specialist.validator";

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
  .get(inputValidator(null, UUIDParamSchema), getSpecialist)
  .delete(inputValidator(null, UUIDParamSchema), deleteSpecialist);

router.post(
  "/media/:id",
  inputValidator(null, UUIDParamSchema, UploadSpecialistMediaQueryParamsSchema),
  upload.array("files", 3),
  uploadSpecialistMedia
);

router.patch(
  "/:id/publish",
  inputValidator(null, UUIDParamSchema),
  publishSpecialist
);

export default router;
