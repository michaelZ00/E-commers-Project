import { createContext, useEffect, useState } from "react";
import axios from "axios";
//creats a component werehouse that will have the functioality of authtocations and form submission
//export const [name of the werehouse]'name' = createContext() - creating the componetn
const url = "http://localhost:3000/brands";

export const BrandContext = createContext();

function BrandProvider({ children }) {
    const [brands, setBrands] = useState(null)
    // getting all the brands from the API
    const getBrands = async()=>{
        try {
            response = await axios.get(`${url}/myBrands`)
            setBrands(response.data.brands)
        } catch (error) {
            console.log(error)
        }
    }

    getBrands()
  useEffect(() => {
   getBrands
  }, []);

  const values = {
    brands,
    setBrands
  };

  return(
    <BrandContext.Provider value={values}>
      {children}
    </BrandContext.Provider>
  ) 
    
}

export default BrandProvider;
