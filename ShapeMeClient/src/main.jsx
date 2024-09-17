import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CartProvider from "./features/cart/contexts/CartContext.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ProductsProvider from "./features/products/contexts/ProductsContext.jsx";
import AuthProvider from "./features/auth/contexts/AuthContext.jsx";
import ProfileProvider from "./features/profile/context/ProfileContext.jsx";
import FavoritProvider from "./features/favorit/context/FavoritContext.jsx";
// import OrderProvider from "./features/orders/contexts/OrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <OrderProvider> */}

    <CartProvider>
      <FavoritProvider>
        <PayPalScriptProvider
          options={{
            intent: "capture",
            clientId:
              "AXRxqu3HlThacLZiwJKf8WPfVk92D0-LI3DKR9TTKxyDHfPSvf3M1u2eHZ1IuoccnHOhVRt3V761NXrw",
          }}
        >
          <ProductsProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </ProductsProvider>
        </PayPalScriptProvider>
      </FavoritProvider>
    </CartProvider>
    {/* </OrderProvider> */}
  </AuthProvider>
);
