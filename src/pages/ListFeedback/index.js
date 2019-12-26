import React, { Component, Fragment } from 'react';
import { CardMedia, Container, Box, Button } from "@material-ui/core";

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

export default class ListFeedback extends Component {
  state = {
    fb: [{
      name: null,
      f: []
    }],
  }

  async componentDidMount() {
    console.log("entrou");
    await api.post("/list", { retail_id: getId() })
      .then(response => {
        this.setState({ fb: response.data })
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
  getAssets = nps => {
    if (nps >= 9)
      return contente
    else if (nps >= 7 && nps < 9)
      return imparcial
    else
      return descontente
  }

  render() {
    let listItems;
    let listShops;
    if (isAuthenticated()) {
      console.log(this.state.fb)

      listItems = Object.keys(this.state.fb).map(key => {
        const shop = this.state.fb[key]
        const { f, shop_name } = shop
        listShops = Object.keys(f).map(g => {
          const { nps_value, date, comment_optional } = f[g];
          const avatar = this.getAssets(nps_value);
          let date1 = new Date(date).toLocaleDateString('pt-BR');
          // date1 = date1.toLocaleDateString()
          return (<FeedItem store={shop_name} nps={nps_value} comment={comment_optional} avatar={avatar} date={date1} />)
        })
        return listShops

      })
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
      <h6>Listando todos os feedbacks de {getName()}</h6>
      <Container style={{ fontSize: '14px' }}>
        {listItems}
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
    </Fragment>)
  }
}

