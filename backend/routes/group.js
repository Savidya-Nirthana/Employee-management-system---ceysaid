import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getData, saveData, uploadGoupContent } from "../controllers/groupController.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/saveData", protect, saveData);
router.post("/upload", protect, upload.single("file"), uploadGoupContent);
router.get('/getData', protect, getData);
export default router;
