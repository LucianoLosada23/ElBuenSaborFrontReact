import { createBrowserRouter } from "react-router-dom";

import Landing from "./views/landing/Landing";
import Layout from "./views/layouts/Layout";
import Order from "./views/shop/Order";
import UserAddresses from "./components/user/UserAddresses";
import UserProfile from "./components/user/UserProfile";
import UserOrders from "./components/user/UserOrders";
import AdminLayaout from "./components/layout/AdminLayaout";
import Insumos from "./views/admin/insumos/Insumos";
import Productos from "./views/admin/Productos";
import Login from "./views/auth/login/Login";
import Register from "./views/auth/register/Register";
import InsumosCategory from "./views/admin/insumos/insumosCategory/InsumosCategory";

export const router = createBrowserRouter([

   {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // Layout general para usuarios
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "catalogo",
        element: <Order />,
      },
      {
        path: "usuario/direcciones",
        element: <UserAddresses />,
      },
      {
        path: "usuario/perfil",
        element: <UserProfile />,
      },
      {
        path: "usuario/ordenes",
        element: <UserOrders />,
      },
    ],
  },

  // Layout separado para admin (sin el layout general)
  {
    path: "/admin",
    element: <AdminLayaout />,
    children: [
      {
        path: "insumos",
        element: <Insumos />,
      },
      {
        path: "insumos-categorias",
        element: <InsumosCategory/>,
      },
      {
        path: "productos",
        element: <Productos />,
      },
    ],
  },
]);
