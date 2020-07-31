import React, { useState, useEffect,Component } from 'react';
import { Redirect } from "react-router-dom";
import { logout } from "../services/auth.js"
import * as Cookies from "js-cookie";


const Logout = ({ history }) => {
  useEffect(
    () => {
      logout();
      Cookies.set('session', 'value') // will set "cookie_name" to "value"
      Cookies.set('session.sig', 'value') // will set "cookie_name" to "value"
      Cookies.get('cookie_name') // will return "value"
      history.push("/login");
    },
    [history]
  );

  return  <Redirect to="/" push={true} />;
};

export default Logout;