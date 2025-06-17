import express from "express";
import { addSales, getAllData, getDataById } from "../controllers/salesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/addsales", protect, addSales);
router.get("/getSalesById", getDataById);
router.get("/getAllData", getAllData);


export default router;
