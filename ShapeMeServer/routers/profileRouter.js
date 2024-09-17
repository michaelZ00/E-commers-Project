const router = require("express").Router();
const upload = require("../middleware/upload");
const { emailAuth } = require("../middleware/emailAuth");

const {
  upDataProfileByEmail,
  getUserByEmail,
  addProfileImage,
  updateProfileImage,
  upDataWorkOutByEmail,
  upDataPasswordByEmail
} = require("../controllers/profileController");

router.get("/getProfileImage", getUserByEmail);
router.put("/upDataProfile", upDataProfileByEmail);
router.put("/upDataWorkOut", upDataWorkOutByEmail);
router.put("/upDataPassword", upDataPasswordByEmail);

router.post("/addProfileImage", upload.single("profileImage"), addProfileImage);
router.put(
  "/upDataProfileImage",
  upload.single("profileImage"),
  updateProfileImage
);

module.exports = router;
