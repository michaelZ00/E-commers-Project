const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../middleware/malier");
const crypto = require("crypto");

module.exports = {
  addAdmin: async (req, res) => {
    try {
      const { password, email } = req.body;

      if ((!password, !email)) {
        throw new Error("you need to insert all credential fields");
      }

      const hashpass = await hash(password, 10);

      if (!hashpass) throw new Error("try again");

      const user = req.body;
      user.password = hashpass;
      user.role = "admin";
      const newManager = new User(req.body);
      await newManager.save();

      user.password = "*******";

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
  registerUser: async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body;

      // Check if all required fields are present
      if ( !email || !password ||  !confirmPassword) {
        throw new Error("All fields are required");
      }
      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      // Check if user already exists with the given email
      // const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   return res
      //     .status(400)
      //     .json({ message: "User already exists with this email" });
      // }

      const hashpass = await hash(password, 10);
      if (!hashpass) throw new Error("try again");

      const user = req.body;
      user.password = hashpass;

      const newUser = new User(req.body);
      await newUser.save();

      req.body = { password, email, newUser: true };

      const result = await module.exports.login(req, res);
      // user.password = "*******";
      if (result.success) {
        return res.status(200).json({
          message: "User saved successfully, and login was successful",
          success: true,
          newUser,
        });
      } else {
        return res.status(200).json({
          message: "successfully to register user, but not login",
          success: true,
          user: req.body,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw new Error("must require all inputs");

      const user = await User.findOne({ email });

      if (!user) throw new Error("user dont exist");

      // const isMatch = await compare(password, user.password);
      // if (!isMatch) throw new Error("user password not valid");

      const payload = { id: user._id, role: user.role, email: user.email };
      console.log(user.role);

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 3,
      });

      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
        sameSite: "strict",
      });
      if (req.body.newUser) {
        console.log("successefully");
        return { success: true };
      } else {
        return res.status(200).json({
          message: "successfully to login user",
          success: true,
          user,
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
   register: async (req, res) => {
    try {
      const { name, lastName, email, password, confirm_password } = req.body;

      // Check if all required fields are present
      if (!name || !email || !password || !lastName || !confirm_password) {
        throw new Error("All fields are required");
      }
      if (password !== confirm_password)
        throw new Error("Passwords do not match");

      // Check if user already exists with the given email
      // const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   return res
      //     .status(400)
      //     .json({ message: "User already exists with this email" });
      // }

      const hashpass = await hash(password, 10);
      if (!hashpass) throw new Error("try again");

      const user = req.body;
      user.password = hashpass;

      const newUser = new User(req.body);
      await newUser.save();

      req.body = { password, email, newUser: true };

      const result = await module.exports.login(req, res);
      // user.password = "*******";
      if (result.success) {
        return res.status(200).json({
          message: "User saved successfully, and login was successful",
          success: true,
          newUser,
        });
      } else {
        return res.status(200).json({
          message: "successfully to register user, but not login",
          success: true,
          user: req.body,
        });
      }
    } catch (error) {
      console.log("hello");
      return res.status(500).json({
        message: "not successfully to register user",
        success: false,
        error: error.message,
      });
    }
  },
  logOut: async (req, res) => {
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
  },
  forgotPassword: async (req, res) => {
    try {
      const userEmail = req.body.email;
      console.log(userEmail);

      const user = await User.findOne({ email: userEmail });
      if (!user) throw new Error("Email not exist");

      const token = await Token.findOne({ userId: user._id });
      console.log(token);
      if (token) await token.deleteOne();

      const resetToken = crypto.randomBytes(32).toString("hex");

      const hashPass = await hash(resetToken, 10);

      await new Token({
        userId: user._id,
        token: hashPass,
        createdAt: Date.now(),
      }).save();

      await transporter.sendMail({
        from: process.env.MAILER_AUTH_USER_NAME,
        to: user.email,
        subject: "reserting password",
        html: `<a href="http://localhost:5174/resetPassword?token=${resetToken}&uid=${user._id}">לחדש סיסמה לחץ כאן</a>
        `,
      });

      return res.status(200).json({
        message: "successfully to send email",
        success: true,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { uid, token } = req.query;

      const { password } = req.body;

      const userToken = await Token.findOne({ userId: uid });
      if (!userToken) {
        throw new Error("Invalid or expired password reset token");
      }

      // const isValid = token === userToken.token
      const isValid = await compare(token, userToken.token);

      if (!isValid) {
        throw new Error("Invalid or expired password reset token");
      }

      const hashed = await hash(password, 10);

      const user = await User.findByIdAndUpdate(
        uid,
        {
          password: hashed,
        },
        { new: true }
      );
      // console.log(user)
      // // if good
      await userToken.deleteOne();

      return res.status(200).json({
        message: "successfully to update password user",
        success: true,
        user,
      });
    } catch (error) {
      return res.status(401).json({
        message: "not authoritaion",
        success: false,
        error: error.message,
      });
    }
  },
  auth: async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode){
        res.clearCookie("token")
        throw new Error("token not valid");
      } 
        
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
  getUser: async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) throw new Error("token not valid");
      const user = await User.findById(decode.id);
      if(!user) throw new Error("the token is fake")
        return user
    } catch (error) {
      console.log(error)
    }
  },
  getFavorite: async (req,res)=>{
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) throw new Error("token not valid");
      const user = await User.findById(decode.id);
      if(!user) throw new Error("the token is fake")
      res.status(200).json({
        message:"favorit list has been sended",
        favorite:user.favorite
      })
  }
     catch (error) {
      console.log(error)
    }
  },
  getOrders: async (req,res)=>{
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) throw new Error("token not valid");
      const user = await User.findById(decode.id);
      if(!user) throw new Error("the token is fake")
      res.status(200).json({
        message:"order list has been sended",
        orders:user.orders
      })
  }
     catch (error) {
      console.log(error)
    }
  },
  updateFavorite: async (req,res)=>{
    try {
      const token = req.cookies.token;

      if (!token) throw new Error("must be token for this action");

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) throw new Error("token not valid");
      const user = await User.findById(decode.id);
      if(!user) throw new Error("the token is fake")
        // const favoritList = req.body.map((product)=>{
        //   return product._id
        // })
        user.favorite = req.body
        await user.save()
      res.status(200).json({
        message:"favorit list has been updated"
      })
  }
     catch (error) {
      console.log(error)
    }
  }
};
