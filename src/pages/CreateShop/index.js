import React, { Component } from 'react';

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
import { isAuthenticated, logout, getId, getName } from "../../services/auth";

// const validator = require('cpf-cnpj-validator')

export default class SignUp extends Component {
  state = {
    name: null,
    manager: null,
    phone: null,
    done: false,
    err: null
  }
  handleSubmit = async event => {
    event.preventDefault();

    await api.post(`/shops`, {
      name: this.state.name,
      manager: this.state.email,
      phone: this.state.phone,
      retail_id: getId()
    })
      .then(response => { this.setState({ done: true }); })
      .catch(error => { console.log(error); this.setState({ err: error }); });
    // console.log(this.state, fid);

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


  handleManagerInput = event => {
    this.setState({
      manager: event.target.value
    });
  }

  handleLogout = e => {
    e.preventDefault();
    // console.log('apeertou')
    logout();
    this.props.history.push("/");
  };

  render() {
    // const { email, name, phone } = this.state;
    // console.log(this.state)
    const err = this.state.error;
    if (!isAuthenticated() && this.state.done && !this.state.error) {
      this.props.history.push("/");

    }
    return (
      <>
        <p>Olá, vamos cadastrar uma loja {getName()}?</p>
        {err ? <p>{err}</p> : ``}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Nome e Endereço da loja *</label>
          <input
            type="text"
            placeholder="Nome e Endereço da loja"
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


          <label htmlFor="phone">Gerente *</label>
          <input
            type="text"
            // autoComplete="phone"
            placeholder="Gerente"
            onChange={this.handleManagerInput}
            value={this.state.manager}
          />

          <button className="btn" type="submit">Cadastrar</button>
        </form>
        <form onSubmit={this.handleLogout}>
          <button className="btn" type="submit">Sair</button>
        </form>

      </>
    );
  }
}

