const router = require("express").Router()
const {getAllCategories, addCategory, updateCategory, deleteCategory} = require("../controllers/categoriesController")

router.get("/myCategories",getAllCategories)
router.post("/addCategory",addCategory)
router.put("/updateCategory/:id",updateCategory)
router.delete("/deleteCategory/:id",deleteCategory)


module.exports = router