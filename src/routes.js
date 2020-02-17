// import React from "react";

// import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

// import Login from "./views/Login";
// import Feedback from "./views/Feedback";
// import Main from "./views/Main";
// import FNF from "./views/FNF";
// import SignUp from "./views/SignUp";
import ListQRCodes from "./views/Retail/ListQrCodes";
// import SignUpRetail from './views/Retail/SignUpRetail';
import ListFeedback from "./views/Retail/ListFeedback";
import CreateShop from "./views/Retail/CreateShop";
// import CreateCoupon from './views/Retail/CreateCoupon';
// import NotificationsPage from "./views/Retail/Notifications/Notifications.js";
import RetailDashboardPage from "./views/Retail/Dashboard/Dashboard.js";
import RetailProfile from "./views/Retail/RetailProfile/RetailProfile.js";

// import { isAuthenticated } from "./services/auth";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//     }
//   />
// );

// function Routes() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         {/* <Route path="/" exact component={Main} /> */}
//         {/* <Route path="/feed/:id/" component={Feedback} /> */}
//         {/* <Route path="/login" exact component={Login} /> */}
//         {/* <Route path="/login/:fid" component={Login} /> */}
//         {/* <Route path="/signup" exact component={SignUp} /> */}
//         {/* <Route path="/signup/:fid" component={SignUp} /> */}
//         {/* <Route path="/retail" exact component={SignUpRetail} /> */}
//         {/* <PrivateRoute path="/shop" exact component={CreateShop} /> */}
//         {/* <PrivateRoute path="/list-feedbacks" exact component={ListFeedback} /> */}
//         {/* <PrivateRoute path="/list-qr" exact component={ListQRCodes} /> */}
//         {/* <PrivateRoute path="/create-coupon" exact component={CreateCoupon} /> */}
//         <Route path="*" component={FNF} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

const dashboardRoutes = [
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
  // {
  //   path: "/create-coupon",
  //   name: "Cadastrar Cupom",
  //   icon: ConfirmationNumberIcon,
  //   component: CreateCoupon,
  //   layout: "/retail"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notificações",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/retail"
  // }
];

export default dashboardRoutes;
