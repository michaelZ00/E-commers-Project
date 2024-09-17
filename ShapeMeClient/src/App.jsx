// src/App.jsx
import React from "react";


import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";



import Header from "./shared/components/layout/Header";
import Footer from "./shared/components/layout/Footer";
import ProductList from "./features/products/components/ProductGrid";
import OrderSummary from "./features/orders/components/OrderSummary";
import CartSummary from "./features/cart/components/CartSummary";
import ProductPage from "./features/products/pages/ProductPage";
import ProductPreview from "./features/products/components/ProductPreview";
import ContactUs from "./features/contactUs/pages/ContactUs";
import ProfilePage from "./features/profile/pages/ProfilePage";
import BlogPage from "./features/blog/pages/BlogPage";
import ArticlePage from "./features/articles/pages/ArticlePage";
import PageProfile from "./features/profile/pages/PageProfile";
import Home from "./features/home/component/Home";
import FavoritPage from "./features/favorit/components/FavoritPage";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ResetPassword from "./features/auth/components/ResetPassword";

const Root = () => {
  return (
    <div className="">
      <Header />

      <div className="min-h-[86vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/productsList" element={<ProductList />} />
        <Route path="/orders" element={<OrderSummary />} />
        <Route path="/cart" element={<CartSummary />} />
        <Route path="/productCard/:Pid" element={<ProductPreview />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/productPage/:id" element={<ProductPage />} />
        <Route path="/pageProfile" element={<PageProfile />} />
        <Route path="/Favorit" element={<FavoritPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
