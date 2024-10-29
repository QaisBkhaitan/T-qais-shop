import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Categories from "./Componentes/Categories/Categories";
import Products from "./Componentes/Products/Products";
import Signin from "./Componentes/Signin/Signin";
import Signup from "./Componentes/Signup/Signup";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import CategoryProfucts from "./Componentes/Categories/CategoryProfucts.jsx";
import Cart from "./Componentes/Cart/Cart.jsx";
import ProductsDetails from "./Componentes/Products/ProductsDetails.jsx";
import ForgetPassword from "./Componentes/Signin/ForgetPassword.jsx";
import ResetPassword from "./Componentes/Signin/ResetPassword.jsx";
import Order from "./Componentes/Cart/Order.jsx";
import Profile from "./Pages/Profile.jsx";
import MyOrders from "./Pages/MyOrders.jsx";
import NotFound from "./Pages/Notfound.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path:'*',
          element : <NotFound />
        },
        {
          path: "/",
          element: <Categories />,
        },
        {
          path: "/products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/categories/:id",
          element: (
            <ProtectedRoutes>
              <CategoryProfucts />,
            </ProtectedRoutes>
          ),
        },
        {
          path: "/products/:id",
          element: <ProductsDetails />,
        },
        {
          path: "/Signin",
          element: <Signin />,
        },
        {
          path: "/Signup",
          element: <Signup />,
        },
        {
          path: "/Cart",
          element: (
            <ProtectedRoutes>
              <Cart />,
            </ProtectedRoutes>
          ),
        },
        {
          path: "/ForgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "/resetpassword",
          element: <ResetPassword />,
        },
        {
          path: "/Order",
          element: <Order />,
        },
        {
          path: "/Profile",
          element: <Profile />,
          children: [
            {
              path: "myOrders",
              element: <MyOrders />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}