import React, { Component } from 'react';
import { validate, format, generate } from 'cnpj';

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'

export default class SignUp extends Component {
  state = {
    email: null,
    cnpj: null,
    name: null,
    phone: null,
    passw: null,
    done: false,
    error: null
  }
  handleSubmit = async event => {
    event.preventDefault();

    await api.post(`/retails`, {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.passw,
      cnpj: this.state.cpf,
    })
      .then(response => { })
      .catch(error => { console.log(error) });
    // console.log(this.state, fid);
    this.setState({ done: true });
  }
  handleNameInput = event => {
    this.setState({
      name: event.target.value
    })
  }

  handlePhoneInput = event => {
    this.setState({
      phone: event.target.value
    })
  }
  handleCNPJInput = event => {
    const cnpj = event.target.value;
    if (!validate(cnpj)) {
      this.setState({ error: "CNPJ inválido" })
    }
    else {
      this.setState({
        cnpj: format(event.target.value)
      })
    }
  }

  handleEmailInput = event => {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswInput = event => {
    this.setState({
      passw: event.target.value
    });
  }
  render() {
    // const { email, name, phone } = this.state;
    // console.log(this.state)
    if (this.state.done) {
      return (<div>Obrigado! Entraremos em contato para começar a nossa parceria! Até já. </div>)
    }
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


          <label htmlFor="phone">CPF *</label>
          <input
            type="text"
            // autoComplete="phone"
            placeholder="Seu cpf"
            onChange={this.handleCNPJInput}
            value={this.state.cpf}
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
    );
  }
}

