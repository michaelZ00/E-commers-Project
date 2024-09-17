const jwt = require("jsonwebtoken");

const arrayRoles = ["regular", "manager", "admin"];

const roleAuth = async (req, res, next) => {
  try {

    
    console.log(req.role, "role transfer");

    // const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    const role = req.role;

    console.log("token role: ", role);

    if (role === "manager" || role === "regular")
      throw new Error("Invalid role");
    next();
  } catch (error) {
    res.status(403).json({
      message: "not authorized",
      error: error.message,
    });
  }
};

module.exports = { roleAuth };
