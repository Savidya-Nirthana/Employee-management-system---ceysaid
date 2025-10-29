import express from 'express';
import { applyLeave, fetchLeaves } from '../controllers/leaveController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();



router.post('/apply', protect ,applyLeave);
router.get('/getLeaves', protect, fetchLeaves);


export default router