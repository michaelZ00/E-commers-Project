import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../auth/contexts/AuthContext";
import axios from "axios";

export const FavoritContext = createContext();

function FavoritProvider({ children }) {

  const [totalFavorits, setTotalFavorits] = useState(0);

  const notify = () =>
    toast.success("Product was added to Favorit", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const { isAuth} = useContext(AuthContext);
  const [favoritList, setFavoritList] = useState([]);
  const updateFavorit = (product) => {
    const result = favoritList.find((p) => p._id === product._id);
    if (!result) {
      setFavoritList([...favoritList, product]);
    } else
      setFavoritList(() =>
        favoritList.filter((item) => item._id !== product._id)
      );
  };
  useEffect(() => {
    if (isAuth){
getUserFavorit()
    }
    else{
    const storedFavoritItems = localStorage.getItem("FavoritList");
    if(storedFavoritItems) setFavoritList(JSON.parse(storedFavoritItems))
    }
    },[isAuth])
  const resetFavoritList = () => setFavoritList([]);

  useEffect(() => {
    if (isAuth) {
      updateUserFavorit();
    } else {
      localStorage.setItem("FavoritList", JSON.stringify(favoritList));
    }
  }, [favoritList]);

  // function to update the user favorit on the data base
  const getUserFavorit = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/users/getFavorite",
        data: favoritList,
        withCredentials: true,
      });
      setFavoritList(response.data.favorite);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // function to update the user favorit on the data base
  const updateUserFavorit = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/users/updateFavorite",
        data: favoritList,
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (isAuth) {
  //     updateUserFavorit();
  //   } else localStorage.setItem("FavoritList", JSON.stringify(favoritList));
  // }, [favoritList]);



  const value = {
    favoritList,
    setFavoritList,
    resetFavoritList,
    updateFavorit,
    totalFavorits,
  };

  return (
    <FavoritContext.Provider value={value}>{children}</FavoritContext.Provider>
  );
}

export default FavoritProvider;
