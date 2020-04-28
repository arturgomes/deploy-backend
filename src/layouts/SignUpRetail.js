import React, { Component } from "react";
import cep from 'cep-promise';
import { formatToCEP, isCPF, formatToCPF } from 'brazilian-values';

import { makeStyles } from "@material-ui/core/styles";

import BasicLayout from "../components/CouponFeed/BasicLayout";
import RenderConclusion from "../components/CouponFeed/SignUpForm/Retail/RenderConclusion";
import RenderForm from "../components/CouponFeed/SignUpForm/Retail/RenderForm";


import api from "../services/api"


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
      .catch(e => { this.setState({ error: e.error }) });
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
    const { error, done } = this.state;

    if (done && !error) {
     return ( <BasicLayout>
        <RenderConclusion error={error} />
      </BasicLayout>)
    }
    else {
      return (<BasicLayout>
        <RenderForm
          error={error}
          state={this.state}
          submit={this.handleSubmit}
          handleAddressNumber={this.handleAddressNumber}
          handleAddressZip={this.handleAddressZip}
          handleAddressCountry={this.handleAddressCountry}
          handlePhoneInput={this.handlePhoneInput}
          handleCNPJInput={this.handleCNPJInput}
          handleEmailInput={this.handleEmailInput}
          handlePasswInput={this.handlePasswInput}
          handleNameInput={this.handleNameInput}
        />
      </BasicLayout>)
    }
    
  }
}