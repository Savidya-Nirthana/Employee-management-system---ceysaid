import express from "express";
import {
  applyLeave,
  fetchLeaves,
  getAll,
  getLeaveData,
  leaveAccept,
  leaveStat,
  rejectLeave,
} from "../controllers/leaveController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyLeave);
router.get("/getLeaves", protect, fetchLeaves);
router.post("/accept", protect, leaveAccept);
router.post("/leaveStat", protect, leaveStat);
router.post("/allData", protect, getAll);
router.post("/getUserData", protect, getLeaveData);
router.post("/rejectLeave", protect, rejectLeave);
export default router;
