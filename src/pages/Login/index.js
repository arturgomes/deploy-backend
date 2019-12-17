import React, { Component } from 'react';
import '../../App.css';
// import { Link } from 'react-router-dom'
// import api from '../../services/api'

export default class Login extends Component {
  state = {
    email: null,
    passw: null
  }
  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state);

  }
  render() {
    const { email } = this.state;
    return (
      <>
        <p>Bem vindo ao CouponFeed!</p>
        <form onSubmit={() => this.handleSubmit}>
          <label htmlFor="email">E-mail*</label>
          <input
            type="email"
            id="email"
            autoComplete="username"
            placeholder="Seu email"
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <label htmlFor="email">Senha*</label>
          <input
            type="password"
            id="passw"
            autoComplete="current-password"
            placeholder="senha"
            onChange={event => this.setState({ passw: event.target.value })}

          />
          <button className="btn" type="submit">Entrar</button>
        </form>

      </>
    );
  }
}


