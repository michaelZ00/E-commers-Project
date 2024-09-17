const router = require("express").Router()
const {getOrders, addOrder, updateOrder,changeStatus, getOrder } = require("../controllers/ordersController")
const { jwtAuth } = require("../middleware/jwtAuth")



router.get("/getAll", jwtAuth,getOrders)
router.post("/addOrder", jwtAuth, addOrder)
router.put("/updateOrder/:id",jwtAuth, updateOrder)
router.get("/myOrder/:id",getOrder)
// router.put("/status/:id", changeStatus)




module.exports = router