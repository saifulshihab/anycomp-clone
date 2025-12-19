import express from "express";
import specialistRoutes from "./specialist";

const router = express.Router();

router.use("/v1/specialists", specialistRoutes);

export default router;
