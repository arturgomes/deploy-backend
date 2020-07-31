import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { logout } from "../services/auth.js"

class Logout extends Component {
  
  render() {
    cookies.remove('session')
    window.open("http://localhost:3000/auth/logout", "_self");
    logout();
    return (
      <Redirect to="https://couponfeed.co" push={true} />
    );
  }
}

export default Logout;