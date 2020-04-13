import React, { Component, } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Button } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinearProgress from '@material-ui/core/LinearProgress';
import QrCode from "qrcode.react";
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
  getName,
  getUser
} from "../../../services/auth";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  print:{
    alignContent:'center'
  }
}));


class Demo extends Component {

  render() {
    return (
      <div>
        <QrCode size={300} renderAs='svg' value={this.props.link} />
      </div>
    );
  }
}

export default class ListQrCodes extends Component {

  state = {
    qr: [],
    isLoading: true
  };

  async componentDidMount() {
    this._isMounted = true;

    await api
      .post("/qr", { retail_id: getId() })
      .then(response => {
        if (this._isMounted) {
          console.log(response)
          this.setState({ qr: response.data, isLoading: false });
        }
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
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleMyQR = event =>{


  }

  openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }
  
  
  render() {
    if (isAuthenticated() && getUser()==="retail") {
      let listShops;
      listShops = Object.keys(this.state.qr).map(key => {
        const { name, id } = this.state.qr[key];
        const link = `https://couponfeed.co/feed/${id}`;
        return (
          <>
            <ExpansionPanel key={key}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={useStyles.heading}>
                  QR code para a loja {name}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Demo link={link} />
                <div>
                <Button onClick={() => this.openInNewTab(`/print-qr/${id}`)}>Imprimir Código A4</Button>
                <Button onClick={() => this.openInNewTab(`/print-thermal/${id}`)}>Imprimir código para impressora térmica</Button>
                </div>
                
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        );
      });

    
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
                    }}>Listando todos QR codes de {getName()}</p>

                    {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
                  </CardHeader>
                  <CardBody>
              {listShops}

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
}
