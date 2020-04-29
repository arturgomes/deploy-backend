

import React, { Component } from "react";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import GridItem from "../../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../../components/Grid/GridContainer.js";
import Button from "../../../../../components/CustomButtons/Button.js";
import Card from "../../../../../components/Card/Card.js";
import CardHeader from "../../../../../components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "../../../../../components/Card/CardBody.js";


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
export default function RenderForm(props) {
  return (<GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={useStyles.cardTitleWhite}>Cadastrar Lojista - Teste grátis por 30 dias</h4>
          <h5 className={useStyles.cardCategoryWhite}></h5>

          {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
        </CardHeader>
        <CardBody>
          Olá, obrigado por escolher a CouponFeed. Vamos começar nossa parceria com um breve cadastro da sua empresa.
          {props.error ? <div className="divError">{props.error}</div> : ``}
          <form
            className={useStyles.form}
            noValidate
            onSubmit={props.handleSubmit}
          >

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  // variant="outlined"
                  value={props.state.name}
                  onChange={props.handleNameInput}
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
                {/* <CustomInput
                  labelText="Nome"
                  id="first-name"
                  value={props.state.name}
                  onChange={props.handleNameInput}
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
                  onChange={props.handleCNPJInput}
                  value={props.state.tmp_cnpj}
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
                  onChange={props.handlePhoneInput}
                  value={props.state.phone}
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
                  onChange={props.handleEmailInput}
                  value={props.state.email}
                // autoComplete="fname"
                />
                {/* <CustomInput
                  labelText="Endereço de Email"
                  id="email-address"
                  onChange={props.handleEmailInput}
                  value={props.state.email}
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
                  onChange={props.handlePasswInput}
                  value={props.state.passw}
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
                  onChange={props.handleAddressZip}
                  value={props.state.address_zip}
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
                  onChange={props.handleAddressNumber}
                  value={props.state.address_number}
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
                  // onChange={props.handleAddressStreet}
                  value={props.state.address_street}
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
                  onChange={props.handleAddressComp}
                  value={props.state.address_comp}
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
                  // onChange={props.handleAddressNeighb}
                  value={props.state.address_neighb}
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
                  // onChange={props.handleAddressNeighb}
                  value={props.state.address_city}
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
                  // onChange={props.handleAddressNeighb}
                  value={props.state.address_state}
                  autoComplete="fname"
                />
              </GridItem>
            </GridContainer>

            <GridContainer style={{ paddingTop: "30px" }}>

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
  </GridContainer>)
}