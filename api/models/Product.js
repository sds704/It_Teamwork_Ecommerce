import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  price: {
    type: String,
    required: true
  },
  productImageUrl: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  size: {
    type: [String], // Change from String to [String] to allow an array
    enum: ["S", "M", "L", "XL", "XXL"], // Valid values for the size array
    default: ["S", "M", "L", "XL", "XXL"],
  },
},
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product
