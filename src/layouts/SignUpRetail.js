import React, { Component } from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "../components/Card/CardBody.js";


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


export default class SignUp extends Component {
  state = {
    email: null,
    cnpj: null,
    name: null,
    phone: null,
    passw: null,
    done: false,
    error: null,
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

    // console.log(this.state, fid);

  }
  handleNameInput = event => {
    // console.log(event.target.value);
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
    // const err = this.state.error;

    if (this.state.done && !this.state.error) {
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
                    <CardHeader color="success">
                      <h4 className={useStyles.cardTitleWhite}>Cadastro realizado com sucesso!</h4>
                      <p className={useStyles.cardCategoryWhite}>Obrigado, {this.state.name}, pelo seu cadastro! Entraremos em contato para começar a nossa parceria! Até já!</p>

                      {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
                    </CardHeader>
                    {/* <CardBody>
                        
                        </CardBody> */}
                    {/* </Card> */}

                  </GridItem>
                </GridContainer>

              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
              {/* </Container> */}
            </Grid >
            {/* </Paper> */}

          </div >
        </>
      );
    }
    const { error } = this.state;
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
              <Link
                href="/" variant="body2">
                <img src={logo} alt="" style={{ width: '300px', paddingBottom: '70px' }} />
              </Link>


              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={useStyles.cardTitleWhite}>Cadastrar Lojista</h4>
                      <h5 className={useStyles.cardCategoryWhite}>Olá, obrigado por escolher a CouponFeed. Vamos começar nossa parceria com um breve cadastro da sua empresa.</h5>

                      {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
                    </CardHeader>
                    <CardBody>
                      <form
                        className={useStyles.form}
                        noValidate
                        onSubmit={this.handleSubmit}
                      >
                        {error ? <div className="divError">{error}</div> : ``}

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              autoComplete="fname"
                              name="name"
                              // variant="outlined"
                              value={this.state.name}
                              onChange={this.handleNameInput}
                              required
                              fullWidth
                              id="name"
                              label="Nome"
                              autoFocus
                            />
                            {/* <CustomInput
                              labelText="Nome"
                              id="first-name"
                              value={this.state.name}
                              onChange={this.handleNameInput}
                              formControlProps={{
                                fullWidth: true
                              }}
                            /> */}
                          </GridItem>

                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              // variant="outlined"
                              required
                              fullWidth
                              name="cnpj"
                              // style={{ marginBottom: 16 }}
                              label="CNPJ"
                              onChange={this.handleCNPJInput}
                              value={this.state.cnpj}
                              autoComplete="fname"
                            />
                            {/* <CustomInput
                              labelText="CPF"
                              id="cpf"
                              onChange={this.handleCPFInput}
                              value={this.state.cpf}
                              formControlProps={{
                                fullWidth: true
                              }}
                            /> */}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              // variant="outlined"
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
                            {/* <CustomInput
                              labelText="Telefone"
                              placeholder="(__) __________"
                              onChange={this.handlePhoneInput}
                              value={this.state.phone}
                              id="email-address"
                              formControlProps={{
                                fullWidth: true
                              }}
                            /> */}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              // variant="outlined"
                              required
                              fullWidth
                              name="email"
                              style={{ marginBottom: 16 }}
                              label="Endereço de Email"
                              onChange={this.handleEmailInput}
                              value={this.state.email}
                              autoComplete="fname"
                            />
                            {/* <CustomInput
                              labelText="Endereço de Email"
                              id="email-address"
                              onChange={this.handleEmailInput}
                              value={this.state.email}
                              formControlProps={{
                                fullWidth: true
                              }}
                            /> */}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              required
                              fullWidth
                              name="passw"
                              // style={{ marginBottom: 16 }}
                              label="Senha"
                              type="password"
                              onChange={this.handlePasswInput}
                              value={this.state.passw}
                              autoComplete="fname"
                            />
                          </GridItem>
                        </GridContainer>


                        <GridContainer>

                          <GridItem xs={12} sm={12} md={12}>
                            <Button
                              fullWidth
                              type="submit"

                              color="success">
                              Tudo pronto pra começar!</Button>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>

                            <Link
                              href="/login" variant="body2">
                              {"Já é cadastrado? Faça já o seu login!"}
                            </Link>
                          </GridItem>
                        </GridContainer>
                      </form>

                      {/* <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Link href="/">

                            <Button
                              fullWidth
                              color="warning">
                              Sou Lojista e quero começar!</Button>
                          </Link>

                        </GridItem>
                      </GridContainer> */}
                    </CardBody>
                  </Card>

                </GridItem>
              </GridContainer>

            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
            {/* </Container> */}
          </Grid >
          {/* </Paper> */}

        </div >
      </>
    );
  }
}