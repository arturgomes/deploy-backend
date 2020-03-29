import React, { Component, } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinearProgress from '@material-ui/core/LinearProgress';
import QrCode from "qrcode.react";
import api from "../../../services/api";

import {
  isAuthenticated,
  getId,
  getName,
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
    let listShops;
    if (isAuthenticated()) {


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
                <Button onClick={() => this.openInNewTab(`/print-qr/${id}`)}>Imprimir Código</Button>
                </div>
                
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        );
      });

    }
    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (
        <>
          <h6>Listando todos QR codes de {getName()}</h6>
          {listShops}
        </>
      );
    }
  }
}
