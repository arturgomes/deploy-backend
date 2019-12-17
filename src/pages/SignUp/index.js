import React, { Component } from 'react';

// import ValCPF from 'validar-cpf';
import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'

// const validator = require('cpf-cnpj-validator')

export default class SignUp extends Component {
  state = {
    email: null,
    cpf: null,
    name: null,
    phone: null,
    passw: null,
    done: false,
    error: null
  }
  handleSubmit = async event => {
    event.preventDefault();
    const fid = decodeURIComponent(this.props.match.params.fid);

    await api.post(`/users`, {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.passw,
      cpf: this.state.cpf,
      fid
    })
      .then(response => this.setState({ fid: response.data.fid }, () => { }))
      .catch(error => { console.log(error) });
    // console.log(this.state, fid);
    this.setState({ done: true });
    this.props.history.push("/");
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
  cpfMask = value => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
  handleCPFInput = event => {
    // const cpf = event.target.value;

    // if (!Joi.validate(cpf, cpfSchema)) {
    //   this.setState({ error: "CPF inválido" })
    // }
    // else {
    this.setState({
      cpf: this.cpfMask(event.target.value)
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
    if (this.state.done) {
      return (<div>Obrigado pelo seu cadastro. Você acabou de acumular 1 Feedcoin. Lembre-se, faça seu login ao final de cada feedback que você der e acumulará mais pontos. Até breve! </div>)
    }
    return (
      <>
        <p>Olá, que bom ver você aqui. Vamos fazer um breve cadastro seu para começar a acumular os FeedCoins.</p>
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
            // type="text"
            maxLength='14'
            // autoComplete="phone"
            placeholder="Seu cpf"
            onChange={this.handleCPFInput}
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

