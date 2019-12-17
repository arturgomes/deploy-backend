import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
import { login, isAuthenticated } from "../../services/auth";


class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  }
  handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        if (response.user) {
          login(response.data.token, response.data.user.name, response.data.user.id);
          this.props.history.push("/");
        }
        else {
          login(response.data.token, response.data.retail.name, response.data.retail.id);
          this.props.history.push("/");
        }
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };
  render() {
    if (isAuthenticated()) {
      this.props.history.push("/")
    }
    return (
      <>
        <p>Bem vindo ao CouponFeed!</p>
        <form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            autoComplete="usename"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            autoComplete="current-password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button className="btn" type="submit">Entrar</button>
          <Link to="/signup">
            <button className="btn1" type="submit">Cadastre-se</button>
          </Link>
        </form>

      </>
    );
  }
}


export default withRouter(Login);