import React, { Component } from "react";
import { List } from "@material-ui/core";
// import { Feed, Icon, Item } from "semantic-ui-react";
import LinearProgress from '@material-ui/core/LinearProgress';

import { FeedItem } from "./FeedbackItem";
// import '../../App.css';
import contente from "../../../assets/img/contente@4x.png";
import descontente from "../../../assets/img/descontente@4x.png";
import imparcial from "../../../assets/img/imparcial@4x.png";
import api from "../../../services/api";

import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
// import CustomInput from "../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import CardBody from "../../../components/Card/CardBody.js";
import {
  isAuthenticated,
  getId,
  getName
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
          <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 style={{
                  color: "rgba(255,255,255,1)",
                  margin: "0",
                  fontSize: "18px",
                  marginTop: "0",
                  marginBottom: "10px"
                }}>Listar QR Codes</h4>
                <p style={{
                  color: "rgba(255,255,255,.62)",
                  margin: "0",
                  fontSize: "14px",
                  marginTop: "0",
                  marginBottom: "0"
                }}>Listando todos os feedbacks de {getName()}</p>

                {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
              </CardHeader>
              <CardBody>
          <List>{listItems}</List>

          </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
        </GridItem>
      </GridContainer>
        </>
      );
    }
  }
}
