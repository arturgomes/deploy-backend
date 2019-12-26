import React, { Component } from 'react';

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
// const validator = require('cpf-cnpj-validator')

export default class SignUp extends Component {
  state = {
    email: null,
    cnpj: null,
    name: null,
    phone: null,
    passw: null,
    done: false,
    error: null,
    id: null
  }
  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    await api.post(`/retails`, {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.passw,
      cnpj: this.state.cnpj,
    })
      .then(response => { console.log(response); this.setState({ id: response.id }) })
      .catch(error => { console.log(error) });
    // console.log("Foi");
    // console.log(this.state, fid);
    this.setState({ done: true });
    // this.props.history.push("/");
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
    // const cnpj = event.target.value;
    // if (!Joi.validate(cnpj, cnpjSchema)) {
    // console.log("cnpj invalido")
    // this.setState({ error: "CNPJ inválido" })
    // }
    // else {
    this.setState({
      cnpj: event.target.value
    })
    // }
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

    const err = this.state.error;
    if (this.state.done && !this.state.error) {
      return (<><p>Obrigado! Entraremos em contato para começar a nossa parceria! Até já.


      </p> </>)
    }
    return (
      <>
        <p>Olá, obrigado por escolher a CouponFeed. Vamos começar nossa parceria com um breve cadastro da sua empresa.</p>
        {err ? <p>{err}</p> : ``}
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
    );
  }
}

