// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import ModelCard from './Model/ModelCard';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import ModelCard from "./Model/ModelCard";
import { CartContext } from "../../cart/contexts/CartContext";
import { FavoritContext } from "../../favorit/context/FavoritContext";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {

  const { favoritList, updateFavorit } = useContext(FavoritContext);
  const { addToCart } = useContext(CartContext);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  // useEffect(() => {
  //   if(favoritList){
  //   const result = favoritList.find((p) => p._id === product._id);
  //   setIsFavorite(!!result);}
  // }, [favoritList]);

  useEffect(() => {
    if (favoritList) {
      const result = favoritList.find((p) => p._id === product._id);
      setIsFavorite(!!result);
    }
  }, [favoritList]);

  const handleFavoriteToggle = () => {
    updateFavorit(product);
    setIsFavorite(!isFavorite);  // Toggle favorite status locally
  };




  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative">
      {/* <button
        className={`absolute top-3 left-3 
          // isFavorite ? "text-red-700" : "text-red-500"
         opacity-75 hover:opacity-100`}
        onClick={() => updateFavorit(product)}
      >
        <FaHeart size={24} color={isFavorite ? "red" : "black"} />
      </button> */}
      <button
        className={`absolute top-3 left-3 
          opacity-75 hover:opacity-100`}
        onClick={handleFavoriteToggle}
      >
        <FaHeart size={24} color={isFavorite ? "red" : "black"} />
      </button>
      <div>
        <button onClick={() => setModalIsOpen(true)}>
          <img
            src={product.product_pic}
            alt="Product"
            className="h-auto w-auto object-cover rounded-t-xl"
          />
        </button>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {product.product_brand.Name}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.product_name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${product.product_price}
            </p>
            <del>
              <p className="text-sm text-gray-600 cursor-auto ml-2">
                ${product.product_Price}
              </p>
            </del>
            <div className="ml-auto flex items-center space-x-2">
              <button
                // onClick={() => {
                //   product.product_quantity = 1;
                //   addToCart(product)
                //   Navigate("/cart");
                // }}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-700"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  product.product_quantity = 1;
                  addToCart(product);
                }}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-bag-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                  />
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </button>
            </div>
          </div>
          <Link to={`/productPage/${product._id}`}>
            <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
              View Product
            </button>
          </Link>
        </div>
      </div>
      <ModelCard
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        product={product}
        Favorite={isFavorite}
        updateFavorit={updateFavorit}
      />
    </div>
  );
};

export default ProductCard;
