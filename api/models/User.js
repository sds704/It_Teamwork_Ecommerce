import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'vendor', 'user'], // Adjust roles as needed
    required: true
  },
  password:{
    type:String,
    required:true,
  }
},
  {
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

export default User;
