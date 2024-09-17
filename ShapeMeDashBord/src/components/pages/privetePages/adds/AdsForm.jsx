import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

import ProudactInputs from "../products/table/AddProducts/ProductsInputs";
import axios from "axios";
// import PicInputs from "../products/table/AddProducts/PicInputs";
import PicInputs from "../products/table/AddProducts/PicInputs";
// import { Button } from "@material-tailwind/react";
import Buttons from "../products/table/Buttons";
import { blueBtn } from "../products/table/styles/ButtonStyles";
function AdsForm({ value, ad, updateMyAd }) {
  //   const { setGetProduct, getProduct } = useContext(AuthContext);
  const url = ad
    ? `http://localhost:3000/ads//updateAd/${ad._id}`
    : "http://localhost:3000/ads/addAd";

  const method = ad ? "put" : "post";
  const formData = async (e) => {
    e.preventDefault();
    try {
      const adForm = new FormData(e.target);
      updateMyAd(adForm, url, method);
      document.getElementById("myForm").reset();
      document.getElementById("my_modal_1").close();
      //   if (!data.success) throw new Error("data don't fetch successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal ">
      <div className="modal-box w-[500px]">
        <h3 className="font-bold text-lg"></h3>
        <div className="modal-action">
          <form
            onSubmit={formData}
            id="myForm"
            className="w-[80%] mx-auto "
            method="dialog"
          >
            <div className=" w-[250px] ">
              <ProudactInputs
                name={"Name"}
                id={"Name"}
                value={ad ? ad.Name : ""}
              />
            </div>
            <div className="w-[250px]">
              <PicInputs
                name="Ad"
                id="Ad"
                value={ad ? ad.Ad : ""}
              />
            </div>
            <div>
              <div className="flex justify-center space-x-20 ">
                <button
                  type="submit"
                  className=" px-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {ad ? "Edit" : "Add"}
                </button>
                <button
                  className="btn px-12"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("myForm").reset();
                    document.getElementById("my_modal_1").close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AdsForm;
