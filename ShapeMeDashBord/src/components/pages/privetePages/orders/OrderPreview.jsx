import React, { useEffect, useState } from "react";
import Buttons from "../users/custemTable/TableUtils/Buttons";
import { blueBtn, blueBtnS, redBtn, limeBtn } from "../products/table/styles/ButtonStyles"; 
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function OrderPreview(product) {
  
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

        <div className="w-[40%]">
          <figure>
  
            <img id="mainImg" className="size-[100%] mb-4" src={product?.product?.product_pic ?? ""} />
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

export default OrderPreview;
