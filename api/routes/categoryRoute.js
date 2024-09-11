import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryController.js';
import { authenticateToken, vendor } from '../middleware/Auth.js';

const router = express.Router();


// Create a new category
router.post('/', authenticateToken, vendor, createCategory);

// Get all categories
router.get('/', getCategories);

// Get a category by ID
// router.get(':id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', authenticateToken, vendor, updateCategory);

// Delete a category by ID
router.delete('/:id', authenticateToken, vendor, deleteCategory);

export default router
