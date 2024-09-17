const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Assuming multer is in middlewares folder
const { postContactUs } = require("../controllers/contactUsController");

router.post("/postComplaint", upload.array('files'), postContactUs);

module.exports = router;
