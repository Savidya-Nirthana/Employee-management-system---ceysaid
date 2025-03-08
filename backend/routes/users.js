import express from "express";
import {
  approvalUserById,
  approvalUsers,
  getAllRegUsers,
  getTempUser,
  getUser,
  login,
  logout,
  permenentReg,
  regConfirm,
  register,
  registerPerm,
  test,
  uploadImage,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// router.get("/getUser", test);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.post("/regConfirm",protect, regConfirm);
router.post("/permenentReg", protect, permenentReg);
router.post("/upload", upload.single("file"),uploadImage);
router.get('/getTempUser', protect, getTempUser);
router.post('/approvalData', approvalUsers);
router.post('/getApprovalUser', protect ,approvalUserById);
router.post('/registerPerm', protect, registerPerm)
router.post('/getPermUsers', getAllRegUsers)

export default router;
