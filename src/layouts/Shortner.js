import React, { Component } from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {Redirect } from "react-router-dom";

// @material-ui/core components
import CircularProgress from '@material-ui/core/CircularProgress';

import api from "../services/api";

export default class SignIn extends Component {
  state = {
    readyToRedirect: false,
    shop_id:''
  }
  
  async componentDidMount() {
    const short_url = decodeURIComponent(this.props.match.params.short_url);
    const response = await api.post(`/surl/${short_url}`);
    if (!response.error) {
      const shop_id = response.data.id;
      console.log(shop_id);
      this.setState({
        shop_id,
        readyToRedirect:true
      }, () => { });
      // this.openInNewTab(`/feed/${shop_id}`)
    }
    else {
      this.setState({ error: "Loja não encontrada" })
    }
  }
  render() {
    if (!this.state.readyToRedirect){
        return <CircularProgress />
    }
    else{
      return <Redirect
          to={`/feed/${this.state.shop_id}`}
          />;
    }
    
  }
}
