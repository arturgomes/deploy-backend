import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../../App.css';
// import { Link } from 'react-router-dom'
import api from '../../services/api'
import { isAuthenticated, logout, getId, getName } from "../../services/auth";
import QrCode from 'react.qrcode.generator'

class Demo extends Component {
  render() {
    return <div>

      <QrCode size={500} value={this.props.link} />

    </div>
  }
}

// const validator = require('cpf-cnpj-validator')
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default class SignUp extends Component {
  state = {
    name: null,
    manager: null,
    phone: null,
    done: false,
    err: null,
    sid: null
  }
  handleSubmit = async event => {
    event.preventDefault();

    await api.post(`/shops`, {
      name: this.state.name,
      manager: this.state.manager,
      phone: this.state.phone,
      retail_id: getId()
    })
      .then(response => {
        this.setState({ done: true, sid: response.data.id })

      })
      .catch(error => { console.log(error); this.setState({ err: error }); });



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
    if (this.state.done) {
      const link = `https://couponfeed.co/feed/${this.state.sid}`
      return (<><p>Aqui está o QR Code para a loja </p>
        <Demo link={link} />
        <p>Teste <a href={link}>aqui</a> o link de feedback: </p>
        <Link href="/">
          <Button
            type="submit"
            style={{ marginBottom: 16 }}
            fullWidth
            // variant="contained"
            color="secondary"
          // className={useStyles.submit}
          > inicio </Button>
        </Link>
      </>)
    }
    return (
      <>

        {err ? <p>{err}</p> : ``}

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>

            <Typography component="h1" variant="h5" style={{ marginBottom: 16 }}>
              Olá, vamos cadastrar uma loja {getName()}?
        </Typography>
            <CssBaseline />

            <form className={useStyles.form} noValidate onSubmit={this.handleSubmit}>
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
                    label="Nome da Loja"
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
                    name="manager"
                    style={{ marginBottom: 16 }}
                    label="Gerente"
                    onChange={this.handleManagerInput}
                    value={this.state.manager}
                    autoComplete="fname"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                style={{ marginBottom: 16 }}
                fullWidth
                variant="contained"
                color="primary"
                className={useStyles.submit}
              >
                Cadastrar
          </Button>
            </form>

            <Link href="/">
              <Button
                type="submit"
                style={{ marginBottom: 16 }}
                fullWidth
                // variant="contained"
                color="secondary"
                className={useStyles.submit}
              > Voltar </Button>
            </Link>
          </div>

        </Container>




        {/* <form onSubmit={this.handleSubmit}>
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
        </form> */}

      </>
    );
  }
}

