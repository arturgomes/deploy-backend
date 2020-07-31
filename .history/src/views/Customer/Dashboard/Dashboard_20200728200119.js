import React, { Component } from "react";

// import { Avatar, ListItem } from 'react-elements';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import {
  withStyles,
  // makeStyles 
} from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IoMdPrint } from "react-icons/io";
import { format, parseISO } from "date-fns";
import pt from 'date-fns/locale/pt';


import Icon from "@material-ui/core/Icon";
// core components
import Table from "../../../components/Table/Table.js";
import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardBody from "../../../components/Card/CardBody.js";
import Button from "../../../components/CustomButtons/Button.js";

// import {
//   successColor,
// } from "../../../assets/jss/material-dashboard-react.js"

import api from "../../../services/api";
import {
  getId, getUser
} from "../../../services/auth";


import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = theme => (styles);


function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
class Dashboard extends Component {
  state = {
    isLoading: true,
    name: '',
    thumbnail: '',
    member_since: '',
    loyalties: [],
    last_feedback: '',
    total_feedbacks: 0,
    fb: [],
  };
  async componentDidMount() {

    // this.setState({isLoading:false})
    // console.log("tá carregando")
    // console.log(getUser())
    await api
      .post("/dashboardDataC", { user_id: getId() })
      .then(response => {
        
        const { fb,
          last_feedback,
          loyalties,
          total_feedbacks,
          user } = response.data;
          
        // console.log(dados)
        const newfb = this.makeLoyaltyList(fb, loyalties);
        console.log({ fb,
          last_feedback,
          loyalties,
          total_feedbacks,
          user });
        const { createdAt, feedbacks, name, thumbnail } = user;
        // console.log(this.state)

        // this.setState({
        //   isLoading: false,
        //   name: name,
        //   member_since: createdAt,
        //   thumbnail,
        //   loyalties,
        //   last_feedback: last_feedback.createdAt,
        //   total_feedbacks,
        //   fb: newfb
        // })
        this.setState({
          name,
          thumbnail,
          member_since: createdAt,
          loyalties,
          last_feedback: last_feedback.createdAt,
          total_feedbacks,
          fb:newfb,
        })
        console.log(this.state)

      })
      .catch(error => {
        // Error 😨
        if (error.response) {
          console.log(error)
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
    // this.setState({ isLoading: false });
  }
  findFeedcoins = (retail_id, loyalties) => {
    // console.log(retail_id,loyalties);

    const result = loyalties.filter(l => (l.retail_id === retail_id))
    // console.log(result);
    return result
  }
  makeLoyaltyList = (fb, loyalties) => {
    return fb.map(f => {
      const { retail_id, feedbacks_count } = f
      const retail_name = f.Retail.retail_name;
      const fc = this.findFeedcoins(retail_id, loyalties);
      // console.log({ retail_id, feedbacks_count, fc, retail_name })
      return { retail_id, feedbacks_count, fc, retail_name }
    })
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
    const {
      name,
      thumbnail,
      member_since,
      last_feedback,
      total_feedbacks,
      fb,
      // cpf,
      loyalties
    } = this.state;
    const { classes } = this.props;
    if (this.state.isLoading) {
      return <LinearProgress />
    }
    // else {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={3} md={3}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Icon classes={{ root: classes.iconRoot }}>
                    <Avatar alt={name} className={classes.orange} src={thumbnail}>
                      {this.getInitials(name)}
                    </Avatar>
                  </Icon>
                </CardIcon>
                <p style={{ margin: "15px 5px", fontSize: "20px" }}>
                  {/* <p><Flag code="br" height="16" /></p> */}
                  {name}
                </p>
                {/* <p style={{ margin: "15px 5px", fontSize: "15px", color: "#aaa" }}> */}
                {/* <p><Flag code="br" height="16" /></p> */}
                {/* {cpf} */}
                {/* </p> */}
              </CardHeader>
              <CardBody>
                <p className={useStyles.cardCategory}>Total de Feedcoins: <span className={classes.successText}>{total_feedbacks}</span></p>

                <p className={useStyles.cardCategory}>Ultimo Feedback: <span className={classes.successText}>{last_feedback && format(parseISO(last_feedback), "dd ' de ' MMMM  ' de '  y", { locale: pt })}</span></p>
                {/* <p className={useStyles.cardCategory}>Ultimo Feedback: <span className={classes.successText}>{format(parseISO(last_feedback), "dd ' de ' MMMM  ' de '  y", { locale: pt })}</span></p> */}
                {/* <p className={useStyles.cardCategory}>Ultimo Feedback: <span className={classes.successText}>{last_feedback}</span></p> */}
                <p className={useStyles.cardCategory}>Membro desde <span className={classes.successText}>{member_since && format(parseISO(member_since), "dd ' de ' MMMM  ' de '  y", { locale: pt })}</span></p>
                {/* <p className={useStyles.cardCategory}>Membro desde <span className={classes.successText}>{member_since}</span></p> */}
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
              {/* <CardHeader color="info" stats icon>
              </CardHeader> */}
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Loja", "Seus pontos", "Meta", ""]}
                  tableData={
                    fb.map(item => item.fc[0] ? [`${item.retail_name}`, `${item.feedbacks_count}`, `${item.fc[0].feedcoins}`,
                    item.feedbacks_count >= item.fc[0].feedcoins ? <><Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><IoMdPrint /></Button>
                      {/* <Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><FaEdit/></Button> */}
                      {/* <Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><MdDeleteForever/></Button> */}
                    </> : <></>] : [])
                  }
                />
              </CardBody>
            </Card>
          </GridItem>


          {/* <Card >Oi</Card> */}
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={3} md={12}>
            <Card >
              <CardHeader color="success" stats>
                <h4 style={{
                  color: "rgba(255,255,255,1)",
                  margin: "0",
                  fontSize: "18px",
                  marginTop: "0",
                  marginBottom: "10px"
                }}>Promoções das lojas que já dei feedback</h4>
                {/* <p style={{
                  color: "rgba(255,255,255,.62)",
                  margin: "0",
                  fontSize: "14px",
                  marginTop: "0",
                  marginBottom: "0"
                }}>Vamos lá, preencha aqui os dados sobre a nova loja a ser cadastrada.</p> */}
              </CardHeader>
              <CardBody>
                {loyalties === null ? <p>Você ainda não deu nenhum feedback</p> : (<Table
                  tableHeaderColor="primary"
                  tableHead={["Loja", "Promoção", "Descrição", "Premio", "Pontos Necessários"]}
                  tableData={
                    loyalties.map(item => [`${item.Retail.retail_name}`, `${item.name}`, `${item.description}`, `${item.discount}`, `${item.feedcoins}`])
                  }
                />)}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={3} md={6}>
            {/* <Card plain>Oi</Card> */}
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