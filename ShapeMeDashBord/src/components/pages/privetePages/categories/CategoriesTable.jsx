import React, {
  useEffect,
  lazy,
  useState,
  startTransition,
  Suspense,
  useContext,
} from "react";
import axios from "axios";
import BudyBuild from "../products/table/BudyBuild";
import RowBuild from "../products/table/RowBuild";
import HeadBuild from "../products/table/HeadBuild";
import Buttons from "../products/table/Buttons"; // page for buttons style
import {
  redBtn,
  blueBtn,
  limeBtn,
} from "../products/table/styles/ButtonStyles";
import CategoryForm from "./CategoriesForm";
import BodyBuildcategories from "./BodyBuildCategories";
import OrderPreview from "../orders/OrderPreview";
function CategoriesTable() {
  const url = "http://localhost:3000/categories";
  const [fetchcategories, setFetchtcategories] = useState(null)
  const [categories, setcategories] = useState(null);
  const [category, setcategory] = useState(null);
  const getcategories = async () => {
    try {
      const response = await axios.get(`${url}/myCategories`);
      setcategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const updateCategory = async (data, url, method) => {
    try {
      const response = await axios({
        method,
        url,
        data,
      });
    } catch (error) {console.log(error)}
    finally{
      setFetchtcategories(prev => !prev)
    }
  };
  const show = (category)=>{
    setcategory(category)
    document.getElementById("my_modal_1").showModal();
  }
  const deleteCategory = async (id)=>{
    try {
      console.log(id)
      const response = await axios({
        method:"delete",
        url:`${url}/deleteCategory/${id}`
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    finally{
      setFetchtcategories(prev => !prev)
    }
  }
  useEffect(() => {
    getcategories();
  }, [fetchcategories]);

  // const { categories } = useContext(categoryContext);
  const TABLE_HEAD = ["category"];
  const [table, setTabel] = useState([]);
  const [searchcategory, setSearchcategories] = useState(null);

  return (
    <div id="page" className="h-[80vh] flex justify-center  w-full">
      <div className="w-full">
        <div className="w-[50%] flex mx-auto">
          <div className="text-right w-[40%] mb-5 mx-auto">
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                class="grow"
                placeholder="Search"
                id="search"
                onChange={(e) => {
                  // function to filter the table by product name note* need to check if using localStorage
                  // is needed
                  setSearchcategories(
                    categories.filter((p) => p.name.match(e.target.value))
                  );
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="text-right w-[10%] mb-5">
            <Buttons
              styles={blueBtn}
              value="Add"
              onClick={() => {
                setcategory(null);
                document.getElementById("my_modal_1").showModal();
              }}
            />
          </div>
        </div>

        <div className="my_table">
          <table className="w-[40%] mx-auto min-w-max table-auto text-left">
            <thead>
              <tr key="cbbbb ">
                {TABLE_HEAD.map((head, index) => (
                  <HeadBuild value={head} ma={index} />
                ))}
                <HeadBuild value="Action" ma={10} />
              </tr>
            </thead>
            <BodyBuildcategories
              budy={searchcategory ?? categories}
              show={show}
              deleteCategory={deleteCategory}
            />
          </table>
        </div>
        {/* <OrderPreview /> */}
      </div>
      <CategoryForm value={TABLE_HEAD} category={category} updateCategory={updateCategory}/>
    </div>
  );
}

export default CategoriesTable;
