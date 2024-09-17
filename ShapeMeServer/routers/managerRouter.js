const router = require("express").Router();

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  upDataUserRole,
} = require("../controllers/userController");

const {
  addAdmin,
  logOut,
  login,
  auth,
  forgotPassword,
  resetPassword,
  register,
} = require("../controllers/authController");

const { jwtAuth } = require("../middleware/jwtAuth");
const { roleAuth } = require("../middleware/roleAuth");

//authentication handlers
router.post("/admin/addAdmin", addAdmin);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.get("/logout", logOut);
router.get("/auth", auth);

//action handlers
router.get("/getAll", getUsers);
router.get("/get/:id", getUser);
router.post("/add", jwtAuth, roleAuth ,postUser);
router.put("/upData/:id", jwtAuth, roleAuth, putUser);
router.delete("/delete/:id", jwtAuth, roleAuth, deleteUser);
router.put("/upDataRole/:id", jwtAuth, roleAuth, upDataUserRole);

module.exports = router;
