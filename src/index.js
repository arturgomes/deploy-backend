import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import ReactDOM from "react-dom";

import "./index.css";
// import App from "./App";
import * as Sentry from "@sentry/browser";
import "./assets/css/material-dashboard-react.css?v=1.8.0";
import Retail from "./layouts/Retail.js";
import Customer from "./layouts/Customer.js";
import Profile from "./layouts/Profile.js";
import PrintQRThermal from "./layouts/PrintQRThermal.js";
import PrintQR from "./layouts/PrintQR.js";
import Shortner from "./layouts/Shortner.js";
import Feedback from "./layouts/Feedback.js";
import Logout from "./layouts/Logout.js";
import Login from "./layouts/Login.js";
import SignUp from "./layouts/SignUp.js";
import SignUpRetail from "./layouts/SignUpRetail.js";
import LandingPage from "./layouts/LandingPage/LandingPage.js";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

Sentry.init({
  dsn: "https://cb3fbccb62764b31a231c13b1b33311a@sentry.io/2180063"
});


const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
// styleLink.href =
//   "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/login/" exact component={Login} />
      <Route path="/login/:fid" component={Login} />
      
      <Route path="/signup" exact component={SignUp} />
      <Route path="/signup/:fid" component={SignUp} />
      <Route path="/rsignup" component={SignUpRetail} />
      <Route path="/feed/:id" component={Feedback} />
      <Route path="/f/:short_url" component={Shortner} />
      <Route path="/print-thermal/:id" component={PrintQRThermal} />
      <Route path="/print-qr/:id" component={PrintQR} />

      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/customer" component={Customer} />
      <PrivateRoute path="/retail" component={Retail} />
      
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

