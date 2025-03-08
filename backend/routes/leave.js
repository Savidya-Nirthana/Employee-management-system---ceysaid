import express from 'express';
import { applyLeave } from '../controllers/leaveController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();



router.post('/apply', protect ,applyLeave);



export default router