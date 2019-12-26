import React, { Component } from 'react';

import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
// const validator = require('cpf-cnpj-validator')
import { Grid, Button, CssBaseline, TextField, Link, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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


      </p> <Link href="/">
          <Button
            type="submit"
            style={{ marginBottom: 16 }}
            fullWidth
            // variant="contained"
            color="secondary"
          // className={useStyles.submit}
          > inicio </Button>
        </Link></>)
    }
    return (
      <>
        <p>Olá, obrigado por escolher a CouponFeed. Vamos começar nossa parceria com um breve cadastro da sua empresa.</p>
        {err ? <p>{err}</p> : ``}
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                value={this.state.name}
                onChange={this.handleNameInput}
                required
                fullWidth
                id="name"
                label="Nome da Empresa"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Telefone"
                placeholder="(__) __________"
                onChange={this.handlePhoneInput}
                value={this.state.phone}
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                style={{ marginBottom: 16 }}
                label="Email"
                onChange={this.handleEmailInput}
                value={this.state.email}
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cnpj"
                style={{ marginBottom: 16 }}
                label="CNPJ"
                onChange={this.handleCNPJInput}
                value={this.state.cpf}
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passw"
                style={{ marginBottom: 16 }}
                label="Senha"
                type="password"

                onChange={this.handlePasswInput}
                value={this.state.passw}
                autoComplete="fname"
              />
            </Grid>
            {/* <Grid xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="senha"
                type="password"
                autoComplete="current-password"
                onChange={this.handlePasswInput}
              />
            </Grid> */}
          </Grid>

          <Button
            type="submit"
            style={{ marginBottom: 16 }}
            fullWidth
            variant="contained"
            color="primary"
          // className={useStyles.submit}
          >
            Cadastrar-se
          </Button>

        </form>
        <Link href="/">
          <Button
            type="submit"
            style={{ marginBottom: 16 }}
            fullWidth
            // variant="contained"
            color="secondary"
          // className={useStyles.submit}
          > voltar </Button>
        </Link>

      </>
    );
  }
}

