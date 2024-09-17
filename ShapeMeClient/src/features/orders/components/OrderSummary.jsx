import React, { useContext, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../cart/contexts/CartContext";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { styleinput, stylelable } from "../../auth/styles/formStyle";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { orderContext } from "../contexts/OrderContext";
function OrderSummary() {
  const {
    cartItems,
    setCartItems,
    objectSchemaBuyer,
    myInfo,
    setMyInfo,
    isInfo,
    setIsInfo,
    resetCart,
    cartId,
    setCartId,
  } = useContext(CartContext);
  // const {setInfo, info} = useContext(orderContext)
  // const [info,setInfo] = useState(null)
  const { isAuth,authUser } = useContext(AuthContext);
  const navigete = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigete("/cart");
    }
    authUser()
  }, [isAuth]);
  // console.log(cartItems);

  const paypalCart = cartItems.map((prd) => ({
    id: prd._id,
    quantity: prd.product_quantity,
  }));
  const createOrder = async (data) => {
    // Order is created on the server and the order id is returned
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/payment/create-order/`,
        data: { paypalCart, myInfo },
        withCredentials: true,
      });
      console.log(response.data.orderId.newArry);
      if (!response.data.orderId.success) {
        const newCart = [];

        for (const item of cartItems) {
          const matchingNewItem = response.data.orderId.newArry.find(
            (newItem) => newItem.id === item._id
          );
          if (matchingNewItem) {
            // Add merged item to newCart
            newCart.push({ ...item, ...matchingNewItem });
          } else {
            // Add original item to newCart
            // newCart.push(item);
            console.log(item);
          }
        }
        setCartItems(newCart)
        toast.error('We identified a problem with an item in your cart and removed it to ensure a smooth checkout experience.', {
          position: "top-center",
          autoClose: 2200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose:()=>{navigete("/cart")}
          });
        return 
      }
      setCartId(response.data.orderId.id);
      localStorage.setItem("cartId", JSON.stringify(response.data.orderId.id));
      return response.data.orderId.orderId;
    } catch (error) {
      console.log(error);
    }
  };
  const onApprove = async (data) => {
    // Order is captured on the server and the response is returned to the browser
    try {
      const id = JSON.parse(localStorage.getItem("cartId"));
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/payment/complete-order`,
        data: {data,id}
      });
      // if (response.data.success) {
      //   try {
      //     const { data } = await axios({
      //       method: "put",
      //       url: `http://localhost:3000/orders/status/${id}`,
      //     });
        //   console.log(data);
        // } catch (error) {
        //   return { message: "faild to change status" };
        // }
      // }
      resetCart()
    } catch (error) {
      console.log(error);
    } finally {
      window.location.assign("/pageProfile")
    }
  };
  const onCancel = async (data) => {
    console.log(cartId);
    // window.location.assign("/cart");
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    onChange,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      last: "",
      city: "",
      address: "",
      phone: "",
      notes: "",
    },
    validationSchema: objectSchemaBuyer,
    onSubmit: async (values, action) => {
      setMyInfo(values);
      setIsInfo(true);
    },
  });
  // console.log(info)
  return (
    <>
      {!isInfo ? (
        <div className="flex justify-center m-10  lg:m-16">
          <div className="w-full lg:w-2/3 px-4 mb-16 lg:mb-0 shadow-4">
            <div className="w-full h-[100px] text-start  flex items-center">
              <h1 className="text-xl text-gray-900 font-semibold ">
                Customer Ditels:
              </h1>
            </div>
            {/* <div class="max-w-lg lg:pt-8 2xl:pt-24 lg:pb-8 mx-auto 2xl:mr-0 shadow-2"> */}
            <form action="" method="dialog">
              <div className="flex flex-wrap">
                <div className="mb-6 w-full lg:w-1/2 p-2">
                  <label
                    className="block mb-1.5 text-sm text-gray-900 font-semibold"
                    htmlFor="name"
                  >
                    First Name*
                  </label>
                  <input
                    className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                    type="text"
                    placeholder="First Name"
                    name="name"
                    // required
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    defaultValue={myInfo?.name ?? ""}
                  />
                </div>
                <div className="mb-7  w-full lg:w-1/2 p-2">
                  <div className="flex mb-1.5 items-center justify-between">
                    <label
                      className="block text-sm text-gray-900 font-semibold"
                      htmlFor="last"
                    >
                      Last Name*
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="text"
                      placeholder="Last Name"
                      name="last"
                      defaultValue={myInfo?.last ?? ""}
                      // required
                      onChange={handleChange}
                      value={values.last}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="mb-6 w-full lg:w-1/2 p-2">
                  <label
                    className="block mb-1.5 text-sm text-gray-900 font-semibold"
                    htmlFor="city"
                  >
                    City*
                  </label>
                  <input
                    className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                    type="text"
                    placeholder="City"
                    name="city"
                    // required
                    onChange={handleChange}
                    value={values.city}
                    onBlur={handleBlur}
                    defaultValue={myInfo?.city ?? ""}
                  />
                </div>
                <div className="mb-7 w-full lg:w-1/2 p-2">
                  <div className="flex mb-1.5 items-center justify-between">
                    <label
                      className="block text-sm text-gray-900 font-semibold"
                      htmlFor="address"
                    >
                      Address*
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="text"
                      placeholder="street building floor/apprtment"
                      name="address"
                      // required
                      onChange={handleChange}
                      value={values.address}
                      onBlur={handleBlur}
                      defaultValue={myInfo?.address ?? ""}
                    />
                  </div>
                </div>
                <div className="mb-7 w-full lg:w-1/2 p-2">
                  <div className="flex mb-1.5 items-center justify-between">
                    <label
                      className="block text-sm text-gray-900 font-semibold"
                      htmlFor="phone"
                    >
                      Phone*
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="text"
                      // required
                      placeholder="052-1234567"
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                      onBlur={handleBlur}
                      defaultValue={myInfo?.phone ?? ""}
                    />
                  </div>
                </div>
                <div className="mb-7 w-full p-2">
                  <div className="flex  mb-1.5 items-center justify-between">
                    <label
                      className="block text-sm text-gray-900 font-semibold"
                      htmlFor="notes"
                    >
                      Notes
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                      type="text"
                      // required
                      placeholder="add some more Info if needed "
                      name="notes"
                      onChange={handleChange}
                      value={values.notes}
                      onBlur={handleBlur}
                      defaultValue={myInfo?.notes ?? ""}
                    />
                  </div>
                </div>
              </div>
              <button
                className="relative group block w-full mb-32 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                <span className="relative">Proceed to payment</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center m-10  lg:m-16">
          <button
            className="relative group block w-1/2 mb-32 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsInfo(false);
            }}
          >
            <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
            <span className="relative">Change shipping details</span>
          </button>
        </div>
      )}
      <div className="flex justify-center">
        {isInfo ? (
          <PayPalButtons
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(data, actions) => onError(data, actions)}
            style={{ layout: "horizontal" }}
          />
        ) : (
          ""
        )}
      </div>

    </>
  );
}

export default OrderSummary;
