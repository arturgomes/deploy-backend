import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { logout } from "../services/auth.js"

class Logout extends Component {
  serverLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("usr");
    localStorage.removeItem("ui");
    localStorage.removeItem("tu");
    localStorage.clear()
    fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
  }
  render() {
    this.serverLogout();
    logout();
    return (
      <Redirect to="https://couponfeed.co" push={true} />
    );
  }
}

export default Logout;