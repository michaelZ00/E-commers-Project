import React, { useEffect, useState } from "react";
import Buttons from "./table/Buttons";
import Image from "./table/Image";
import { blueBtn, blueBtnS, limeBtn, redBtn } from "./table/styles/ButtonStyles";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function Preview(product) {
  const [amount , setAmount] = useState(1)
  const list = product?.product?.product_discription.split(",") ?? "";
  const modal = document.getElementById("my_modal_2")
  // modal.addEventListener('close', console.log("hey"))
  return (
    <dialog id="my_modal_2" className="modal "
    onClose={()=> 
      {if(amount > 1) setAmount(1)

      }}
    >
      <div className=" flex h-auto w-[50%] mx-auto justify-between p-5 bg-white">
        <div className="flex flex-col text-left w-[50%]">
          <p className="text-xl m-2">{product?.product?.product_name ?? ""}</p>
          <p className="text-xl m-2">{product?.product?.product_brand.Name ?? ""}</p>
          <p className="text-xl m-2">{`${product?.product?.product_price * amount}$` ?? ""}</p>
          <p className="text-xl m-2">Product Amount-</p>
          <p className="text-xl m-2">
          <Buttons
          value={<FaMinusCircle />}
          styles={blueBtnS}
          onClick={()=>
          { if(amount >= 2)setAmount(amount-1)
          }
          }
          />{`${amount} `} 
            <Buttons
          value={<FaPlusCircle />}
          styles={blueBtnS}
          onClick={()=>{
            if(product.product.product_amount - amount  >= 1)setAmount(amount+1)}}
          />
          </p>
          <Buttons
          value="add to cart"
          styles={`${blueBtn} w-[50%] mb-5`}
          />
          <Buttons
          value="quick buy"
          styles={`${limeBtn} w-[50%]`}
          />
          <p className="text-xl m-1">-Product discriptions-</p>
          {product?.product?.product_discription
            ? list.map((element, i) =>
                


               <li className="text-xs " key={i}>{element}</li>
              )
            : ""}
        </div>
        <div className="w-[40%]">
          <figure>
  
            <img id="mainImg" className="size-[100%] mb-4" src={product?.product?.product_pic ?? ""} />
  {/* maybe to add more pic  */}
            {/* <div className="flex gap-2">
            <img id="img1" className="size-[30%]" src={product?.product?.product_pic ?? ""} 
            onClick={()=> document.querySelector("#mainImg").src = document.querySelector("#img1").src}
            />
            <img  id="img2" className="size-[30%]"
            onClick={()=> document.querySelector("#mainImg").src = document.querySelector("#img2").src}
            src={"https://res.cloudinary.com/dq3q0qbhq/image/upload/v1716189795/qvdhbr1qiwmw6qhgyjzw.png"} />
            </div> */}
          </figure>
        </div>
      </div>

      
          <Buttons
          value="Close"
          styles={redBtn}
          onClick={()=> {
            document.getElementById("my_modal_2").close()
          }}
          />
    </dialog>
  );
}

export default Preview;
