import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";


import api from "../services/api"
import logo from "../assets/img/completa_fundo_claro@4x.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://couponfeed.co">
        CouponFeed
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


export default class NotFound extends Component {
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
    const fid = decodeURIComponent(this.props.match.params.fid) || null;
    console.log({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.passw,
      cpf: this.state.cpf
      // ,
      // fid
    })
    await api.post(`/users`, {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.passw,
      cpf: this.state.cpf
      // ,
      // fid
    })
      .then(response => {
        this.setState({ fid: response.data.fid, done: true }, () => { console.log(this.state.fid) })

      })
      .catch(err => { console.error(err.response.data.error); this.setState({ error: err.response.data.error }) })

    // console.log(this.state, fid);

  }
  handleNameInput = event => {
    console.log(event.target.value);
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

    return (
      <>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* <Paper className={useStyles.paper}> */}
          <Grid container
            spacing={0}
            align="center"
            justify="center"
            direction="column"
          // style={{ backgroundColor: 'teal' }}
          >
            <div className={useStyles.content}>
              <img src={logo} alt="" style={{ width: '300px', paddingBottom: '70px' }} />


              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {/* <Card> */}
                  <CardHeader color="error">
                    <h4 className={useStyles.cardTitleWhite}>Página não encontrada</h4>
                    <p className={useStyles.cardCategoryWhite}>Desculpa, o FeedBot não encontrou nenhuma página para te mostrar.</p>
                  </CardHeader>


                </GridItem>
              </GridContainer>

            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Grid >

        </div >
      </>
    );
  }
}