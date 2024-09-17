const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const emailAuth = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) throw new Error("must be token for this action");

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) throw new Error("Token not valid");
    req.body.id = decode.id
    console.log("req.id :::" ,req.body.id)    

    const user = await User.findOne({ _id: decode._id});

    if (!user) {
      throw new Error("User not found");
    }
    console.log("user :::" ,user)
    req.body.user = user;

    const expirationTime = decode.exp * 1000;
    const timeToExpire = expirationTime - Date.now();

    if (timeToExpire < 15 * 60 * 1000) {
      // Less than 15 minutes to expire
      // Renew the token with a fresh expiration time
      const payload = {
        id: decode.id,
        role: decode.role,
      };

      console.log(payload.role);
      const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      // Set the new token in the response cookie
      res.cookie("token", newToken, {
        maxAge: 1000 * 60 * 60 * 3, // Expires in 3 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
        sameSite: "strict",
      });
      req.cookies.token = newToken;
    }
      // Ensure req.cookies is updated
      // req.body.checkRole = decode.role
      // console.log(req.cookies.checkRole, "helllow");
      // console.log("here a im")

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
      error: error.message,
      new: "hellow"
    });
  }
};

module.exports = { emailAuth };
