import express from "express";
import { createSpecialist, getSpecialists } from "../controller/specialist";

const router = express.Router();

router.route("/").get(getSpecialists).post(createSpecialist);

export default router;
