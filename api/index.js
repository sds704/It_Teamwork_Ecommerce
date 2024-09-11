import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDb from './config/db.js';
import userRoute from './routes/userRoute.js';
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRouter.js'
import orderRoute from './routes/orderRoute.js'

config(); // Load environment variables from .env file

const app = express();

// Parse incoming requests as JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to the database
connectDb();


// Routes

app.use('/api/users', userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

const PORT = process.env.PORT || 5000; // Use PORT from environment or default to 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




