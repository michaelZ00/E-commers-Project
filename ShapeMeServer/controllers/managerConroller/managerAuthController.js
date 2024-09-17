const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const Manager = require("../../models/managerModel");

module.exports = {
  addManagerForAdmin: async (req, res) => {
    try {
      const { manager_password, manager_email } = req.body;

      if ((!manager_password, !manager_email)) {
        throw new Error("yoe need to insert all credential fields");
      }

      const hashpass = await hash(manager_password, 10);

      if (!hashpass) throw new Error("try again");

      const user = req.body;
      user.manager_password = hashpass;

      const newManager = new Manager(req.body);
      await newManager.save();

      user.manager_password = "*******";

      return res.status(200).json({
        message: "successfully to register user",
        success: true,
        user: req.body,
      });
    } catch (error) {
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },
  loginManager: async (req, res) => {
    try {

      const { manager_password, manager_email } = req.body;

      if (!manager_password || !manager_email)
        throw new Error("must require all inputs");

      const user = await Manager.findOne({ manager_email });

      if (!user) throw new Error("user dont exist");

      const isMatch = await compare(manager_password, user.manager_password);

      if (!isMatch) throw new Error("user password not valid");

      const payload = { id: user._id, role: "manager" };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      // await Manager.findByIdAndUpdate(user._id, {
      //   token: { token },
      // });

      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
        // secure:true,
        // sameSite:'strict'
      });

      console.log("successefully");

      res.status(200).json({
        message: "successfully to login user",
        success: true,
        user: req.body,
      });
    } catch (e) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: e.message,
      });
    }
  },
  authManager: async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) throw new Error("token not valid");

      const payload = {
        id: decode.id,
        role: decode.role,
      };

      const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      res.cookie("token", newToken, {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
      });

      return res.status(200).json({
        message: "successfully to auth user",
        success: true,
        newToken,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  logOutManager: async (req, res) => {
    try {

      res.clearCookie("token");

      return res.status(200).json({
        message: "successfully to logout user",
        success: true,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  }
};
