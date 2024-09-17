import React, { useContext, useEffect, useState } from "react";
// import CartItem from "./CartItem";
import HomeAdds from "./HomeAdds";
import HomeProvider, { HomeContext } from "../context/HomeContext";
import Button from "../../../shared/components/common/Button";
import { blueBtn } from "../../../shared/components/style/ButtonStyle";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../auth/contexts/AuthContext";
// import UserModal from "./UserModal";

function Home() {
//   const { login, isAuth, objectSchemaLogin,authUser, setSignUp, signUp } =
//     useContext(AuthContext);


//   console.log("hey");
  return (
    <HomeProvider>
<HomeAdds/>
    </HomeProvider>
  );
}

export default Home;
