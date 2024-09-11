import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';
import { authenticateToken } from '../middleware/Auth.js';

const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/', getAllOrders);
router.get('/:id', authenticateToken, getOrderById);
router.put('/:id', authenticateToken, updateOrderStatus);
router.delete('/:id', authenticateToken, deleteOrder);

export default router;
