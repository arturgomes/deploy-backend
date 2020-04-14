import React, { Component } from "react";

// import { Avatar, ListItem } from 'react-elements';
import Flag from "react-world-flags";
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MdContentCopy } from "react-icons/md";
import GaugeChart from 'react-gauge-chart'

import ChartistGraph from "react-chartist";
import Icon from "@material-ui/core/Icon";
// core components
import Table from "../../../components/Table/Table.js";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardBody from "../../../components/Card/CardBody.js";
import contente from "../../../assets/img/contente_branco@4x.png";
import descontente from "../../../assets/img/descontente_branco@4x.png";
import imparcial from "../../../assets/img/imparcial_branco@4x.png";
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "../../../assets/jss/material-dashboard-react.js"

import api from "../../../services/api";
import {
  getId,
} from "../../../services/auth";

import {
  feedbacksPorDia,
  feedbacksPorMes,
  feedbacksPorSemana
} from "../../../variables/charts.js";

import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = theme => (styles);
const classes = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  headSt: {
    color: successColor[0],

    margin: "15 15px"
  },
  successText: {
    color: successColor[0],
  }
}));

class Dashboard extends Component {
  state = {
    isLoading: true,
    // isLoading: true,
    negFeedbacks: 0,
    posFeedbacks: 0,
    neutralFeedbacks: 0,
    totalFeedbacks: 0,
    average: 0,
    dados: []
  };
  async componentDidMount() {
    // this.setState({isLoading:false})
    // console.log("tá carregando")
    await api
      .post("/dashboardData", { retail_id: getId() })
      .then(response => {
        // console.log(response.data);
        const {
          posFeedbacks,
          negFeedbacks,
          neutralFeedbacks,
          totalFeedbacks,
          average,
          dados
        } = response.data;
        // console.log(dados)
        this.setState({
          posFeedbacks,
          negFeedbacks,
          neutralFeedbacks,
          totalFeedbacks,
          average,
          dados,
        })
        console.log(this.state)

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
    this.setState({ isLoading: false });
  }

  handleTotalFeedback = () => {
    return this.state.totalFeedbacks;
  };

  getInitials = (string) => {
    var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  render() {
    // this.genFeedbackPorDia();
    const name = "Artur Oliveira Gomes"
    const cpf = "065.161.024-90"
    const { average } = this.state;
    const { classes } = this.props;
    // if (this.state.isLoading) {
    //   return <LinearProgress />
    // }
    // else {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={3} md={3}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon classes={{ root: classes.iconRoot }}>
                    <Avatar alt={name} className={classes.orange}>
                      {this.getInitials(name)}
                    </Avatar>
                  </Icon>
                </CardIcon>
                <p style={{ margin: "15px 5px", fontSize: "20px" }}>
                  {/* <p><Flag code="br" height="16" /></p> */}
                  {name}
                </p>
                <p style={{ margin: "15px 5px", fontSize: "15px", color:"#aaa" }}>
                  {/* <p><Flag code="br" height="16" /></p> */}
                  {cpf}
                </p>
              </CardHeader>
              <CardBody>
                <p className={useStyles.cardCategory}>Total de Feedcoins: <span className={classes.successText}>30</span></p>
                <p className={useStyles.cardCategory}>Ultimo Feedback: <span className={classes.successText}>12/04/2020</span></p>
                <p className={useStyles.cardCategory}>Membro desde <span className={classes.successText}>02/02/2020</span></p>
                {/* <Avatar alt={name} className={classes.orange}>
                  {this.getInitials(name)}
                </Avatar> */}

              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={3} md={9}>
            <Card >
              <CardHeader color="success" stats>
                <h4 style={{
                  color: "rgba(255,255,255,1)",
                  margin: "0",
                  fontSize: "18px",
                  marginTop: "0",
                  marginBottom: "10px"
                }}>Minhas Fidelidades</h4>
                {/* <p style={{
                  color: "rgba(255,255,255,.62)",
                  margin: "0",
                  fontSize: "14px",
                  marginTop: "0",
                  marginBottom: "0"
                }}>Vamos lá, preencha aqui os dados sobre a nova loja a ser cadastrada.</p> */}
              </CardHeader>
              <CardHeader color="info" stats icon>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Nome", "Gerente", "Telefone", " "]}
                  tableData={
                    [
                      ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                      ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                      ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                      ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                      ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                      ["Mason Porter", "Chile", "Gloucester", "$78,615"]

                    ]

                    // props.list.map(item => [`${item.name}`, `${item.manager}`, `${item.phone}`, 
                    //       <><Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><IoMdPrint/></Button>
                    //         {/* <Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><FaEdit/></Button> */}
                    //         {/* <Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><MdDeleteForever/></Button> */}
                    //       </>])
                  }
                />
              </CardBody>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae lectus nec ipsum maximus vulputate at in ante. Sed varius arcu quis faucibus iaculis. Aenean quis cursus mi. Sed et purus leo. Vestibulum blandit orci et massa hendrerit, ac elementum risus auctor. Fusce turpis augue, varius tempus pretium sed, tempor at massa. Fusce lobortis aliquet odio, porta venenatis sem molestie vel. Integer lobortis turpis vel malesuada varius. Aliquam rutrum ligula magna, in suscipit velit eleifend sit amet. Fusce semper dictum pretium. Fusce accumsan lectus sit amet dignissim eleifend. Morbi eget nulla ut est consequat interdum. */}
            </Card>
          </GridItem>


          {/* <Card >Oi</Card> */}
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3} md={6}>
            <Card plain>Oi</Card>
          </GridItem>
          <GridItem xs={12} sm={3} md={6}>
            <Card plain>Oi</Card>
          </GridItem>

        </GridContainer>
        <GridContainer>

        </GridContainer>
      </div >
    );
    // }
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Dashboard)