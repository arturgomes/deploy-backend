// import React from "react";

// import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import { MdPerson, MdDashboard } from "react-icons/md";

import CustomerDashboardPage from "../views/Customer/Dashboard/Dashboard.js";
import CustomerProfile from "../views/Customer/CustomerProfile/CustomerProfile.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdDashboard,
    component: CustomerDashboardPage,
    layout: "/customer"
  },
  {
    path: "/user",
    name: "Perfil",
    icon: MdPerson,
    component: CustomerProfile,
    layout: "/customer"
  },

];

// const dashboardRoutes = getUser() === 'customer' ? customerPath : retailPath

export default dashboardRoutes;
