import React, { Component } from 'react';

// import ValCPF from 'validar-cpf';
import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Grid, Button, TextField, Link, } from '@material-ui/core/';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

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
      .then(response => {
        this.setState({ fid: response.data.fid, done: true }, () => { })

      })
      .catch(err => { console.error(err.response.data.error); this.setState({ error: err.response.data.error }) })

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
      if (this.state.fid) {
        return (<div className="thanks">Obrigado, {this.state.name}, pelo seu cadastro. Você acabou de acumular 1 Feedcoin. Lembre-se, faça seu login ao final de cada feedback que você der e acumulará mais pontos. Até breve!

        <Link href='/' ><Button >Voltar ao Inicio</Button></Link>
        </div>)
      }
      return (<div>Obrigado, {this.state.name}, pelo seu cadastro. Lembre-se, faça seu login ao final de cada feedback que você der e acumulará mais pontos. Até breve!

        <Link href="/" ><Button>Voltar ao Inicio</Button></Link>
      </div>)
    }
    const err = this.state.error;
    return (
      <>
        <p>Olá, que bom ver você aqui. Vamos fazer um breve cadastro seu para começar a acumular os FeedCoins.</p>
        {err ? <div className="divError">{err}</div> : ``}

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
                label="Nome"
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
                name="cpf"
                style={{ marginBottom: 16 }}
                label="CPF"
                onChange={this.handleCPFInput}
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

