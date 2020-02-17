import React, { Component, Fragment } from 'react';
import { MenuItem, InputLabel, FormControl, Box, Button } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

import '../../App.css';
import api from '../../services/api'
import { isAuthenticated, getId, getName, logout } from "../../services/auth";


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default class CreateCoupon extends Component {
  state = {
    qr: [],
    err: ""
  }

  async componentDidMount() {
    await api.post("/qr", { retail_id: getId() })
      .then(response => {
        this.setState({ qr: response.data })
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          // console.log(error.response.data);
          this.setState({ err: error.response.data })
        } else if (error.request) {
          this.setState({ err: error.request.data })
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          // console.log(error.request);
        }

      })
  }

  handleLogout = e => {
    e.preventDefault();
    logout();
    this.props.history.push("/");
  };
  handleMain = e => {
    e.preventDefault();
    this.props.history.push("/");
  };


  render() {
    let listShops;
    const { err } = this.state;
    if (isAuthenticated()) {


    }


    return (
      <>
        <p>Olá, vamos cadastrar um novo cupon? É possível escolher três tipos de cupons:
        <ul>
            <li>Cupon de troca de Feedcoins por desconto em dinheiro.</li>
            <li>Cupon de troca de Feedcoins por desconto em porcentagem.</li>
            <li>Cupon de troca de Feedcoins por produtos.</li>
          </ul>

        </p>
        {err ? <div className="divError">{err}</div> : ``}

        <form onSubmit={this.handleSubmit}>
          <FormControl className={useStyles.formControl}>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >

              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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

