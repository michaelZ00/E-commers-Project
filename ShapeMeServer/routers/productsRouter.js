


const router = require("express").Router()
const upload = require("../middleware/upload")




const {getAllProducts, addProduct, updateProduct, deleteProduct, getProduct} = require("../controllers/productsController") 
const { jwtAuth } = require("../middleware/jwtAuth")

router.get("/productsList", getAllProducts)
router.post("/addProudct", upload.single("product_pic"), addProduct)
router.put("/updateProudct/:id", upload.single("product_pic"), updateProduct)
router.get("/getProduct/:id", getProduct)
router.delete("/deleteProduct/:id", deleteProduct)

module.exports = router