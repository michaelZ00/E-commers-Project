import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { CartContext } from "../../../cart/contexts/CartContext";
import { FavoritContext } from "../../../favorit/context/FavoritContext";

function ModelCard({ product, modalIsOpen, setModalIsOpen,}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const {  favoritList,  updateFavorit,  } =
  useContext(FavoritContext);
  const closeModal = () => setModalIsOpen(false);

  const increaseQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const result = favoritList.find(p => p._id === product._id);
    setIsFavorite(!!result);

  }, [favoritList]);
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Enlarged Image"
      className=" fixed inset-0 flex items-center justify-center p-2 z-50 transition-opacity duration-500"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40 transition-opacity duration-500"
    >
      <div className="bg-gray-100 dark:bg-gray-900 py-4 relative rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-2 rounded-full font-bold opacity-50 hover:opacity-100 z-50"
        >
          Close
        </button>
        <div className="max-w-4xl max-h-3xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row -mx-2">
            <div className="md:flex-1 px-2">
              <div className="h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-2 relative group">
                <img
                  className="w-full h-full object-contain"
                  src={product.product_pic}
                  alt="Product"
                />
              </div>
              <div className="flex -mx-1 mb-2">
                <div className="w-1/2 px-1">
                  <button
                  onClick={()=>
                    {
                    product.product_quantity = 1
                    addToCart(product)
                  }}
                  className="w-full bg-blue-600 text-white py-1 px-2 rounded-full font-bold hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-1">
                  <button
                  onClick={()=> updateFavorit(product)}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-2 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    {isFavorite? "None favorit": "Add to favorit"}
                    
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {product.product_name}
              </h2>
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <div className="text-right">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:
                    </span>
                    <span className="text-xl text-blue-600 dark:text-blue-400 font-bold ml-1">
                      ${product.product_price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      In Stock
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Product Description:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                    {product.product_discription}
                  </p>
                </div>
                {/* <div className="mt-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Rating:
                  </span>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                      </svg>
                    ))}
                  </div>
                </div> */}
                <div className="mt-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Quantity:
                  </span>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded-l"
                    >
                      -
                    </button>
                    <span className="mx-1">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </Modal>
  );
}

export default ModelCard;


