const Products = require("../models/productsSchema");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Products.find().populate("product_brand", ["Name", "Logo"]).populate("product_category")

      return res.status(200).json({
        message: "successfully to get products",
        success: true,
        products,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get products",
        success: false,
        error: error.message,
      });
    }
  },
  addProduct: async (req, res) => {
    console.log(req.body)
    try {
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.product_pic = pic.url;
        req.body.cloudinary = pic.public_id;
      }

      // console.log(req.body);
      const { product_name, product_price, product_amount } = req.body;
      if ((!product_name, !product_amount, !product_price)) {
        throw new Error("missing some info of the product");
      }
      const newProduct = await new Products(req.body);
      await newProduct.save();
      return res.status(200).json({
        message: "all good",
        success: true,
        newProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.product_pic = pic.url;
      }
      const product1 = await Products.findById(id);
      req.body.product_amount = +product1.product_amount + +req.body.product_amount
       const product2 = await Products.findByIdAndUpdate(id, req.body);
      if(product2 & req.file){
        await cloudinary.uploader.destroy(product2.cloudinary, (result) => {
          if (result) console.log(result); 
        });}

      return res.status(200).json({
        message: "successfully to update product",
        success: true,
        product2,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update product",
        success: false,
        error: error.message,
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Products.findById(id);
  
      return res.status(200).json({
        message: "Product in the data base",
        success: true,
        product,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update product",
        success: false,
        error: error.message,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Products.findByIdAndDelete(id);

      if (!product) throw new Error("product dosen't exsit in the data base");
      if(product.product_pic){
        await cloudinary.uploader.destroy(product.cloudinary, (result) => {
          if (result) console.log(result); 
        });}

      return res.status(200).json({
        message: "successfully to delete product",
        success: true,
        deletedProduct: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in deleting product",
        success: false,
        error: error.message,
      });
    }
  },
};
