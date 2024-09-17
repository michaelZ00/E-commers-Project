const Brands = require("../models/brandModel");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  getAllBrands: async (req, res) => {
    try {
      const brands = await Brands.find();

      return res.status(200).json({
        message: "successfully to get brands",
        success: true,
        brands,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get brands",
        success: false,
        error: error.message,
      });
    }
  },
  addBrands: async (req, res) => {
    try {
      console.log("hwt",req.file)
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.Logo = pic.url;
        req.body.cloudinary = pic.public_id;
      }

      // console.log(req.body);
      const { Name } = req.body;
      if (!Name) {
        throw new Error("missing the name of the brand");
      }
      const newBrand = await new Brands(req.body);
      await newBrand.save();
      return res.status(200).json({
        message: "all good",
        success: true,
        newBrand,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  updateBrand: async (req, res) => {
    try {
      const id = req.params.id;
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.Logo = pic.url;
      }
      const updateBrand = req.body;
      const brand = await Brands.findByIdAndUpdate(id, updateBrand);
      
      if (brand & req.file) {
        await cloudinary.uploader.destroy(brand.cloudinary, (result) => {
          if (result) console.log(result);
        });
      }

      return res.status(200).json({
        message: "successfully to update Brand",
        success: true,
        brand,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update Brand",
        success: false,
        error: error.message,
      });
    }
  },
  deleteBrand: async (req, res) => {
    try {
      const id = req.params.id;
      const brand = await Brands.findByIdAndDelete(id);
      if (!brand) throw new Error("brand dosen't exsit in the data base");
      if (brand.Logo) {
        await cloudinary.uploader.destroy(brand.cloudinary, (result) => {
          if (result) console.log(result);
        });
      }
      return res.status(200).json({
        message: "successfully to delete brand",
        success: true,
        deletedbrand: brand,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in deleting brand",
        success: false,
        error: error.message,
      });
    }
  },
};
