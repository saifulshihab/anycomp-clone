import express from "express";
import {
  createSpecialist,
  getAllSpecialists,
  getSpecialist
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

export default router;
