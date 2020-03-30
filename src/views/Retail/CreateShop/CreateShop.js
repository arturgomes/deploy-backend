import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import { TextField, } from "@material-ui/core";

import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
// import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import CardBody from "../../../components/Card/CardBody.js";
import api from "../../../services/api"
import { logout, getId } from "../../../services/auth";
// import avatar from "assets/img/faces/marc.jpg";

const useStyles = makeStyles(theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "28px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
}));



export default class CreateShop extends Component {

  state = {
    name: '',
    manager: '',
    phone: '',
    done: 'false',
    error: null,
  }
  
  handleSubmit = async event => {
    event.preventDefault();
    console.log({
      name: this.state.name,
      manager: this.state.manager,
      phone: this.state.phone,
      retail_id: getId(),
      short_url:this.getrandom()
    })
    await api.post(`/shops`, {
      name: this.state.name,
      manager: this.state.manager,
      phone: this.state.phone,
      retail_id: getId(),
      short_url:this.getrandom()
    })
      .then(response => {
        if(response.status === 200){
          this.setState({ done: 'true' })
        }
      })
      .catch(error => { console.log(error); this.setState({ error: error }); });
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
  ß
  handleLogout = e => {
    e.preventDefault();
    // console.log('apeertou')
    logout();
    this.props.history.push("/");
  };
  getrandom = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  render() {
    // const { error } = this.state;

    if (this.state.done === 'true') {
      return (<Card>
        <CardHeader color="success">
          <h4 style={{
            color: "rgba(255,255,255,1)",
            margin: "0",
            fontSize: "18px",
            marginTop: "0",
            marginBottom: "10px"
          }}>Cadastrar nova loja</h4>
         

          {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
        </CardHeader>
        <CardFooter>
        <p style={{
            color: "#000",
            margin: "0",
            fontSize: "18px",
            marginTop: "0",
            marginBottom: "0"
          }}>Oba! Nova loja cadastrada com sucesso!</p>
          
          {/* <Link to="/retail/shop">
            <Button
              fullWidth
              type="submit"
              color="success">
              Cadastrar nova loja?</Button>
          </Link> */}
        </CardFooter>
      </Card>)
    }
    else {
      return (

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form
              className={useStyles.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Card>
                <CardHeader color="success">
                  <h4 style={{
                    color: "rgba(255,255,255,1)",
                    margin: "0",
                    fontSize: "18px",
                    marginTop: "0",
                    marginBottom: "10px"
                  }}>Cadastrar nova loja</h4>
                  <p style={{
                    color: "rgba(255,255,255,.62)",
                    margin: "0",
                    fontSize: "14px",
                    marginTop: "0",
                    marginBottom: "0"
                  }}>Vamos lá, preencha aqui os dados sobre a nova loja a ser cadastrada.</p>

                  {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
                </CardHeader>
                <CardBody>
                  {/* {error ? <div className="divError">{error}</div> : ``} */}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        autoComplete="fname"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleNameInput}
                        required
                        fullWidth
                        id="name"
                        label="Nome da Loja"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
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
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        name="manager"
                        style={{ marginBottom: 16 }}
                        label="Gerente"
                        onChange={this.handleManagerInput}
                        value={this.state.manager}
                        autoComplete="fname"
                      />
                    </GridItem>
                  </GridContainer>

                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    type="submit"
                    color="success">
                    Cadastrar!</Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      );
    }
  }
}