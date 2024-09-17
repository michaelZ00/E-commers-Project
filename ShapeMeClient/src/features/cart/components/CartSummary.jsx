import React, { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../cart/contexts/CartContext";
import Button from "../../../shared/components/common/Button";
import { blueBtn } from "../../../shared/components/style/ButtonStyle";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/contexts/AuthContext";
import UserModal from "./UserModal";
import { ToastContainer, toast, Bounce } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function CartSummary() {
  const { login, isAuth, objectSchemaLogin,authUser, setSignUp, signUp } =
    useContext(AuthContext);
  const { cartItems, totalPrice } = useContext(CartContext);
  const MyCart = cartItems.map((itme, i) => (
    <CartItem product={itme} number={itme._id} />
  ));
  useEffect(()=>{
    authUser()
  })
  const navigete = useNavigate();
  return (
    <div className="flex flex-col  mt-10 mx-5  w-[90%]">
      {MyCart}
      <div className="flex  items-center rounded overflow-hidden shadow-lg  p-4 m-5">
        <div className="text-left w-[10%]">Toatal:</div>
        <div className="text-right w-[90%]">${totalPrice}.00</div>
      </div>
      <div className=" w-[100%] p-4 ">
        <Button
          onClick={() => {
            if(cartItems.length === 0){
              toast('You need to have products in your cart for you to proced to checkout ', {
                position: "top-center",
                autoClose: 1000,
                toastId:"userPls",
                preventDuplicates: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                navigete("/")
            }
             else if (!isAuth) {
              toast('You must be a user to proced to checkout ', {
                position: "top-center",
                autoClose: 1000,
                toastId:"userPls",
                preventDuplicates: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: ()=> document.getElementById("my_modal_1").showModal(),
                });
            } else {
              navigete("/orders");
            }
          }}
          value={"Proceed to checkout"}
          styles={`${blueBtn} w-[100%]`}
        />
      </div>
      <UserModal/>

    </div>
  );
}

export default CartSummary;
