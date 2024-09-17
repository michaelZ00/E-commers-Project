import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsContext";
import ProductCard from "./ProductCard";
import Loading from "../../../shared/utils/Loading"
const url = "http://localhost:3000/products/productsList";

const ProductList = () => {
  
  const { products, error } = useContext(ProductsContext)


  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const filteredData = useMemo(() => {
    if (!query) return products;
    return products.filter(
      (data) =>
        data.product_name.toLowerCase().includes(query.toLowerCase()) ||
        data.product_brand.Name.toLowerCase().includes(query.toLowerCase()) 
    );
  }, [query, products]);


  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!products) {
    return (
      <div className="flex justify-center items-center h-[50%]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-6  flex justify-center">
      <section className=" flex justify-center flex-wrap gap-6 mt-10 mb-5 w-[90%] ">
      {filteredData && filteredData.length > 0 ? (
          filteredData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </section>
    </div>
  );
};

export default ProductList;
