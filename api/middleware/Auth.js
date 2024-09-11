import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "7d"
//   });
// };

// Middleware to verify JWT
const authenticateToken = async (req, res, next) => {
  let token;

  // Check if token exists in the header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

    try {
      // Set token from bearer token in header
      token = req.headers.authorization.split(" ")[1];

      // Verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user id from decoded token
      req.user = await User.findById(decoded.id).select("-password");

      // Check if user exists
      // if (!req.user) {
      //   return res.status(401).json({ message: "User not found" });
      // }

      next();

    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};


//vendor middleware
const vendor = (req, res, next) => {
  if (req.user && req.user.role === "vendor") {
    next()
  } else {
    return res.status(404).json({ message: "Not authorized as an vendor" })
  }
}

//admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    return res.status(404).json({ message: "Not authorized as an admin" })
  }
}

export {  authenticateToken, vendor, admin };
