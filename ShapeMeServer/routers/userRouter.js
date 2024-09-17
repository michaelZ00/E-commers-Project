const router = require("express").Router();

const { roleAuth } = require("../middleware/roleAuth");

const {
  getUser,
  postUser,
  putUser,
  deleteUser,
  getUsers
} = require("../controllers/userController");
const {
  logOut,
  login,
  auth,
  registerUser,
  updateFavorite,
  getFavorite,
  getOrders
} = require("../controllers/authController");
const { jwtAuth } = require("../middleware/jwtAuth");


async function checkIn(req, res, next) {
  console.log("Checking")
  next()
}


//authentication handlers

router.post("/login",checkIn ,login);
router.get("/logout", logOut);
router.post("/register", registerUser);
router.get("/auth",auth);  

//action handlers

router.post("/updateFavorite",updateFavorite);  
router.get("/getFavorite",getFavorite);  
router.get("/getOrders",getOrders);  
router.get("/get/:id", getUser);
router.get("/getAll", getUsers);
router.post("/add", postUser);
router.put("/upData/:id", putUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;


