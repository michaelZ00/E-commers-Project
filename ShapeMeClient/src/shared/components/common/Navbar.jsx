import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../../features/cart/contexts/CartContext";
import { AuthContext } from "../../../features/auth/contexts/AuthContext";
import { CgProfile } from "react-icons/cg";
import { LuShoppingCart } from "react-icons/lu";
import logo from "../../../assets/images/logo.png";
import Search from "../layout/Search";
import Form from "./Form";
import { IoMdSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FavoritContext } from "../../../features/favorit/context/FavoritContext";

const url = "http://localhost:3000/products/productsList";

function Navbar() {
  const navigate = useNavigate();
  const { totalFavorites, favoritList } = useContext(FavoritContext);
  const { totalProducts } = useContext(CartContext);
  const { isAuth, searchTerm, setSearchTerm, userData, isUser, setIsUser } =
    useContext(AuthContext);

  const mySearchh = document.getElementById("my-search");
  const navStyleContent = "text-wight text-2xl italic font-bold";
  const location = useLocation();
  const currentPath = location.pathname;

  const getLinkClass = (path) =>
    `text-lg font-medium ${
      currentPath === path
        ? "border-b-2 border-blue-700 font-bold text-white" // Change underline color to strong blue and text color to white
        : "border-b-2 border-transparent hover:border-blue-700 text-gray-300 hover:text-white" // Change hover underline color to strong blue
    }`;

  const handleSearch = (e) => {
    e.preventDefault();

    let path;
    if (currentPath.includes("blog")) {
      path = "/blog";
    } else if (currentPath.includes("productsList")) {
      path = "/productsList";
    } else if (currentPath.includes("articles")) {
      path = "/articles";
    } else if (currentPath.includes("pageProfile")) {
      path = "/pageProfile";
    } else {
      path = "/productsList"; // default
    }
    if (searchTerm) {
      navigate(`${path}?query=${searchTerm}`);
    } else {
      navigate(`${path}`);
    }
  };
  return (
    <>
      <nav
        className="min-h-[76px] flex-no-wrap   items-center justify-between py-2 shadow-dark-mild dark:bg-black lg:flex-wrap lg:justify-start lg:py-4"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="flex justify-between    gap-2   ">
          {/* dropDown (categories when the screen is small or mid) */}
          <div className="px-2 dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn  btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-accent-content dark:bg-accent-content text-black rounded-box z-[5] mt-3 w-52 p-2 shadow lg:hidden"
            >
              <li>
                <Link
                  to="/blog"
                  onClick={() => (mySearchh.value = "")}
                  className={getLinkClass("/blog")}
                >
                  <span className={navStyleContent}>blog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/productsList"
                  onClick={() => (mySearchh.value = "")}
                  className={getLinkClass("/productsList")}
                >
                  <span className={navStyleContent}>Products</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  onClick={() => (mySearchh.value = "")}
                  className={getLinkClass("/articles")}
                >
                  <span className={navStyleContent}>article</span>
                </Link>
              </li>
              {!isAuth && (
                <>
                  <div className="flex">
                    <button
                      onClick={() => {
                        setIsUser(true);
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="w-[50%] h-[25px] rounded-md bg-blue-500 px-4 text-white mt-2"
                    >
                      Sign In
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setIsUser(false);
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="w-[50%] h-[25px] rounded-md bg-green-500  px-4 text-white mt-2"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </ul>
          </div>
          {/* logo */}
          <div className="flex items-center mr-16">
            <Link to="/" className="" onClick={() => (mySearchh.value = "")}>
              <img src={logo} className="w-[50px] h-11 items-center" />
            </Link>
          </div>

          {/* category for when the screen is Large+ */}
          <div className="flex-grow flex lg:items-center justify-start space-x-6 hidden lg:block">
            <Link
              to="/blog"
              onClick={() => (mySearchh.value = "")}
              className={getLinkClass("/blog")}
            >
              <span className={navStyleContent}>blog</span>
            </Link>

            <Link
              to="/productsList"
              onClick={() => (mySearchh.value = "")}
              className={getLinkClass("/productsList")}
            >
              <span className={navStyleContent}>Products</span>
            </Link>

            <Link
              to="/articles"
              onClick={() => (mySearchh.value = "")}
              className={getLinkClass("/articles")}
            >
              <span className={navStyleContent}>article</span>
            </Link>
          </div>

          {/* Right elements */}
          <div className="relative flex items-center gap-2">
            {/* search button when the screen is large + */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
              <button type="submit" className="hidden">
                Search
              </button>
            </form>
            {/* search button to mobile mode */}
            <button
              className=" md:hidden"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <IoMdSearch color="white" size={30} />
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className=" absolute top-20 ">
                <div className="modal-action">
                  <form method="dialog">
                    <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
                    <button type="submit" className="hidden">
                      Search
                    </button>
                    {/* if there is a button in form, it will close the modal */}
                  </form>
                </div>
              </div>
            </dialog>
            <Link
              className="relative inline-block me-4 text-neutral-600 dark:text-white"
              to="/Favorit"
            >
              <FaStar size={30} color="white" />
            </Link>
            <Link className="me-4 text-neutral-600 dark:text-white" to="/cart">
              <LuShoppingCart
                size={30}
                className="text-white text-2xl italic  font-bold"
              />
              <span className="absolute -mt-7 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                {totalProducts}
              </span>
            </Link>

            <div className="flex items-center justify-center">
              {isAuth ? (
                <div className="flex items-center gap-2">
                  <Link
                    className="me-4 text-white dark:text-white"
                    to="/pageProfile"
                  >
                    <CgProfile size={30} color={"white"} />
                  </Link>
                </div>
              ) : (
                <div className="flex hidden md:block">
                  <button
                    onClick={() => {
                      setIsUser(true);
                      document.getElementById("my_modal_1").showModal();
                    }}
                    className="rounded-l-md bg-blue-500 py-2 px-4 text-white"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsUser(false);
                      document.getElementById("my_modal_1").showModal();
                    }}
                    className="rounded-r-md bg-green-500 py-2 px-4 text-white"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
          <Form />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
