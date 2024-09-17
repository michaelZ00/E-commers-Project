import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/contexts/AuthContext";
import OrderModal from "./OrderModal";
import axios from "axios";

function UserOrders() {
  const { userData } = useContext(AuthContext);
  const [myOrder, setMyOrder] = useState(null);
  const [myOrderList, setMyOrderList] = useState([]);
  useEffect(()=>{
getUsersOrders()
  },[])
  const getUsersOrders = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/users/getOrders",
        // data: favoritList,
        withCredentials: true,
      });
      setMyOrderList(response.data.orders);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyOrder = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:3000/orders/myOrder/${id}`,
      });
      console.log("hey")
      if (response.data.success) throw new Error(response.data.message);
      setMyOrder(response.data.order);
      console.log(response.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById("my_modal_order").showModal();
    }
  };
  const orderList = myOrderList.map((itme, i) => (
    <li
      id={i}
      onClick={() => {
        getMyOrder(itme);
      }}
    >
      <a>{i + 1}: order number</a>
    </li>
  ));
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        My Orders
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow overflow-y"
      >
        {orderList}
      </ul>
      <OrderModal order={myOrder} />
    </div>
  );
}

export default UserOrders;
