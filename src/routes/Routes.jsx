
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import Fridge from "../pages/Fridge";
import NotFound from "../pages/NotFound";
import AddFood from "../pages/private/AddFood";
import MyItems from "../pages/private/MyItems";
// import FoodDetails from "../pages/private/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import Fridge from "../pages/Fridge";
import FoodDetails from "../pages/private/FoodDetails";
// import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/fridge", element: <Fridge></Fridge> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // ✅ Private Routes
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
         
        ),
      },
      {
        path: "/my-items",
        element: (
          <PrivateRoute>
            <MyItems />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "/food/:id",
      //   element: (
      //     <PrivateRoute>
      //       <FoodD
      //     </PrivateRoute>
      //   ),
      // },
        {
        path: "/foods/:id",
        element: (
          <PrivateRoute>
      
      <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
