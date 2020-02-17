import React, { Component, Fragment } from "react";
import { List, Container, Box, Button } from "@material-ui/core";
// import { Feed, Icon, Item } from "semantic-ui-react";
import LinearProgress from '@material-ui/core/LinearProgress';

import { FeedItem } from "./FeedbackItem";
// import '../../App.css';
import contente from "../../../assets/img/contente@4x.png";
import descontente from "../../../assets/img/descontente@4x.png";
import imparcial from "../../../assets/img/imparcial@4x.png";
import api from "../../../services/api";

import {
  isAuthenticated,
  getId,
  getName,
  logout
} from "../../../services/auth";
// import ReactSpeedometer from 'react-d3-speedometer';
// import Dashboard from './dashboard/dashboard'
// import Main from './DemoPages/Main';
// import styles from "../../../assets/jss/material-dashboard-react/layouts/adminStyle.js";

export default class ListFeedback extends Component {

  state = {
    isLoading: true,
    fb: [
      {
        name: null,
        f: []
      }
    ]
  };

  async componentDidMount() {

    await api
      .post("/list", { retail_id: getId() })
      .then(response => {

        this.setState({ fb: response.data, isLoading: false });
        // console.log(response.data);
      })
      .catch(error => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          // console.log(error.response.data);
          this.setState({ err: error.response.data });
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          // console.log(error.request);
        }
      });
  }

  handleMain = e => {
    e.preventDefault();
    this.props.history.push("/");
  };
  getAssets = nps => {
    if (nps >= 9) return contente;
    else if (nps >= 7 && nps < 9) return imparcial;
    else return descontente;
  };

  render() {
    let listItems;
    let listShops;
    if (isAuthenticated()) {
      // console.log(this.state.fb);
      listItems = Object.keys(this.state.fb).map(key => {
        const shop = this.state.fb[key];
        const { f, shop_name } = shop;
        listShops = Object.keys(f).map(g => {
          const { nps_value, date, comment_optional } = f[g];
          let avatar = this.getAssets(nps_value);
          let date1 = new Date(date).toLocaleDateString("pt-BR");
          // date1 = date1.toLocaleDateString()
          return (
            <FeedItem
              key={f}
              store={shop_name}
              nps={nps_value}
              comment={comment_optional}
              avatar={avatar}
              date={date1}
            />
          );
        });
        return listShops;
      });
    }
    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (
        <>
          <h6>Listando todos os feedbacks de {getName()}</h6>
          <List>{listItems}</List>
        </>
      );
    }
  }
}
