import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo.png"
import Swicher from "./Swicher"

const NavigationBar = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <header className="py-4 mb-20 bg-light-blue-500 dark:bg-gray-900 text-black dark:text-white">
      <nav className="container mx-5 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <img src={logo}  class="w-22 h-16"/>
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/home"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/brands"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Brands
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              categories
            </Link>
          </li>
          <li>
            <Link
              to="/ads"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Ads
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/contactUs"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              contact us
            </Link>
          </li>
          {/* <li>
            <Link
              to="/settings"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Settings
            </Link>
          </li> */}
          
          <li>
            <Link
              to="/users"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:text-gray-400 transition-colors duration-300"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </li>
          <li>
            <Swicher />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
