import Category from "../models/Category.js";

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { type, ownerId } = req.body;

    const category = new Category({
      type,
      ownerId
    });

    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error: error.message });
  }
};

// Get a category by ID
// const getCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving category', error: error.message });
//   }
// };

// Update a category by ID
const updateCategory = async (req, res) => {
  try {
    const { type } = req.body;

    const category = await Category.findByIdAndUpdate(req.params.id, { type }, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};


export {createCategory, getCategories, updateCategory, deleteCategory}