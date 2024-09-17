// const { createOrder, capturePayment } = require("../service/paypal");
const router = require("express").Router();
const { createOrder, capturePayment } = require("../utils/paypalServise");
const {getUser, auth} = require("../controllers/authController")
const User = require("../models/userModel")
const {Cart, changeStatus} = require("../controllers/ordersController")

router.post("/create-order", async (req, res) => {
  try {
    // const {myInfo,}
    const user = await getUser(req)
    if(!user) throw new Error("user not found")
    const orderId = await createOrder(req.body.paypalCart);
    if (orderId.status == "bad") throw new Error(captureData.error);
    if (orderId.success){
    const order = await Cart(req.body, user._id, orderId.total_price, orderId.newArry)
    user.orders = [...user.orders,order]
    await user.save()
    orderId.id = order._id
    res.json({orderId})}
    else{
      res.json({orderId})
    }
  } catch (error) {
    res.status(500).json({ message: false, error: error.message,});
  }
});
router.post("/cancel-order", async (req, res) => {
  try {
    // const orderId = await createOrder(req.body);
    // if (!orderId.success) throw new Error(captureData.error);
    res.json({ message:"you reach here ", data: req.body});
  } catch (error) {
    res.status(500).json({ message: false, error: error.message });
  }
});

router.post("/complete-order", async (req, res) => {
  try {
 
    // console.log(req.body.data.orderID
    const captureData = await capturePayment(req.body);
    if(captureData.success){
      res.json({success:true, message:"all good", captureData});
    }
    else throw new Error("problem in the payment")
  } catch (error) {
    res.status(500).json({success:false, message:"problem in payment", error: error.message });
  }
});


module.exports = router;
