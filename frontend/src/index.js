import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { AuthContextProvider } from "./Context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="163951458426-d2cdh9d0t887aamna7fjt43po7ihjcvp.apps.googleusercontent.com">
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
