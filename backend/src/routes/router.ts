import express from "express";
import platformFeeRoutes from "./platform-fee.route";
import specialistRoutes from "./specialist.route";

const router = express.Router();

router.use("/v1/specialists", specialistRoutes);
router.use("/v1/platform_fee", platformFeeRoutes);

export default router;
