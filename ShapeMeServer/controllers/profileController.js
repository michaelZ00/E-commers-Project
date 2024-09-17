const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");
const { hash, compare } = require("bcrypt");

module.exports = {
  getUserByEmail: async (req, res) => {
    try {
      // Find the user by email
      console.log(req.body.email);
      const user = await User.findOne({ email: req.body.email }); // Get email from request parameters
      console.log(user.email);
      console.log(req.user);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },
  upDataProfileByEmail: async (req, res) => {
    try {
      // Find the user by email
      // console.log("--------   ",req.body, "   -----------");

      // Get email from request parameters
      const upDatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      console.log("I am here, this is the user's email: ", upDatedUser?.email);

      if (!upDatedUser) throw new Error("User not found");

      // Update user fields
      // Object.keys(req.body).forEach((key) => {
      //   upDatedUser[key] = req.body[key];
      // });

      // await upDatedUser.save(); // Save the updated user
 
      return res.status(200).json({
        success: true,
        upDatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },
  upDataWorkOutByEmail: async (req, res) => {
    try {
      // Find the user by email

      console.log(req.body.email);

      let user = await User.findOne({ email: req.body.email }); // Get email from request parameters

      console.log("I am here, this is the user's email: ", user?.email);

      if (!user) throw new Error("User not found");

      // Update user fields
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });

      await user.save(); // Save the updated user

      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  },
  addProfileImage: async (req, res) => {
    try {
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.profileImage = pic.url;
        req.body.cloudinary = pic.public_id;
      }
      console.log(req.body.email);
      let user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error("User not found");

      user.profileImage = req.body.profileImage;
      user.cloudinary = req.body.cloudinary;

      await user.save();

      return res.status(200).json({
        message: "Successfully added profile image",
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to add profile image",
        success: false,
        error: error.message,
      });
    }
  },
  updateProfileImage: async (req, res) => {
    try {
      if (req.file) {
        const pic = await cloudinary.uploader.upload(req.file.path);
        req.body.profileImage = pic.url;
      }
      console.log(req.body.email);
      let user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error("User not found");

      user.profileImage = req.body.profileImage;
      await user.save();

      if (user & req.file) {
        await cloudinary.uploader.destroy(user.cloudinary, (result) => {
          if (result) console.log(result);
        });
      }

      return res.status(200).json({
        message: "Successfully updated profile image",
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update profile image",
        success: false,
        error: error.message,
      });
    }
  },
  upDataPasswordByEmail: async (req, res) => {
    try {
      // const userEmail = req.body.email;
      const { newPassword, confirmPassword, currentPassword, email } = req.body;
      if (!newPassword || !confirmPassword || !currentPassword || !email)
        throw new Error("All inputs must be valid");

      if (newPassword !== confirmPassword)
        throw new Error("Passwords do not match");

      console.log("hhhhhhhhhhhh" ,email);

      const user = await User.findOne({ email });
      console.log(user);
      if (!user) throw new Error("Email not exist");

      const isMathPassword  = await compare(currentPassword, user.password)
      console.log(isMathPassword)
      if(!isMathPassword) throw new Error("incurrect password")
      
      const createPassword = await hash(newPassword, 10)
      user.password = createPassword
      await user.save()  

      return res.status(200).json({
        message: "Successfully updated password image",
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update password image",
        success: false,
        error: error.message,
      });
    }
  },
};
