import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const HomeContext = createContext();

function HomeProvider({ children }) {
//   const url = "http://localhost:3000/ads/myAds";
//   const [homeInfo, setHomeInfo] = useState(null);
//   // const [isInfo, setIsInfo] = useState(false)
//   // const [cartItems,setCartItems] = useState([]);
//   // const [totalProducts,setTotalProducts] = useState(0);
//   // const [totalPrice, setTotalPrice] = useState(0)
//    async function  getAds(){
//     try {
//       const response = await axios.get(url);
//       console.log(response);
//       setHomeInfo(response);
//     } catch {}
//    };
//   useEffect(() => {
//     getAds();
//   }, []);

  const value = {
    // homeInfo,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export default HomeProvider;
