import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
      
    </AuthProvider>
  </React.StrictMode>
);
