import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { Button, CssBaseline, TextField, Link, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import '../../App.css';
import api from '../../services/api'

import { login, isAuthenticated } from "../../services/auth";


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
    marginTop: theme.spacing(1),
  },
  submit: {

    margin: theme.spacing(1),
  },
}));

class Login extends Component {
  state = {
    email: "",
    password: "",
    err: null
  }
  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
      console.log(this.state.error);
    } else {
      await api.post("/sessions", { email, password })
        .then(response => {
          if (response.data.login !== null) {
            const { name, id, tu } = response.data.login;
            login(response.data.token, name, id, tu);
            this.props.history.push("/");
          }
          else {
            this.setState({ err: "Usuario ou senha inválidos" })
          }
        })
        .catch((error) => {
          // Error 😨
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            this.setState({ err: error.response.data })

          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
          }
        });

    }
  };
  render() {
    // const useStyles.= useStyles();
    console.log("isAuthenticated==", isAuthenticated())
    if (isAuthenticated()) {
      console.log("Autenticado")
      this.props.history.push("/")
    }
    const err = this.state.error;
    return (
      <>
        {/* {err ? <div className="divError">{err}</div> : ``}*/}


        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>
            {/* <Avatar className={useStyles.avatar}>
              <img src={contente} className="CardImage" />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Bem vindo ao CouponFeed!
        </Typography>
            <form className={useStyles.form} noValidate onSubmit={this.handleSignIn}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => this.setState({ email: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                style={{ marginBottom: 16 }}
                fullWidth
                variant="contained"
                color="primary"
                className={useStyles.submit}
              >
                Entrar
          </Button>
            </form>
            <Link to="/signup">
              <Button
                type="submit"
                style={{ marginBottom: 16 }}
                fullWidth
                variant="contained"
                color="secondary"
                className={useStyles.submit}
              > Cadastre-se </Button>
            </Link>
          </div>
        </Container>

        {/*}
        <form onSubmit={this.handleSignIn}>
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
          <div className="btn-container">
            <button className="btn" type="submit">Entrar</button>
            <Link to="/signup">
              <button className="btn1" type="submit">Cadastre-se</button>
            </Link>
          </div>
        </form> */}

      </>
    );
  }
}


export default withRouter(Login);