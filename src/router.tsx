import { createBrowserRouter } from "react-router-dom";

import Landing from "./views/Landing";
import Layout from "./layouts/Layout";
import Order from "./views/Order";
import UserAddresses from "./components/user/UserAddresses";
import UserProfile from "./components/user/UserProfile";
import UserOrders from "./components/user/UserOrders";
import AdminLayaout from "./components/layout/AdminLayaout";

export const router = createBrowserRouter([
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
      
    ],
  },
]);
