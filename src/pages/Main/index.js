import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'
// import api from '../../services/api'
import { isAuthenticated, logout, getName } from "../../services/auth";


export default class Main extends Component {
  state = {
    email: null,
    passw: null
  }
  handleLogout = e => {
    e.preventDefault();
    // console.log('apeertou')
    logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <p>Bem vindo ao CouponFeed!</p>
        {!isAuthenticated() ?
          (<>
            <Link to="/signup">
              <button className="btn" type="submit">Cadastre-se e acumule pontos</button>
            </Link>
            <Link to="/retail">
              <button className="btn" type="submit">Cadastre sua empresa conosco</button>
            </Link> <Link to="/login">
              <button className="btn1" type="submit">Faça Login</button>
            </Link>
          </>) : (<>
            <p>Ola {getName()}</p>
            <Link to="/list-feedbacks">
              <button className="btn1" type="submit">Listar todos Feedbacks</button>
            </Link>
            <Link to="/shop">
              <button className="btn1" type="submit">Cadastrar loja</button>
            </Link>
            <form onSubmit={this.handleLogout}>
              <button className="btn" type="submit">Sair</button>
            </form></>)
        }
      </>
    );
  }
}

