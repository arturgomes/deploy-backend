import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { isAuthenticated, logout, getName, getTu, getId } from "../../services/auth";
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStylesS = makeStyles(theme => ({
  root: {
    marginBottom: '20px'
  },
  submit: {
    margin: theme.spacing(3),
  },
}));

export default class Main extends Component {
  state = {
    err: null
  }
  async componentDidMount() {
    if (getTu() !== "897316929176464ebc9ad085f31e7284") {
      this.getData()
    }
  }
  getData = async e => {

    await api.post("/users/s", { user_id: getId() })
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.setState({ err: error.response.data })
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          this.setState({ err: error.request.data })

        } else {
        }
      });
  }
  handleLogout = e => {
    e.preventDefault();
    // console.log('apeertou')
    logout();
    this.props.history.push("/");
  };
  consultaSaldo = async e => {
    e.preventDefault();



  }

  renderLogin = () => {
    return (<Box className={useStylesS.root}>
      <Link to="/login" >
        <Button type="submit" style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="primary">Faça Login</Button>
      </Link>
      <Link to="/signup" className="submit">
        <Button type="submit" style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="primary">Cadastre-se e acumule pontos</Button>
      </Link>
      <Link to="/retail" className="submit">
        <Button type="submit" style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="secondary">Cadastre sua empresa conosco</Button>
      </Link >
    </Box>)

  }
  renderRetail = () => {
    return (<Box mx="auto" className={useStylesS.root}>
      < Link to="/list-feedbacks" >
        <Button type="submit" style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="secondary">Listar todos Feedbacks</Button>
      </Link>
      < Link to="/list-qr" >
        <Button type="submit" style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="secondary">Listar todos QR Codes</Button>
      </Link>
      <Link to="/shop" className="submit">
        <Button type="submit" style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="primary">Cadastrar loja</Button>
      </Link> </Box>)
  }
  renderCustomer = () => {
    return (<>
      {/* <button type="submit"
                fullWidth
                variant="contained"
                color="primary">Consultar saldo</button> */}
    </>)
  }
  renderUser = () => {
    return (<>
      <p>Olá {getName()}</p>{
        (getTu() !== "897316929176464ebc9ad085f31e7284") ?
          this.renderRetail()
          : this.renderCustomer()}
      <form onSubmit={this.handleLogout}>
        <Button type="submit"
          style={{ marginBottom: 16 }}
          fullWidth
          variant="contained"
          color="primary">Sair</Button>
      </form></>)
  }

  render() {
    return (
      <>
        <p>Bem vindo ao CouponFeed!</p>
        {!isAuthenticated() ? this.renderLogin() : this.renderUser()}
      </>
    );
  }
}

