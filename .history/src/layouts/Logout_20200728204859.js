import React, { useState, useEffect,Component } from 'react';
import { Redirect } from "react-router-dom";
import { logout } from "../services/auth.js"
import * as Cookies from "js-cookie";


const Logout = ({ history }) => {
  useEffect(
    () => {
      logout();
      Cookies.remove('session') // will set "cookie_name" to "value"
      Cookies.remove('session.sig') // will set "cookie_name" to "value"
      history.push("/login");
    },
    [history]
  );

  return  <Redirect to="/" push={true} />;
};

export default Logout;