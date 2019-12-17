import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import SignUpRetail from './pages/SignUpRetail';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/auth/:fid" component={Login} />
        <Route path="/signup/:fid" exact component={SignUp} />
        <Route path="/retail/" exact component={SignUpRetail} />
        <Route path="/feed/:id" component={Feedback} />
      </Switch>
    </BrowserRouter>)
}