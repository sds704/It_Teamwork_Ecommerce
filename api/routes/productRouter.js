import express from 'express';
import {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteAllProducts,
  deleteProductById
} from '../controllers/productController.js';
import { authenticateToken, vendor } from '../middleware/Auth.js';

const router = express.Router();

// Route to create a new product
router.post('/', authenticateToken, vendor, createProduct);

// Route to update an existing product by ID
router.put('/:id', authenticateToken, vendor, updateProduct);

// Route to get all products
router.get('/', getAllProducts);

// Route to delete all products
router.delete('/', authenticateToken, vendor, deleteAllProducts);

// Route to delete a product by ID
router.delete('/:id', authenticateToken, vendor, deleteProductById);

export default router;
