import express from 'express'
import { getUser, login, logout, register, test } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

// router.get("/getUser", test);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/getUser", protect ,getUser);


export default router;