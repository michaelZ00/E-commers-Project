// import Form from "./components/form/Form";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { lazy, useContext, Suspense } from "react";
import { AuthContext } from "./contexts/AuthContext";
import NavigationBar from "./components/section/NavigationBar";
// import SimpelUserForm from "./components/pages/privetePages/users/custemTable/AddUser/SimpelUserForm.jsx";
const ProductsNode = lazy(() =>
  import("./components/pages/privetePages/products/ProductsNode.jsx")
);
const HomePage = lazy(() => import("./components/pages/privetePages/HomePage"));
const Login = lazy(() => import("./components/pages/publicPages/Login"));
import ManagersTable from "./components/pages/privetePages/users/ManagersTable.jsx";
import ForgotPassword from "./components/pages/publicPages/ForgotPassword.jsx";
import ResetPassword from "./components/pages/publicPages/ResetPassword.jsx";
import RegisterForm from "./components/pages/publicPages/RegisterForm.jsx";
import BrandsTable from "./components/pages/privetePages/brands/BrandsTable.jsx";
import ContactUsPage from "./components/pages/privetePages/contactUs/ContactUsPage.jsx";
import AdsTable from "./components/pages/privetePages/adds/AdsTable.jsx";
import CategoriesTable from "./components/pages/privetePages/categories/CategoriesTable.jsx";
// import OrdersTable from "./components/pages/privetePages/orders/OrdersTable.jsx";
const OrdersTable = lazy(() =>
  import("./components/pages/privetePages/orders/OrdersTable.jsx")
);
const Root = ({ isAuth }) => {
  return (
    <div>
      {isAuth && <NavigationBar />}
      <Suspense fallback={<div>Loding</div>}>
      <div className="mb-7">

        <Outlet />
      </div>
      </Suspense>
    </div>
  );
};

function App() {
  const { isAuth } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>
        {/* public routes */}
        <Route
          index
          element={
            isAuth ? <Navigate to={"/home"} /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/" element={<ResetPassword />} />
        <Route path="/registerForm/" element={<RegisterForm />} />
        managers/resetPassword
        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"login"} />}>
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/simpelform" element={<SimpelUserForm />} /> */}
          <Route path="/products" element={<ProductsNode />} />
          <Route path="/users/" element={<ManagersTable />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/brands" element={<BrandsTable/>} />
          <Route path="/contactUs" element={<ContactUsPage />} />
          <Route path="/ads" element={<AdsTable/>} />
          <Route path="/categories" element={<CategoriesTable />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
