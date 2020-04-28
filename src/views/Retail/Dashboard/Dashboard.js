import React, { Component } from "react";



import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MdContentCopy } from "react-icons/md";
import GaugeChart from 'react-gauge-chart'

import ChartistGraph from "react-chartist";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardBody from "../../../components/Card/CardBody.js";
import contente from "../../../assets/img/contente_branco@4x.png";
import descontente from "../../../assets/img/descontente_branco@4x.png";
import imparcial from "../../../assets/img/imparcial_branco@4x.png";

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
      this.setState({isLoading: false });
  }
  handleDataGraph = () => {
    // const data = {
    //   labels: [],
    //   // labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    //   series:[]
    //   // series: [[1861, 292, 2698, 2856, 998, 189, 295, 1412, 616, 544, 1832, 480]]
    // }
    return {}
  }

  handleTotalFeedback = () => {
    return this.state.totalFeedbacks;
  };

  handleNegativeFeedback = () => {
    return this.state.negFeedbacks;

  };

  handleNeutralFeedback = () => {
    return this.state.neutralFeedbacks;

  };

  handlePositiveFeedback = () => {
    return this.state.posFeedbacks;

  };
  handleNPS = () => {
    return this.state.average;
  };
  render() {
    // this.genFeedbackPorDia();
    const {
      average } = this.state;
    const { classes } = this.props;
    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={3} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <MdContentCopy />

                  </CardIcon>
                  <p className={classes.cardCategory}>Total de Feedbacks</p>
                  <h3 className={classes.cardTitle}> {this.handleTotalFeedback()}
                  </h3>
                </CardHeader>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img
                        style={{ height: "50px", margin: "5px" }}
                        src={descontente} alt="" />
                    </Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Feedbacks Negativos</p>
                  <h3 className={classes.cardTitle}>{this.handleNegativeFeedback()}</h3>
                </CardHeader>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img
                        style={{ height: "50px", margin: "5px" }}
                        src={imparcial} alt="" />
                    </Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Feedbacks Neutros</p>
                  <h3 className={classes.cardTitle}>{this.handleNeutralFeedback()}</h3>
                </CardHeader>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img
                        style={{ height: "50px", margin: "5px" }}
                        src={contente} alt="" />
                    </Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Feedbacks Positivos</p>
                  <h3 className={classes.cardTitle}>{this.handlePositiveFeedback()}</h3>
                </CardHeader>

              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={3} md={3}>
              <Card chart>
                <CardHeader color="info">
                  
                </CardHeader>
                <CardBody>
                  <GaugeChart
                    id="gauge-chart5"
                    nrOfLevels={420}
                    arcsLength={[0.69, 0.1, 0.21]}
                    colors={["#EA4228", "#F5CD19", "#5BE12C"]}
                    percent={average / 10}
                    hideText={true}
                    needleBaseColor={"#EA4228"}
                    arcPadding={0.01}
                  />
                  <p className={classes.cardCategory}>Pontos NPS</p>
                  <h3 className={classes.cardTitle}>{this.handleNPS()}</h3>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={3} md={3}>
              <Card chart>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    // data={feedbacksPorDia.data}
                    type="Line"
                    options={feedbacksPorDia.options}
                    listener={feedbacksPorDia.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Feedbacks por dia</h4>

                </CardBody>

              </Card>
            </GridItem>

            <GridItem xs={12} sm={3} md={3}>
              <Card chart>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    // data={feedbacksPorSemana.data}
                    type="Line"
                    options={feedbacksPorSemana.options}
                    listener={feedbacksPorSemana.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Feedbacks por semana</h4>

                </CardBody>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={3} md={3}>
              <Card chart>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    // data={feedbacksPorMes.data}
                    type="Line"
                    options={feedbacksPorMes.options}
                    listener={feedbacksPorMes.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Feedbacks por mês</h4>

                </CardBody>

              </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
          </GridContainer>
          <GridContainer>
            {/* <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem> */}
          </GridContainer>
        </div >
      );
    }
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Dashboard)