import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { getAddProfit } from "../controllers/profitController.js";

const router = express.Router();

router.get("/getAddProfit", getAddProfit);
export default router;
