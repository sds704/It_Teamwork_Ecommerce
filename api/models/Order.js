import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      size: {
        type: String,
        required: true,
        default: "M",
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  addressInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
    default:"COD",
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['Processing', 'Confirmed', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
