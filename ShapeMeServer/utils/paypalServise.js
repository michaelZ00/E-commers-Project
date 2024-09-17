const axios = require("axios");
const Products = require("../models/productsSchema");
const { changeStatus } = require("../controllers/ordersController");

async function generateAccessToken() {
  try {
    const { data } = await axios({
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      method: "POST",
      data: "grant_type=client_credentials",
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
    });
    return data.access_token;
  } catch (error) {
    console.log(error);
  }
}
// function to check if the itme in the cart are in the store and 
//  if we have that amount in the store
async function MyOrder(arry) {
  const Cart = [];
  const newArry = []
  let isOk = true;
  for (let i = 0; i < arry.length; i++) {
    try {
      const product = await Products.findById(arry[i].id);
      console.log(product)
      if (product.product_amount - arry[i].quantity < 0) {
        isOk = false;
      } else {
        Cart.push(product);
        // making a new arry for the order creation
        newArry.push(arry[i])
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { success: isOk, Cart, newArry };
}

exports.createOrder = async (paypalCart) => {
  try {
    const isValidOrder = await MyOrder(paypalCart);
    const { Cart, newArry } = isValidOrder;
      console.log(Cart)
    // creating thte total price for the paypal and for the order
    const total_price = Cart.reduce((sum, item, i) => {
      return sum + item.product_price * newArry[i].quantity;
    }, 0);
    const access_token = await generateAccessToken();
    const { data } = await axios({
      url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: `${Cart.reduce((sum, item, i) => {
                return sum + item.product_price * newArry[i].quantity;
              }, 0)}`,
              breakdown: {
                item_total: {
                  value: `${total_price}`,
                  currency_code: "USD",
                },
              },
            },
            // items:paypalCart
            items: Cart.map((item, i) => {
              return {
                name: item.product_name,
                quantity: String(newArry[i].quantity),
                // description: item.product_disciption.split(0,126),
                unit_amount: {
                  currency_code: "USD",
                  value: String(item.product_price),
                },
              };
            }),
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          brand_name: "nethanel love paypal",
          // return_url:"שולח אותכם לכתובת שבחרתם"
          // cancel_url:"במידה וביטלתם שולח אותכם לכתובת שבחרתם"
        },
      }),
    });
    // save data for user still dont payed;
    return { status:"good",success: isValidOrder.success, orderId: data.id, Cart,newArry, total_price };
  } catch (error) {
    return { status:"bad",success: false, error: error.message, Cart};
  }
};

exports.capturePayment = async (orderId) => {
  try {
    changeStatus(orderId.id)
    const access_token = await generateAccessToken();
    // console.log(orderId);
    console.log(orderId)
    const { data } = await axios({
      url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId.data.orderID}/capture`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    // save data in db
    if (data.status !== "COMPLETED") throw new Error("payment problem");
    return { success: true, data, message: "all good" };
  } catch (error) {
    return { sucsees: false, message: "falie" };
  }
};
