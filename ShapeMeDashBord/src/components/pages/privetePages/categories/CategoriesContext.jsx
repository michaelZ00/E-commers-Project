import { createContext, useEffect, useState } from "react";
import axios from "axios";
//creats a component werehouse that will have the functioality of authtocations and form submission
//export const [name of the werehouse]'name' = createContext() - creating the componetn
const url = "http://localhost:3000/Categories";

export const CategoriesContext = createContext();

function CategoriesProvider({ children }) {
    const [Categories, setCategories] = useState(null)
    // getting all the Categories from the API
    const getCategories = async()=>{
        try {
            response = await axios.get(`${url}/myCategories`)
            setCategories(response.data.Categories)
        } catch (error) {
            console.log(error)
        }
    }

    getCategories()
  useEffect(() => {
   getCategories
  }, []);

  const values = {
    Categories,
    setCategories
  };

  return(
    <CategoriesContext.Provider value={values}>
      {children}
    </CategoriesContext.Provider>
  ) 
    
}

export default CategoriesProvider;
