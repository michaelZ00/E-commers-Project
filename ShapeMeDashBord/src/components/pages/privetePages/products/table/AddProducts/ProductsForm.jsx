import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../../../contexts/AuthContext";

import ProudactInputs from "./ProductsInputs";
import axios from "axios";
import PicInputs from "./PicInputs";
// import { Button } from "@material-tailwind/react";
import Buttons from "../Buttons";
import { blueBtn } from "../styles/ButtonStyles";
function ProudactForm({ value, product, build, brands, categories }) {
  const { setGetProduct, getProduct } = useContext(AuthContext);
  const url = product
    ? `http://localhost:3000/products/updateProudct/${product._id}`
    : "http://localhost:3000/products/addProudct";
  const BrandOPtion = brands.map((brand, i) => {
    <option key={i} value={brand._id}>
      {brand.Name}
    </option>;
  });
  const method = product ? "put" : "post";
  const [num, setNum] = useState(0);
  const arrBuildV = Object.values(build);
  const arrBuildP = Object.keys(build);

  const formData = async (e) => {
    e.preventDefault();
    try {
      const productForm = new FormData(e.target);
      const { data } = await axios({
        method: method,
        url: url,
        data: productForm,
      });
      document.getElementById("myForm").reset();
      document.getElementById("my_modal_1").close();
      if (!data.success) throw new Error("data don't fetch successfully");
    } catch (error) {
      console.log(error.message);
    }
    setGetProduct((prev) => !prev);
  };
  return (
    <dialog id="my_modal_1" className="modal ">
      <div className="modal-box min-w-[900px] max-w-[50%]">
        <h3 className="font-bold text-lg">Hello!</h3>
        <div className="modal-action">
          <form
            onSubmit={formData}
            id="myForm"
            className="w-[80%] mx-auto"
            method="dialog"
          >
            <div className="flex justify-between gap-20px">
              <div className=" min-w-[45%]">
                {arrBuildP.map((val, i) => (
                  <ProudactInputs
                    key={i}
                    name={arrBuildV[i]}
                    id={val}
                    value={product ? product[val] : ""}
                  />
                ))}
               <ProudactInputs
                    key={"what ever"}
                    name={product? "Added number of product" :"Product Amount"}
                    id={"product_amount"}
                    value={0}
                  />
                <label
                  htmlFor="discription"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-h[250px]"
                >
                 Category
                </label>
                <select
                  className="select select-bordered w-full max-w-xs mb-8"
                  name="product_category"
                >
                  {product ? (
                    <option disabled selected>
                      {}
                    </option>
                  ) : (
                    ""
                  )}
                  {categories.map((category, i) => (
                    <option key={i} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-w-[45%]">
                <PicInputs
                  name="Product Pic"
                  id="product_pic"
                  value={product ? product.product_pic : ""}
                />
                <label
                  htmlFor="discription"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-h[250px]"
                >
                  Discription
                </label>
                <textarea
                  name="product_discription"
                  placeholder="example:like this,"
                  defaultValue={product ? product.product_discription : ""}
                  className=" my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 textarea-lg"
                ></textarea>
                <label
                  htmlFor="discription"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-h[250px]"
                >
                  Brand
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="product_brand"
                >
                  {product ? (
                    <option disabled selected>
                      {""}
                    </option>
                  ) : (
                    ""
                  )}
                  {brands.map((brand, i) => (
                    <option key={i} value={brand._id}>
                      {brand.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center space-x-20 ">
              <button
                type="submit"
                className=" px-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {product ? "Edit" : "Add"}
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
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ProudactForm;
