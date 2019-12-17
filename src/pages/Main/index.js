import React, { Component } from 'react';
import '../../App.css';
import { Link, Redirect } from 'react-router-dom'
// import api from '../../services/api'
import { isAuthenticated } from "../../services/auth";
const Autenticado = ({ component: Component, ...rest }) => (

  isAuthenticated() ? (
    <>Autenticado</>
  ) : (
      <Redirect to={{ pathname: "/" }} />
    )

);

export default class Main extends Component {
  state = {
    email: null,
    passw: null
  }
  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state);

  }
  render() {
    return (
      <>
        <p>Bem vindo ao CouponFeed!</p>

      </>
    );
  }
}

