import { createBrowserRouter } from "react-router-dom";

import Landing from "./views/Landing";
import Layout from "./layouts/Layout";
import Order from "./views/Order";
import UserAddresses from "./components/user/UserAddresses";
import UserProfile from "./components/user/UserProfile";
import UserOrders from "./components/user/UserOrders";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        element: <Landing />,
        index: true,
      },
      {
        path: "catalogo",
        element: <Order />,
      },
      {
        path: "/usuario/direcciones",
        element : <UserAddresses/>
      },
      {
        path: "/usuario/perfil",
        element : <UserProfile/>
      },
      {
        path: "/usuario/ordenes",
        element : <UserOrders/>
      },
    ],
  },
]);
