const { response } = require("express");
const Orders = require("../models/ordersModel");
const Products = require("../models/productsSchema");
const { v4 } = require("uuid");
function generateUniqueID() {
  // Generate a version 4 UUID (random)
  const uniqueID = v4();

  // Extract the first 8 characters (can be modified based on your needs)
  return uniqueID.substring(0, 8);
}

// Example usage
// const uniqueID = generateUniqueID();
// console.log(uniqueID); // Output: Example: 123e4567 (This will vary on each run)

module.exports = {
  Cart: async (info, user, total_price, cartList) => {
    try {
      const order = await new Orders(
        {
          user,
          products: cartList,
          customer_details: info.myInfo,
          total_price,
        },
        { id: false }
      );
      if (!order) throw new Error("problem in creating the order");
      order.order_number = generateUniqueID();
      await order.save();
      return order._id;
    } catch (error) {
      console.log(error);
    }
  },
  addOrder: async (req, res) => {
    try {
    } catch (error) {}
  },
  getOrders: async (req, res) => {
    try {
      const orders = await Orders.find()
        .populate("user", "email")
        .populate({
          path: "products.id",
          populate: [
            { path: "product_brand", select: { Name: 1, _id: 0 } },
            { path: "product_category", select: { name: 1, _id: 0 } },
          ],
        });
      res.status(200).json({
        message: "connection has made",
        status: "sucsess",
        orders,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
        status: "faild",
        error: error.message,
      });
    }
  },
  getOrder: async (req, res) => {
    try {
      const id = req.params.id
      const order = await Orders.findById(id)
      .populate("user", "email")
      .populate({
        path: "products.id",
        populate: [
          { path: "product_brand", select: { Name: 1, _id: 0 } },
            { path: "product_category", select: { name: 1, _id: 0 } },
          ],
        });
        res.status(200).json({
          message: "connection has made",
          status: "sucsess",
          order,
        });
    } catch (error) {
      res.status(500).json({
        message: error,
        status: "faild",
        error: error.message,
      });
    }
  },
  addOrder: async (req, res) => {
    try {
      const { products } = req.body;
      if (!products) throw new Error("missing some info");
      const order = new Orders(req.body);
      order.order_number = generateUniqueID();
      await order.save();
      res.status(200).json({
        message: "Order was made",
        success: true,
        order: order,
      });
    } catch (error) {
      res.status(500).json({
        message: "faild to make an order",
        success: false,
        error: error.message,
      });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const id = req.params.id;
      const updateOrder = req.body;
      const order = await Orders.findByIdAndUpdate(id, updateOrder);
      if (!order) throw new Error("couldn't find the order");

      return res.status(200).json({
        message: "successfully to update order",
        success: true,
        order,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error in update Order",
        success: false,
        error: error.message,
      });
    }
  },
  changeStatus: async (theId) => {
    let flag = true;
    const newCart = [];
    const order = await Orders.findById(theId);
    if (!order) return false;
    for (const product of order.products) {
      const p = await Products.findById(product.id);

      if (p.product_amount - product.quantity < 0) {
        flag = false;
        newCart.push(product._id);
      }
      p.product_amount = p.product_amount - product.quantity;
      await p.save();
    }
    if (!flag) {
      // cancel the order
      order.order_status = 4;
      await order.save();
      return {
        message: "sadly the order cannot be made",
        success: flag,
        cart: newCart,
      };
    }
    order.order_status = 1;
    await order.save();
    return {
      message: "order status has been change all good",
      success: flag,
    };
  },
};
