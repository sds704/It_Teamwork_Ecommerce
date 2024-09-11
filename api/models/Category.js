import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
},
{
  timestamps:true,
}
);

const Category =  mongoose.model('Category', CategorySchema);

export default Category;
