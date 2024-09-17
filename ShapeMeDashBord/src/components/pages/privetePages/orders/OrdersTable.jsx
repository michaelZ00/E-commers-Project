import React, {
  useEffect,
  useState,
  useContext,
  useMemo
} from "react";
import axios from "axios";
import HeadBuild from "../products/table/HeadBuild";
import { AuthContext } from "../../../../contexts/AuthContext";
import BudyBuildOrders from "./BudyBuildOrders";
import Pagination from "../../../common/Pagination";
import Search from "../users/custemTable/TableUtils/Search";

import OrderPreview from "./OrderPreview";
const url = "http://localhost:3000/orders/getAll";
function OrdersTable() {
  // import ProudactForm from "./AddProducts/ProductsForm";
  // this page is to build the table for the Dashbord

  const { getProduct, setGetProduct } = useContext(AuthContext);
  const TABLE_HEAD = [
    "order number",
    "customer name",
    "customer address",
    "total price",
    "order status",
  ];
  const [table, setTabel] = useState([]);
  const [order, setOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tablePerPage] = useState(10);
  const filteredData = useMemo(() => {
    if (!searchTerm) return table;
    return table.filter(
      (data) =>
        data.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.customer_details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.customer_details.city.toLowerCase().includes(searchTerm.toLowerCase())||
        data.customer_details.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, table]);
  const indexOfLastItem = currentPage * tablePerPage;
  const indexOfFirstItem = indexOfLastItem - tablePerPage;
  const currentList = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  // a function to get all the products from the Data base

  async function show(order) {
    // setOrder(order);
    document.getElementById("my_modal_2").showModal();
  }

  async function fetchData() {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setTabel(response.data.orders);
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    fetchData();
  }, [getProduct]);
console.log(table)
  return (
    <>
    <div id="page" className="h-[80vh] flex justify-center  w-full">
      <div className="w-full">
        <div className="w-[80%] flex mx-auto">
          <div className="text-right w-[50%] mb-5 mx-auto">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>

        <div className="my_table">
          <table className="w-[80%] mx-auto min-w-max table-auto text-left">
            <thead>
              <tr key="cbbbb ">
                {TABLE_HEAD.map((head, index) => (
                  <HeadBuild value={head} ma={index} />
                ))}
                <HeadBuild value="Show" ma={10} />
              </tr>
            </thead>
            <BudyBuildOrders
              budy={currentList}
              show={show}
            />
          </table>
        </div>
        <OrderPreview />
      </div>
      {/* <ProudactForm value={TABLE_HEAD} product={oldProduct} /> */}
    </div>
      <div className="w-full flex justify-center mt-4">
          {filteredData && (
            <Pagination
            tablePerPage={tablePerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
              totalTable={filteredData.length}
            />
          )}
        </div>
            </>
  );
}

export default OrdersTable;
