import express from "express";
import {
  addSales,
  approveData,
  getAllData,
  getApprovedData,
  getDataById,
  lockedControll,
  opData,
  salesConfirmation,
  saveFiles,
  unlockedControll,
  uploadConfimation,
  getConfirmedFiles,
  uploadSalesContent,
} from "../controllers/salesController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";

const upload = multer();
const router = express.Router();

router.post("/addsales", protect, addSales);
router.get("/getSalesById", getDataById);
router.get("/getAllData", getAllData);
router.post("/opData", protect, opData);
router.get("/getApprove", approveData);
router.get("/locked", lockedControll);
router.get("/unlocked", unlockedControll);
router.post("/OpFiles", protect, upload.single("file"), uploadSalesContent);
router.post("/saveFiles", protect, saveFiles);
router.get("/getApproved", getApprovedData);
router.post("/conFiles", protect, upload.single("file"), uploadConfimation);
router.post("/sendConfirmation", protect, salesConfirmation);
router.get("/getConfirmedFiles", getConfirmedFiles);
export default router;
