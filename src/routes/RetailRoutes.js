// import React from "react";

// import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import { MdLocationOn, MdPerson, MdDashboard } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
// @material-ui/icons
// import LwistQRCodes from "../views/Retail/ListQrCodes";
import ListFeedback from "../views/Retail/ListFeedback";
import ManageShop from "../views/Retail/ManageShop/ManageShop.js";
import ManageCoupon from "../views/Retail/ManageCoupon/ManageCoupon.js";
import RetailDashboardPage from "../views/Retail/Dashboard/Dashboard.js";
import RetailProfile from "../views/Retail/RetailProfile/RetailProfile.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: MdDashboard,
    component: RetailDashboardPage,
    layout: "/retail"
  },
  {
    path: "/user",
    name: "Perfil",
    icon: MdPerson,
    component: RetailProfile,
    layout: "/retail"
  },
  {
    path: "/list-feedbacks",
    name: "Listar Feedbacks",
    icon: FaRegCommentDots,
    component: ListFeedback,
    layout: "/retail"
  },
  // {
  //   path: "/list-qr",
  //   name: "Listar QR codes",
  //   icon: FaQrcode,
  //   component: ListQRCodes,
  //   layout: "/retail"
  // },
  {
    path: "/shops",
    name: "Lojas",
    icon: MdLocationOn,
    component: ManageShop,
    layout: "/retail"
  },
  {
    path: "/coupons",
    name: "Cupons",
    icon: ConfirmationNumberIcon,
    component: ManageCoupon,
    layout: "/retail"
  }
];


export default dashboardRoutes;
