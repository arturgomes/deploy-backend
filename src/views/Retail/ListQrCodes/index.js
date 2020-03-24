import React, { Component, } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinearProgress from '@material-ui/core/LinearProgress';
import QrCode from "qrcode.react";
import api from "../../../services/api";
import cflogo from "../../../assets/img/completa_fundo_claro@4x.png"

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

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

class Demo extends Component {

  render() {
    return (
      <div>
        <QrCode size={300} renderAs='svg' value={this.props.link} />
      </div>
    );
  }
}

class ComponentToPrint extends React.Component {
  render() {
    return (
      
      <div className="main">
        <div >
          <img src={cflogo} alt=""></img>
        </div>
        <div >
                <Demo link={this.props.link} />
        </div>
        <div >
        </div>
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
                <a onClick={() => this.openInNewTab(`/print-qr/${id}`)}>Imprimir Código</a>
                  {/* <ReactToPrint
                    trigger={() => openInNewTab('https://www.google.com')}
                    trigger={() => <a onClick={() => this.openInNewTab('https://www.google.com')}>Imprimir Código</a>}
                    trigger={() => <a href="#" onClick={this.handleMyQR}>Imprimir Código</a>}
                    content={() => this.componentRef}
                  /> */}
                  <div style={{ display: "none" }}>
                    <ComponentToPrint link={link} ref={el => (this.componentRef = el)} />
                    </div>
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
