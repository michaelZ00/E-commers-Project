import { createContext, useEffect, useState } from "react";
import axios from "axios";

//creats a component werehouse that will have the functioality of authtocations and form submission
//export const [name of the werehouse]'name' = createContext() - creating the componetn


export const HomeContext = createContext();

function HomeProvider({ children }) {
  const [table, setTabel] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const users = async () => {
    try {
      const response = await axios("http://localhost:3000/orders/getAll", {
        withCredentials: true,
      });
      setTabel(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const brands = async () => {
    try {
      const response = await axios("http://localhost:3000/brands/myBrands", {
        withCredentials: true,
      });
      setBrandsList(response.data.brands);
    } catch (error) {
      console.log(error);
    }
  };
  const category = async () => {
    try {
      const response = await axios("http://localhost:3000/categories/myCategories", {
        withCredentials: true,
      });
      setCategoryList(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    users();
    brands();
    category();
  }, []);
  console.log(table);

  const values = {
    table,
    brandsList,
    categoryList
  };

  return <HomeContext.Provider value={values}>{children}</HomeContext.Provider>;
}

export default HomeProvider;
