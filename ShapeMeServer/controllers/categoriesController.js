const Categories = require("../models/categoryModel")
const cloudinary = require("../utils/cloudinary");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Categories.find();

      return res.status(200).json({
        message: "successfully to get categories",
        success: true,
        categories,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get categories",
        success: false,
        error: error.message,
      });
    }
  },
  addCategory: async (req, res) => {
    try {

      const { name } = req.body;
      if (!name) {
        throw new Error("missing the name of the category");
      }
      const newcategory = await new Categories(req.body);
      await newcategory.save();
      return res.status(200).json({
        message: "all good",
        success: true,
        newcategory,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const id = req.params.id;
        const { name } = req.body;
      if (!name) {
        throw new Error("missing the name of the category");
      }
      const category = await Categories.findByIdAndUpdate(id, {name:name});
      console.log(category)
      return res.status(200).json({
        message: "successfully to update category",
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update category",
        success: false,
        error: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Categories.findByIdAndDelete(id);
      if (!category) throw new Error("category dosen't exsit in the data base");
      return res.status(200).json({
        message: "successfully to delete category",
        success: true,
        deletedcategory: category,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in deleting category",
        success: false,
        error: error.message,
      });
    }
  },
};
