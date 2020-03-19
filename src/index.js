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
import Feedback from "./layouts/Feedback.js";
import SignIn from "./layouts/SignIn.js";
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
              pathname: "/signin",
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
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/rsignup" component={SignUpRetail} />
      <Route path="/feed/:id" component={Feedback} />

      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/customer" component={Customer} />
      <PrivateRoute path="/retail" component={Retail} />
      {/* <PrivateRoute path="/customer" component={Customer} /> */}

      {/* <Route path="/rtl" component={RTL} /> */}
      {/* <Redirect from="/" to="/" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

