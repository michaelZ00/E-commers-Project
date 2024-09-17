const Ads = require("../models/adsModel")
const cloudinary = require("../utils/cloudinary");

module.exports = {
  getAllAds: async (req, res) => {
    try {
      const ads = await Ads.find();

      return res.status(200).json({
        message: "successfully to get ads",
        success: true,
        ads,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get ads",
        success: false,
        error: error.message,
      });
    }
  },
  addAd: async (req, res) => {
    try {
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.Ad = pic.url;
        req.body.cloudinary = pic.public_id;
      }
      const { Name } = req.body;
      if (!Name) {
        throw new Error("missing the name of the Ad");
      }
      // console.log(req.body);

      const newAd = await new Ads(req.body);
      await newAd.save();
      return res.status(200).json({
        message: "all good",
        success: true,
        newAd,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  updateAd: async (req, res) => {
    try {
      const id = req.params.id;
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.Ad = pic.url;
      }
      const updateAd = req.body;
      const ad = await Ads.findByIdAndUpdate(id, updateAd);
      if (ad & req.file) {
        await cloudinary.uploader.destroy(brand.cloudinary, (result) => {
          if (result) console.log(result);
        });
      }

      return res.status(200).json({
        message: "successfully to update Ad",
        success: true,
        ad,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update Ad",
        success: false,
        error: error.message,
      });
    }
  },
  deleteAd: async (req, res) => {
    try {
      const id = req.params.id;
      const ad = await Ads.findByIdAndDelete(id);
      if (ad) throw new Error("brand dosen't exsit in the data base");
      if (ad.Ad) {
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
