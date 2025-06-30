import { createBrowserRouter } from "react-router-dom";

import Landing from "./views/landing/Landing";
import Layout from "./views/layouts/Layout";
import Order from "./views/shop/Order";
import UserAddresses from "./components/user/UserAddresses";
import UserProfile from "./components/user/UserProfile";
import UserOrders from "./components/user/UserOrders";
import AdminLayaout from "./components/layout/AdminLayaout";
import Insumos from "./views/admin/insumos/Insumos";
import Login from "./views/auth/login/Login";
import Register from "./views/auth/register/Register";
import InsumosCategory from "./views/admin/insumos/insumosCategory/InsumosCategory";
import Product from "./views/admin/product/Product";
import ProductCategory from "./views/admin/product/productosCategory/ProductCategory";
import Orders from "./views/admin/order/Orders";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import Employee from "./views/admin/employee/Employee";
import Promotions from "./views/admin/promotions/Promotions";
import PromotionsTypes from "./views/admin/promotions/promotionsTypes/PromotionsTypes";
import LandingCompanies from "./views/landingCompanies/landingCompanies";
import Metrics from "./views/admin/metrics/Metrics";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register/company",
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
        path: "/companies",
        element: <LandingCompanies />,
      },
      {
        path: "/catalogo/:companyId",
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
  // Rutas protegidas solo para admin
  {
    path: "/admin",
    element: <PrivateRoutes allowedRoles={["COMPANY"]} />,
    children: [
      {
        path: "",
        element: <AdminLayaout />,
        children: [
          {
            path: "",
            element: <Metrics />,
          },
          {
            path: "promociones",
            element: <Promotions />,
          },

          {
            path: "promociones-tipos",
            element: <PromotionsTypes />,
          },
          {
            path: "insumos",
            element: <Insumos />,
          },
          {
            path: "insumos-categorias",
            element: <InsumosCategory />,
          },
          {
            path: "productos",
            element: <Product />,
          },
          {
            path: "productos-categorias",
            element: <ProductCategory />,
          },
          {
            path: "ordenes",
            element: <Orders />,
          },
          {
            path: "empleados",
            element: <Employee />,
          },
        ],
      },
    ],
  },
]);
