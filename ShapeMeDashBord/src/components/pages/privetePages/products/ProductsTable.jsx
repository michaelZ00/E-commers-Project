import React, {
  useEffect,
  useState,
  useContext,
  useMemo
   
} from "react";
import Search from "../users/custemTable/TableUtils/Search";
import axios from "axios";
import BudyBuild from "./table/BudyBuild";
import RowBuild from "../products/table/RowBuild";
import HeadBuild from "../products/table/HeadBuild";
import Buttons from "./table/Buttons";
// page for buttons style
import { blueBtn, limeBtn, redBtn } from "./table/styles/ButtonStyles";
// const ProductsForm = lazy(()=> import("./table/AddProducts/ProductsForm"))
import ProudactForm from "./table/AddProducts/ProductsForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import Preview from "./Preview";
// const Preview = lazy(()=> import("./Preview"))
import Pagination from "../../../common/Pagination";

const url = "http://localhost:3000/products";
const url2 = "http://localhost:3000/brands/myBrands";
const url3 = "http://localhost:3000/categories/myCategories";
// import ProudactForm from "./AddProducts/ProductsForm";
// this page is to build the table for the Dashbord
function Products() {
  const { getProduct, setGetProduct } = useContext(AuthContext);
  const TABLE_HEAD = [
    "product_name",
    "product_price",
    "product_amount",
    "product_brand",
  ];
  const Product_Build = {
    product_name:"Product Name",
    product_price:"Product Price",
    // product_type:"Product Type",
    // product_discription:"Product Dicription"
  }
  const [table, setTabel] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [oldProduct, setOldProduct] = useState(null);
  // localStorage.setItem("products", JSON.stringify(table))
  const [updatetedTable, SetUpdetedTable] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tablePerPage] = useState(10);
  const filteredData = useMemo(() => {
    if (!searchTerm) return table;
    return table.filter(
      (data) =>
        data.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.product_brand.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.product_category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, table]);
  const indexOfLastItem = currentPage * tablePerPage;
  const indexOfFirstItem = indexOfLastItem - tablePerPage;
  const currentList = filteredData.slice(indexOfFirstItem, indexOfLastItem);

async function show(product){
  setOldProduct(product)
  document.getElementById("my_modal_2").showModal()
}

  // a function to get all the products from the Data base

  async function update(product) {
    setOldProduct(product);
    document.getElementById("my_modal_1").showModal()
  }

  async function deleteProduct(product) {
    try {
      const response = await axios.delete(
        `${url}/deleteProduct/${product._id}`
      ,{withCredentials: true});
    } catch (error) {
      console.log(error);
    } finally {
      setGetProduct((prev) => !prev);
    }
  }
  async function fetchData() {
    try {
      const response = await axios.get(`${url}/productsList`, {withCredentials: true});
      const response2 = await axios.get(`${url2}`, {withCredentials: true});
      const response3 = await axios.get(`${url3}`, {withCredentials: true});
      setTabel(response.data.products)
      setBrands(response2.data.brands)
      setCategories(response3.data.categories)
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchData();
  }, [getProduct, ]);
;
  return (
    <>
    <div id="page" className="h-[80vh] flex justify-center  w-full">
      <div className="w-full">
        <div className="w-[80%] flex mx-auto">
        <div className="text-right w-[50%] mb-5 mx-auto">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="text-right w-[10%] mb-5">
          <Buttons
            styles={blueBtn}
            value="Add"
            onClick={() => {
              setOldProduct(null);
              document.getElementById("my_modal_1").showModal();
            }}
          />
        </div>
        </div>
      
        <div className="my_table">
          <table className="w-[80%] mx-auto min-w-max table-auto text-left">
            <thead>
              <tr name="myHead" key="1122213key">
                {TABLE_HEAD.map((head, index) => (
                  <HeadBuild value={head} ma={index} />
                ))}
                <HeadBuild value="Actions" ma={`10`} />
              </tr>
            </thead>
                <BudyBuild budy={currentList} update={update} deleteProduct={deleteProduct} show={show}/>

          </table>
        </div>
      </div>
      <ProudactForm value={TABLE_HEAD} categories={categories} brands={brands} build={Product_Build} product={oldProduct} />

      <Preview product={oldProduct}/>
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

export default Products;
