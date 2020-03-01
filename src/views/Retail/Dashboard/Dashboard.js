import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// import SpeedIcon from "@material-ui/icons/Speed";

// @material-ui/icons
// import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Danger from "components/Typography/Danger.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardBody from "../../../components/Card/CardBody.js";
import contente from "../../../assets/img/contente_branco@4x.png";
import descontente from "../../../assets/img/descontente_branco@4x.png";
import imparcial from "../../../assets/img/imparcial_branco@4x.png";

import api from "../../../services/api";
import {
  isAuthenticated,
  getId,
} from "../../../services/auth";
// import { bugs, website, server } from "variables/general.js";

import {
  feedbacksPorDia,
  feedbacksPorMes,
  feedbacksPorSemana
} from "../../../variables/charts.js";

import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = theme => (styles);


class Dashboard extends Component {
  state = {
    isLoading: false,
    // isLoading: true,
    negFeedbacks: 0,
    posFeedbacks: 0,
    neutralFeedbacks: 0,
    totalFeedbacks: 0,
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
        // console.log(response.data);

        this.setState({
          fb: response.data,
        })
        let listItems, listShops;
        // console.log(this.state.fb);

        if (isAuthenticated()) {
          // console.log(this.state.fb);
          listItems = Object.keys(this.state.fb).map(key => {
            const shop = this.state.fb[key];
            const { f } = shop;
            listShops = Object.keys(f).map(g => {
              const { nps_value, date } = f[g];
              let date1 = new Date(date).toLocaleDateString("pt-BR");
              // date1 = date1.toLocaleDateString()
              return { nps_value, date1 };
            });
            return listShops;
          });

          const items = listItems.flat(1)
          let nf = items.filter(f => f.nps_value < 7);
          let ne = items.filter(f => f.nps_value >= 7 && f.nps_value < 9);
          let po = items.filter(f => f.nps_value >= 9);
          // console.log(nf, ne, po);
          // console.log(items.filter(negativeF).lenght);

          // console.log(nf.filter(negativeF).lenght,
          //   ne.filter(neutralF).lenght,
          //   po.filter(posF)).lenght,
          //   tot.lenght);
          this.setState({
            negFeedbacks: nf.lenght === 0 ? 0 : nf.lenght,
            posFeedbacks: po.length === 0 ? 0 : po.length,
            neutralFeedbacks: ne.length,
            totalFeedbacks: items.length,
            isLoading: false
          });
          // console.log(this.state);

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
    return this.state.totalFeedbacks / 10;
  };
  render() {
    const { negFeedbacks,
      posFeedbacks,
      neutralFeedbacks,
      totalFeedbacks } = this.state;
    const { classes } = this.props;
    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Total de Feedbacks</p>
                  <h3 className={classes.cardTitle}>
                    {this.handleTotalFeedback()}
                  </h3>
                </CardHeader>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img
                        style={{ height: "50px", marginTop: "-40px" }}
                        src={descontente} alt="" />
                    </Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Feedbacks Negativos</p>
                  <h3 className={classes.cardTitle}>{this.handleNegativeFeedback()}</h3>
                </CardHeader>

              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon classes={{ root: classes.iconRoot }}>
                      <img
                        style={{ height: "50px", marginTop: "-40px" }}
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
                        style={{ height: "50px", marginTop: "-40px" }}
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
            {/* <GridItem xs={12} sm={3} md={3}>
              <Card chart>
                <CardHeader color="info">
                  <GaugeChart
                    id="gauge-chart5"
                    nrOfLevels={420}
                    arcsLength={[0.69, 0.1, 0.21]}
                    colors={["#EA4228", "#F5CD19", "#5BE12C"]}
                    percent={this.handleNPS}
                    hideText={true}
                    needleBaseColor={"#EA4228"}
                    arcPadding={0.01}
                  />
                </CardHeader>
                <CardBody>
                  <p className={classes.cardCategory}>Pontos NPS</p>
                  <h3 className={classes.cardTitle}>{this.handleNPS * 10}</h3>
                </CardBody>
              </Card>
            </GridItem> */}

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