import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
import { login } from "../../services/auth";


class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  }
  handleSignIn = async e => {
    e.preventDefault();
    console.log("Entrou no api")

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        console.log("Entrou no api")
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/feed");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };
  render() {
    return (
      <>
        <p>Bem vindo ao CouponFeed!</p>
        <form onSubmit={() => this.handleSignIn}>
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
          {/* <Link to="/signup">
            <button className="btn1" type="submit">Cadastre-se</button>
          </Link> */}
        </form>

      </>
    );
  }
}


export default withRouter(Login);