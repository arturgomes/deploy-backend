// import React from "react";

// import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import ListQRCodes from "../views/Retail/ListQrCodes";
import ListFeedback from "../views/Retail/ListFeedback";
import CreateShop from "../views/Retail/CreateShop/CreateShop.js";
import RetailDashboardPage from "../views/Retail/Dashboard/Dashboard.js";
import RetailProfile from "../views/Retail/RetailProfile/RetailProfile.js";

import CustomerDashboardPage from "../views/Customer/Dashboard/Dashboard.js";
import CustomerProfile from "../views/Customer/CustomerProfile/CustomerProfile.js";

import { getTu } from '../services/auth';


const retailPath = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: RetailDashboardPage,
    layout: "/retail"
  },
  {
    path: "/user",
    name: "Perfil",
    icon: Person,
    component: RetailProfile,
    layout: "/retail"
  },
  {
    path: "/list-feedbacks",
    name: "Listar Feedbacks",
    icon: "content_paste",
    component: ListFeedback,
    layout: "/retail"
  },
  {
    path: "/list-qr",
    name: "Listar QR codes",
    icon: "content_paste",
    component: ListQRCodes,
    layout: "/retail"
  },
  {
    path: "/shop",
    name: "Cadastrar Loja",
    icon: LocationOn,
    component: CreateShop,
    layout: "/retail"
  }
];

const customerPath = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: CustomerDashboardPage,
    layout: "/customer"
  },
  {
    path: "/user",
    name: "Perfil",
    icon: Person,
    component: CustomerProfile,
    layout: "/customer"
  },

];

const dashboardRoutes = getTu() === '897316929176464ebc9ad085f31e7284' ? customerPath : retailPath

export default dashboardRoutes;
