import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./contexts/AuthContext.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> Pass your Google Client ID */}
      <App />
    {/* </GoogleOAuthProvider> */}
  </AuthProvider>
);
