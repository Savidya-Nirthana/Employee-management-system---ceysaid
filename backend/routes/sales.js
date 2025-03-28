import express from "express";
import { addSales, getDataById } from "../controllers/salesController.js";

const router = express.Router();
router.post("/addsales", addSales);
router.get("/getSalesById", getDataById);


export default router;
