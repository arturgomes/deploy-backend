import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';


import NotFound from '../layouts/NotFound';
import SignIn from "../layouts/SignIn";
import SignUp from "../layouts/SignUp";
import SignUpRetail from "../layouts/SignUpRetail";
import LandingPage from "../layouts/LandingPage/LandingPage";


const PublicRoutes = ({ match }) => (
  <Fragment>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/rsignup" component={SignUpRetail} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default PublicRoutes;