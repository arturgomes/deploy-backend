import React from 'react';

import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Main from './pages/Main';
import ListQRCodes from './pages/ListQrCodes';
import FNF from './pages/FNF';
import SignUp from './pages/SignUp';
import SignUpRetail from './pages/SignUpRetail';
import ListFeedback from './pages/ListFeedback';
import CreateShop from './pages/CreateShop';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/" exact component={Login} />
        <Route path="/login/:fid" component={Login} />
        <Route path="/signup/" exact component={SignUp} />
        <Route path="/signup/:fid" component={SignUp} />
        <Route path="/retail/" exact component={SignUpRetail} />
        <Route path="/feed/:id" component={Feedback} />
        <PrivateRoute path="/shop/" exact component={CreateShop} />
        <PrivateRoute path="/list-feedbacks/" exact component={ListFeedback} />
        <PrivateRoute path="/list-qr/" exact component={ListQRCodes} />
        <Route path="*" component={FNF} />
      </Switch>
    </BrowserRouter>)
}