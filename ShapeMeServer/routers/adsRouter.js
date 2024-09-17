const router = require("express").Router()
const upload = require("../middleware/upload")
const {getAllAds, addAd, updateAd, deleteAd} = require("../controllers/adsController")
router.get("/myAds",getAllAds)
router.post("/addAd",upload.single("Ad"),addAd)
router.put("/updateAd/:id",upload.single("Ad"),updateAd)
router.delete("/deleteAd/:id",deleteAd)


module.exports = router