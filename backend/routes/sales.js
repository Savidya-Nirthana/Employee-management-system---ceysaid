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
  uploadSalesContent,
  getConfirmedFiles,
  getOperationPersons,
  uploadaOperationFin,
  pushUrls,
  getProcessData,
  setComplete,
  userState,
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
router.get("/getOperationPersons", protect, getOperationPersons);
router.post(
  "/uploadFilesFin",
  protect,
  upload.array("files"),
  uploadaOperationFin
);
router.post("/updateUrls", protect, pushUrls);
router.post("/getProcess", protect, getProcessData);
router.post("/setComplete", protect, setComplete);
router.post("/getStat", protect, userState);
export default router;
