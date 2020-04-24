import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import {logout} from "../services/auth.js"

class Logout extends Component {
  render() {
    logout();
    return (
      <Redirect to="process.env.BASE_URL" push={true}/>
    );
  }
}

export default Logout;