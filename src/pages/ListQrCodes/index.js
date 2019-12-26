import React, { Component, Fragment } from 'react';
import { CardMedia, Container, Box, Button } from "@material-ui/core";

import QrCode from 'react.qrcode.generator'
import { FeedItem } from './FeedbackItem'
import '../../App.css';
import api from '../../services/api'
import { isAuthenticated, getId, getName, logout } from "../../services/auth";
// import ReactSpeedometer from 'react-d3-speedometer';
import contente from '../../assets/contente@4x.png'
import imparcial from '../../assets/imparcial1@4x.png'
import descontente from '../../assets/descontente@4x.png'
// import Dashboard from './dashboard/dashboard'
// import Main from './DemoPages/Main';







class Demo extends Component {
  render() {
    return <div>
      <QrCode size={500} value={this.props.link} />
    </div>
  }
}
export default class ListFeedback extends Component {
  state = {
    qr: [],
  }

  async componentDidMount() {
    console.log("entrou");
    await api.post("/qr", { retail_id: getId() })
      .then(response => {
        this.setState({ qr: response.data })
        console.log(response.data);
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          this.setState({ err: error.response.data })
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        }

      })
  }

  handleLogout = e => {
    e.preventDefault();
    logout();
    this.props.history.push("/");
  };
  handleMain = e => {
    e.preventDefault();
    this.props.history.push("/");
  };


  render() {
    let listShops;
    if (isAuthenticated()) {
      console.log(this.state.qr)

      listShops = Object.keys(this.state.qr).map(key => {
        const { name, id } = this.state.qr[key]
        const link = `http://192.168.0.4:3000/feed/${id}`
        return (<><h5>QR code para a loja {name}</h5><Demo link={link} /></>)
      })
      // return listShops
    }


    return (<Fragment>
      {/* <div>
        <ReactSpeedometer
          needleHeightRatio={0.7}
          maxSegmentLabels={5}
          segments={3}
          customSegmentStops={[
            0,
            700,
            900,
            1000
          ]}
          segmentColors={[
            '#e83d23',
            'gold',
            '#9aca3b'
          ]}
          value={750}
        />
      </div> */}
      {/* <Main /> */}
      {/* <Dashboard /> */}
      <h6>Listando todos QR codes de {getName()}</h6>
      <Container style={{ fontSize: '14px' }}>
        {listShops}
      </Container>
      <Box style={{ display: 'flex' }} mr="10px">
        <form onSubmit={this.handleMain}>
          <Button type="submit"
            style={{ marginBottom: 16 }}
            fullWidth
            variant="contained"
            color="primary">Voltar</Button>
        </form>
        <form onSubmit={this.handleLogout}>
          <Button type="submit"
            style={{ marginBottom: 16 }}
            fullWidth
            // variant="contained"
            color="primary">Sair</Button>
        </form>
      </Box>
    </Fragment >)
  }
}

