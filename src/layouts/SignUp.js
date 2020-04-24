import React, { Component } from "react";
import cep from 'cep-promise';
import { isCEP, formatToCEP, isCPF, formatToCPF } from 'brazilian-values';

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
      <Link color="inherit" href="process.env.BASE_URL">
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
    email: "",
    cpf: "",
    tmp_cpf: "",
    name: "",
    phone: "",
    passw: "",
    address_street: "",
    address_number: "",
    address_comp: "",
    address_neighb: "",
    address_city: "",
    address_state: "",
    address_zip: "",
    address_country: "",
    done: false,
    error: "",
  }
  handleSubmit = async event => {
    event.preventDefault();
    await api.post(`/users`, {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.passw,
      cpf: this.state.cpf,
      address_street: this.state.address_street,
      address_number: this.state.address_number,
      address_city: this.state.address_city,
      address_state: this.state.address_state,
      address_zip: this.state.address_zip,
      address_neighb: this.state.address_neighb,
      address_comp: this.state.address_comp,
      // address_country: this.state.address_country
    })
    .then(response => { this.setState({ id: response.id }) })
    .catch(e => { this.setState({error:e.error})});
    this.setState({ done: true });
    console.log(this.state);
  }

  handleAddressNumber = event => {
    this.setState({
      address_number: event.target.value
    })
  }
  handleAddressZip = event => {
    event.persist()
    this.setState({ address_zip: event.target.value })
    if (event.target.value.length === 8) {
    cep(event.target.value).then(response => {
      this.setState({
        address_street: response.street,
        address_neighb: response.neighborhood,
        address_city: response.city,
        address_state: response.state,
        address_zip: formatToCEP(event.target.value)
      })
    })
      .catch(err => this.setState({ error: err.message }))

    }
  }

  handleAddressCountry = event => {
    // console.log(event.target.value);
    this.setState({
      address_country: event.target.value
    })
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
  handleCPFInput = event => {
    this.setState({ tmp_cpf: formatToCPF(event.target.value) })
    if (isCPF(event.target.value)) {
      this.setState({
        cpf: formatToCPF(event.target.value),
      })
    }
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
    const err = this.state.error;

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
            <Grid container
              spacing={0}
              align="center"
              justify="center"
              direction="column"
            >
              <div className={useStyles.content}>
                <img src={logo} alt="" style={{ width: '300px', paddingBottom: '70px' }} />


                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader color="success">
                        <h4 className={useStyles.cardTitleWhite}>Cadastro realizado com sucesso!</h4>
                        <p className={useStyles.cardCategoryWhite}>Obrigado, {this.state.name}, pelo seu cadastro! Vamos começar fazendo login?</p>

                        {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
                      </CardHeader>
                      <CardBody>
                        <Link to={`/login/${this.props.fid}`}>
                          <Button type="submit"
                            style={{ marginBottom: 16 }}
                            fullWidth
                            // variant="contained"
                            color="primary"> Fazer login</Button>
                        </Link>
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
                      <h4 className={useStyles.cardTitleWhite}>Cadastrar Usuário</h4>
                      <h5 className={useStyles.cardCategoryWhite}></h5>

                      {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
                    </CardHeader>
                    <CardBody>
                      Olá, obrigado por escolher a CouponFeed. Vamos nos cadastrar?
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
                              name="cpf"
                              // style={{ marginBottom: 16 }}
                              label="CPF"
                              onChange={this.handleCPFInput}
                              value={this.state.tmp_cpf}
                              autoComplete="fname"
                            />
                            
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
                            // autoComplete="fname"
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
                            // autoComplete="fname"
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              // variant="outlined"
                              required
                              fullWidth
                              name="address_zip"
                              style={{ marginBottom: 16 }}
                              label="CEP"
                              onChange={this.handleAddressZip}
                              value={this.state.address_zip}
                              autoComplete="fname"
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <TextField
                              required
                              // disabled
                              fullWidth
                              name="address_number"
                              // style={{ marginBottom: 16 }}
                              label="Número"
                              onChange={this.handleAddressNumber}
                              value={this.state.address_number}
                              autoComplete="fname"
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              disabled
                              // variant="outlined"
                              // required
                              fullWidth
                              name="address_street"
                              style={{ marginBottom: 16 }}
                              label="Logradouro"
                              // onChange={this.handleAddressStreet}
                              value={this.state.address_street}
                              autoComplete="fname"
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              // required
                              fullWidth
                              name="address_comp"
                              style={{ marginBottom: 16 }}
                              label="Complemento"
                              onChange={this.handleAddressComp}
                              value={this.state.address_comp}
                              autoComplete="fname"
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <TextField
                              disabled
                              fullWidth
                              name="address_neighb"
                              // style={{ marginBottom: 16 }}
                              label="Bairro"
                              // onChange={this.handleAddressNeighb}
                              value={this.state.address_neighb}
                              autoComplete="fname"
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <TextField
                              disabled
                              fullWidth
                              name="address_city"
                              // style={{ marginBottom: 16 }}
                              label="Cidade"
                              // onChange={this.handleAddressNeighb}
                              value={this.state.address_city}
                              autoComplete="fname"
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={2}>
                            <TextField
                              disabled
                              fullWidth
                              name="address_state"
                              // style={{ marginBottom: 16 }}
                              label="Estado"
                              // onChange={this.handleAddressNeighb}
                              value={this.state.address_state}
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