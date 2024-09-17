import { createContext, useEffect, useState } from "react";
import axios from "axios";
//creats a component werehouse that will have the functioality of authtocations and form submission
//export const [name of the werehouse]'name' = createContext() - creating the componetn
const url = "http://localhost:3000/ads";

export const AdsContext = createContext();

function AdsProvider({ children }) {
    const [ads, setAds] = useState(null)
    // getting all the brands from the API
    const getAds = async()=>{
        try {
            response = await axios.get(`${url}/myAds`)
            setAds(response.data.ads)
        } catch (error) {
            console.log(error)
        }
    }

    getAds()
  useEffect(() => {
   getAds
  }, []);

  const values = {
    ads,
    setAds
  };

  return(
    <AdsContext.Provider value={values}>
      {children}
    </AdsContext.Provider>
  ) 
    
}

export default AdsProvider;
