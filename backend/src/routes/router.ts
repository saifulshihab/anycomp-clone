import express from "express";
import platformFeeRoutes from "./platform-fee";
import specialistRoutes from "./specialist";

const router = express.Router();

router.use("/v1/specialists", specialistRoutes);
router.use("/v1/platform_fee", platformFeeRoutes);

export default router;
