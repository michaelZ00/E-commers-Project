import React from "react";
import {
  blueBtn,
  blueBtnS,
  limeBtn,
  redBtn,
} from "../../../shared/components/style/ButtonStyle";
import Button from "../../../shared/components/common/Button";
import { FaPlusCircle, FaMinusCircle, FaShoppingCart } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../cart/contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ProductPreview() {
  const [product, setProduct] = useState({});
  const url = "http://localhost:3000/products";
  const {Pid }= useParams()
  async function fetchData() {
    try {
      const response = await axios.get(`${url}/getProduct/${Pid}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  // const { id } = useParams();
  // console.log(params);
  const { addToCart } = useContext(CartContext);
  const [amount, setAmount] = useState(1);
  // const list = product.product_discription.split(".")

  return (
    // <>Product</>
    <div className=" flex h-auto w-[75%] mx-auto  justify-center p-5 mt-10 bg-white flex-wrap-reverse">
      <div className="flex flex-col text-center items-center min-w-[250px] w-[45%]">
        <p className="text-xl m-2">{product.product_brand}</p>
        <p className="text-xl m-2">{product.product_name}</p>
        <p className="text-xl m-2">
          <p className="text-xl m-1 underline decoration-solid">
            -Product discriptions-
          </p>
          <div>
            {/* {list.map((sentenc , i)=>
            <li key={i} className='text-sm text-start list-none'>{sentenc}.</li>
            
          )} */}
          </div>
          <p className="text-xl m-2">{`$${
            product.product_price * amount
          }.00`}</p>
          <p className="text-lg m-2 underline decoration-solid">
            -Product Amount-
          </p>
          <div className="flex justify-center">
            <Button
              value={<FaMinusCircle />}
              styles={`${blueBtnS} m-4`}
              onClick={() => {
                if (amount > 1) setAmount(amount - 1);
              }}
            />
            <p className="m-4" style={{ width: "20px" }}>
              {amount}
            </p>
            <Button
              value={<FaPlusCircle />}
              styles={`${blueBtnS} m-4`}
              onClick={() => {
                if (amount < product.product_amount) setAmount(amount + 1);
              }}
            />
          </div>
        </p>
        <Button
          value={<FaShoppingCart />}
          styles={`${blueBtn} min-w-[200px] mb-5 flex justify-center `}
          onClick={() => {
            product.product_quantity = amount;
            addToCart(product);
            setAmount(1);
          }}
        />
        <Button
          value={<BsCashCoin />}
          styles={`${limeBtn} min-w-[200px] flex justify-center`}
        />
      </div>
      <div className="min-w-[300px] w-[35%] mt-20">
        <figure className="flex ">
          <img
            id="mainImg"
            className="size-[100%]  bg-slate-300 border-2"
            src={product.product_pic}
          />
        </figure>
      </div>
    </div>
  );
}

export default ProductPreview;
