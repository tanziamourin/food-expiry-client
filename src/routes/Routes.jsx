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
import MyProfile from "../pages/private/MyProfile";
import AllNearlyExpiry from "../components/NearlyExpiryPage";
import RecipeBeforeExpiry from "../pages/RecipeBeforeExpiry";
// import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/fridge", element: <Fridge></Fridge> },
      { path: "/recipe-before-expiry", element: <RecipeBeforeExpiry></RecipeBeforeExpiry> },
      
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

  
      { path: "/foods/:id", element: <FoodDetails></FoodDetails> },
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

      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
