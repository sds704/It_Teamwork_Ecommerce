import User from "../models/User.js";
import { config } from 'dotenv';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

config()

// Create a new user
const register = async (req, res) => {

  try {
    const { name, email, role, password } = req.body;
    const userExist = await User.findOne({ email })

    if (userExist) {
    return  res.status(400).json({ message: "User already exist" })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,


    })
    //if user is created send data and token to user
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })

    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,  // Replace with your actual JWT secret
      { expiresIn: '7d' }  // Token expires in 1 hour
    );

    // If login is successful, return user data and token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export { register, login, getUsers, deleteUser }