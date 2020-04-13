import React, { Component } from "react";
import formatISO from 'date-fns/formatISO'
import { parse } from 'date-fns'
import LinearProgress from '@material-ui/core/LinearProgress';

// core components
import { FaTicketAlt } from "react-icons/fa";

import { FaList } from "react-icons/fa";
// import { TextField, } from "@material-ui/core";
import CustomTabs from "../../../components/CustomTabs/CustomTabs.js";

import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
// import CustomInput from "../components/CustomInput/CustomInput.js";
import ListCoupon from './ListCoupon.js';
import NewCoupon from './NewCoupon.js';

import api from "../../../services/api"
import { getId, getName } from "../../../services/auth";
// import avatar from "assets/img/faces/marc.jpg";


export default class ManageCoupon extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      descricao: '',
      discount: '',
      expDate: '',
      feedcoins: 0,
      loyalty: false,
      isLoading: true,
      error: null,
      sid: null,
      couponList: []
    }
  }
  async componentDidMount() {
    this._isMounted = true;
    await api
      .post(`/coupons-l/${getId()}`)
      .then(response => {
        // console.log(response)
        this.setState({ couponList: response.data, isLoading: false  })
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

    // console.log(this.state.couponList);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSubmit = async event => {
    event.preventDefault();
    const date = parse(this.state.expDate, 'dd/L/y', new Date());
    const result = formatISO(new Date(date));
    // console.log(result);
    // console.log("entrou no handleSubmit");
    await api.post('/coupons-s', {
      name: this.state.name,
      descricao: this.state.descricao,
      discount: this.state.discount,
      feedcoins: this.state.feedcoins,
      loyalty: this.state.loyalty,
      expDate: result,
      retail_id: getId()
    })
      .then(response => {
        console.log(response);
        this.setState({ done: true, sid: response.data.id })

      })
      .catch(error => {
        // console.log(error); 
        this.setState({ error: error });
      });
  }

  handleFeedcoins = event => {
    this.setState({
      feedcoins: parseInt(event.target.value)
    })
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


  handleLoyalty = event => {
    this.setState({
      loyalty: event.target.value
    });
  }
  handleDescription = event => {
    this.setState({
      descricao: event.target.value
    });
  }

  isValidDate = date => {

    return date === 'dd/mm/yyyy' ||
      (/^\d{2}\/\d{2}\/\d{4}$/.test(date) && new Date(date).getTime());
  }

  handleExpDate = event => {
    const date = event.target.value;
    // if (this.isValidDate(date))
    this.setState({
      expDate: date
    });
  }

  // async componentDidMount() {
  //   this.setState({ retail_name: getName() })
  //   await api.post(`/coupons-l/${getId}`)
  //     .then(response => {
  //       console.log(response);
  //       this.setState({
  //         couponList: response.data,
  //       })
  //     })
  //     .catch(error => {
  //       // console.log(error);
  //       this.setState({ error: error });
  //     });
  //     this.setState({ done: true });


  // }

  render() {
    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (<>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              // title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Novo Cupom",
                  tabIcon: <FaTicketAlt/>,
                  tabContent: (
                    <NewCoupon
                      state={this.state}
                      handleSubmit={this.handleSubmit}
                      handleNome={this.handleNome}
                      handleFeedcoins={this.handleFeedcoins}
                      handleLoyalty={this.handleLoyalty}
                      handleDescricao={this.handleDescription}
                      handleTypeDiscount={this.handleTypeDiscount}
                      handleExpDate={this.handleExpDate}
                    />
                  )
                },
                {
                  tabName: "Listar Cupons",
                  tabIcon: <FaList/>,
                  tabContent: (
                    <ListCoupon
                      list={this.state.couponList}
                      name={getName()}
                    />
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </>);

    }
  }
}
