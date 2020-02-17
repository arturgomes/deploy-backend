import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactDOM from "react-dom";

import "./index.css";
// import App from "./App";
import * as Sentry from "@sentry/browser";
import "./assets/css/material-dashboard-react.css?v=1.8.0";
import Retail from "./layouts/Retail.js";
// import Customer from "./layouts/Customer.js";
// import SignUp from "./layouts/SignUp.js";
import SignIn from "./layouts/SignIn.js";
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
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
    }
  />
);

Sentry.init({
  dsn: "https://cb3fbccb62764b31a231c13b1b33311a@sentry.io/2180063"
});
// import { HashRouter } from 'react-router-dom';

// import * as serviceWorker from './serviceWorker';
// import configureStore from './config/configureStore';
// import { Provider } from 'react-redux';
// const store = configureStore();

// ReactDOM.render(
//   // <Provider store={store}>
//   // {/* // <HashRouter> */ }
//   <App />,
//   // {/* // </HashRouter> */ }
//   // </Provider>,
//   document.getElementById("root")
// );
const hist = createBrowserHistory();
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/signin" component={SignIn} />

      <PrivateRoute path="/retail" component={Retail} />

      {/* <Route path="/rtl" component={RTL} /> */}
      {/* <Redirect from="/" to="/" /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
