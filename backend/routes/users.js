import express from "express";
import {
  applyChanges,
  approvalUserById,
  approvalUsers,
  changePassword,
  getAllRegUsers,
  getPermUser,
  getProfileImage,
  getTempUser,
  getUser,
  login,
  logout,
  permenentReg,
  regConfirm,
  register,
  registerPerm,
  rejectApp,
  test,
  uploadImage,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import multer from "multer";
const upload = multer();
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.post("/regConfirm", protect, regConfirm);
router.post("/permenentReg", protect, permenentReg);
router.post("/upload", upload.single("file"), uploadImage);
router.get("/getTempUser", protect, getTempUser);
router.post("/approvalData", approvalUsers);
router.post("/getApprovalUser", protect, approvalUserById);
router.post("/registerPerm", protect, registerPerm);
router.post("/getPermUsers", getAllRegUsers);
router.get("/profileImage", protect, getProfileImage);
router.post("/applyChanges", protect, applyChanges);
router.post("/changePassword", protect, changePassword);
router.post("/getPermUser", protect, getPermUser);
router.post("/reject", protect, rejectApp);
export default router;






