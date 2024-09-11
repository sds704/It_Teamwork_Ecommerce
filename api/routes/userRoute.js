import express from 'express'
import { register, deleteUser, getUsers, login } from '../controllers/userController.js';
import { vendor, authenticateToken, admin } from '../middleware/Auth.js';

const router = express.Router();

// Route to create a new user
router.post('/register', register);

//Route to login
router.post('/login', login);

// Route to get all users
router.get('/', getUsers);

// Route to get users for admin only 
router.get('/admin', getUsers);

// Route to delete a user by ID
router.delete('/:id', authenticateToken, vendor, deleteUser);

// Route to delete a user by ID only for admin
router.delete('/admin/:id', authenticateToken, admin, deleteUser);

// Route to get a user by ID
// router.get('/:id', userController.getUserById);

// Route to update a user by ID
// router.put('/:id', userController.updateUser);


export default router
