import express from "express";
import { addSales, getDataById } from "../controllers/salesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/addsales", protect, addSales);
router.get("/getSalesById", getDataById);


export default router;
