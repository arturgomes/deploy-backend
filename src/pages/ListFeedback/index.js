import React, { Component } from 'react';

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
import { isAuthenticated, logout, getName, getId } from "../../services/auth";

// const validator = require('cpf-cnpj-validator')

export default class SignUp extends Component {
  state = {
    fb: null
  }
  async componentDidMount() {
    const response = await api.post(`/list`, { retail_id: getId() });
    if (!response.error) {
      const ans = response.feedbacks;
      console.log(ans)
      this.setState({
        fb: ans
      }, () => { });

    }
    else {
      this.setState({ error: "Loja não encontrada" })
    }
  }

  render() {
    // const { email, name, phone } = this.state;
    // console.log(this.state)
    if (isAuthenticated()) {

      return (
        <>
          <p>Olá, obrigado por escolher a CouponFeed. Vamos começar nossa parceria com um breve cadastro da sua empresa.</p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={this.state.name}
              onChange={this.handleNameInput}

            />

            <label htmlFor="phone">Telefone *</label>
            <input
              type="text"
              // autoComplete="phone"
              placeholder="(__) __________"
              onChange={this.handlePhoneInput}
              value={this.state.phone}
            />


            <label htmlFor="cnpj">CNPJ *</label>
            <input
              type="text"
              // autoComplete="phone"
              placeholder="Seu CNPJ"
              onChange={this.handleCNPJInput}
              value={this.state.cnpj}
            />

            <label htmlFor="email">E-mail *</label>
            <input
              // type="email"
              id="email"
              autoComplete="username"
              placeholder="Seu email"
              value={this.state.email}
              onChange={this.handleEmailInput}
              type="text"
            />
            <label htmlFor="passw">Senha *</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="senha"
              onChange={this.handlePasswInput}

            />
            <button className="btn" type="submit">Entrar</button>
          </form>

        </>
      )
    };
  }
}

