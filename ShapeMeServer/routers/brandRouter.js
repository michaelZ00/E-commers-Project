const router = require("express").Router()
const upload = require("../middleware/upload")
const {getAllBrands, addBrands, updateBrand, deleteBrand} = require("../controllers/brandsController")

router.get("/myBrands",getAllBrands)
router.post("/addBrand",upload.single("Logo"),addBrands)
router.put("/updateBrand/:id",upload.single("Logo"),updateBrand)
router.delete("/deleteBrand/:id",deleteBrand)


module.exports = router