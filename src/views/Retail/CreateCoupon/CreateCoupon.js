import React, { Link, Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components

import { TextField, } from "@material-ui/core";
import DatePicker from 'react-datepicker';
import { parseISO, isAfter } from 'date-fns';
import { pt } from 'date-fns/locale';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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



export default class CreateCoupon extends Component {
  state = {
    done: false,
    error: null,
    sid: null,
    finished: false
  }
  handleSubmit = async event => {
    event.preventDefault();

    await api.post(`/coupon`, {
      name: this.state.name,
      description: this.state.description,
      discount: this.state.discount,
      retail_id: getId()
    })
      .then(response => {
        this.setState({ done: true, sid: response.data.id })

      })
      .catch(error => {
        // console.log(error); 
        this.setState({ error: error });
      });
  }
  handleNome = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleTypeDiscount = event => {
    this.setState({
      discount: event.target.value
    })
  }

  handleDescription = event => {
    this.setState({
      description: event.target.value
    });
  }

  isValidDate = date => {

    return date == 'dd/mm/yyyy' ||
      (/^\d{2}\/\d{2}\/\d{4}$/.test(date) && new Date(date).getTime());
  }

  handleValidade = date => {
    if (this.isValidDate(date))
      this.setState({
        expireDate: date
      });
  }


  render() {
    const { error } = this.state;

    if (this.state.done) {
      return (<Card>
        <CardHeader color="success">
          <h4 style={{
            color: "rgba(255,255,255,1)",
            margin: "0",
            fontSize: "18px",
            marginTop: "0",
            marginBottom: "10px"
          }}>Cadastrar novo cupom</h4>
          <p style={{
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
          }}>Oba! No cupom cadastrado com sucesso!</p>

          {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
        </CardHeader>
        <CardFooter>
          <Link to="/retail/shop">
            <Button
              fullWidth
              type="submit"
              color="warning">
              Cadastrar novo cupom?</Button>
          </Link>
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
                <CardHeader color="warning">
                  <h4 style={{
                    color: "rgba(255,255,255,1)",
                    margin: "0",
                    fontSize: "18px",
                    marginTop: "0",
                    marginBottom: "10px"
                  }}>Cadastrar novo cupom</h4>
                  <p style={{
                    color: "rgba(255,255,255,.62)",
                    margin: "0",
                    fontSize: "14px",
                    marginTop: "0",
                    marginBottom: "0"
                  }}>Vamos lá, preencha aqui os dados sobre a novo cupom a ser cadastrado.</p>
                </CardHeader>
                <CardBody>
                  {error ? <div className="divError">{error}</div> : ``}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        name="name"
                        value={this.state.name}
                        onChange={this.handleNome}
                        required
                        fullWidth
                        id="name"
                        label="Nome do cupom"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        id="discount"
                        label="Desconto"
                        onChange={this.handleTypeDiscount}
                        value={this.state.discount}
                        name="discount"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        name="description"
                        style={{ marginBottom: 16 }}
                        label="Descrição do Cupom"
                        onChange={this.handleDescription}
                        value={this.state.description}
                        autoComplete="fname"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        name="expireDate"
                        style={{ marginBottom: 16 }}
                        label="Validade"
                        onChange={this.handleValidade}
                        value={this.state.expireDate}
                      />
                    </GridItem>
                  </GridContainer>

                </CardBody>
                <CardFooter>
                  <Button
                    fullWidth
                    type="submit"
                    color="warning">
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
