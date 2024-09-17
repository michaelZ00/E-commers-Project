const User = require("../models/userModel");
const { filter } = require("../utils/userFunctionalty");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const unfilterUsers = await User.find().populate();
      const users = filter(unfilterUsers);
      if (!users) throw new Error("No users found");
      return res.status(200).json({
        message: "successfully to get users",
        success: true,
        users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get users",
        success: false,
        error: error.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) throw new Error("User not found");

      return res.status(200).json({
        message: "successfully to get user",
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in get user",
        success: false,
        error: error.message,
      });
    }
  },
  postUser: async (req, res) => {
    try {
      const { name, lastName, email, address } = req.body;

      if (!name || !lastName || !email || !address)
        throw new Error("all inputs required");
      const newUser = new User(req.body);
      const savedUser = await newUser.save();

      console.log("Data saved:", savedUser);

      return res.status(200).json({
        message: "successfully to register user",
        success: true,
        savedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },
  putUser: async (req, res) => {
    try {
      const idUser = req.params.id;
      const upDataUser = req.body;

      const upDatedUser = await User.findByIdAndUpdate(idUser, upDataUser, {
        new: true,
      });

      if (!upDatedUser) throw new Error("User not found");

      return res.status(200).json({
        message: "successfully to update user",
        success: true,
        upDatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update user",
        success: false,
        error: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;

      const users = await User.find();

      // Count the number of users with the 'admin' role
      const adminCount = users.filter((user) => user.role === "admin").length;

      // Find the user whose role is being updated
      const currentUser = await User.findById(id);

      // Check if the user is trying to change their own role and if they are the only admin
      if (currentUser.role === "admin" && adminCount <= 1) {
        throw new Error(
          "Cannot delete this user because you are the only admin left."
        );
      }

      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error("User not found");

      return res.status(200).json({
        message: "successfully to delete user",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "did not delete user",
        success: false,
        error: error.message,
      });
    }
  },
  upDataUserRole: async (req, res) => {
    try {
      const id = req.params.id;
      const { role } = req.body;

      // Find all users to check the roles
      const users = await User.find();

      // Count the number of users with the 'admin' role
      const adminCount = users.filter((user) => user.role === "admin").length;

      // Find the user whose role is being updated
      const currentUser = await User.findById(id);

      // Check if the user is trying to change their own role and if they are the only admin
      if (currentUser.role === "admin" && adminCount <= 1) {
        throw new Error(
          "Cannot change role because you are the only admin left."
        );
      }

      const upDatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      );
      console.log(upDatedUser.role);
      return res.status(200).json({
        message: "Successfully changed user role",
        success: true,
        upDatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Did not change user role",
        success: false,
        error: error.message,
      });
    }
  },
};
