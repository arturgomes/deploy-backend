import React, { Component } from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Avatar from "@material-ui/core/Avatar";
//import Button from "../components/CustomButtons/Button.js";

// import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/img/completa_fundo_claro@4x.png";
import Grid from '@material-ui/core/Grid';
import { FaSpinner } from 'react-icons/fa';

import Question from '../views/Feedback/question';
import Conclusion from '../views/Feedback/conclusion';

import api from "../services/api";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 300,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://couponfeed.co">
        CouponFeed
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default class SignIn extends Component {
  state = {
    opening: null,
    questions: [],
    nps: null,
    comment: null,
    finished: false,
    phone: null,
    error: null
  }


  handleNPS = async (answer) => {
    const { nps } = this.state;

    if (nps === null) {
      this.setState({
        nps: answer,
      }, () => { });
    }

  }

  handleComment = async (answer) => {
    const comm = answer;
    this.setState({
      finished: true,
      comment: comm

    }, () => { })

    const qs = decodeURIComponent(this.props.match.params.id);
    // console.log(qs);
    await api.post(`/feed/${qs}/c`, {
      answers: {
        nps: this.state.nps,
        com: answer
      }
    }).then(response => this.setState({
      fid: response.data.fid
    }, () => { })).catch(error => {
      console.log(error.message);
    })
    // const fid = response.data.fid;
    // console.log(fid);
    // return response;

  }
  
  async componentDidMount() {
    const qs = decodeURIComponent(this.props.match.params.id);
    const response = await api.post(`/feed/${qs}/f`);
    if (!response.error) {
      const quest = response.data.questions;
      const ope = response.data.opening;
      // console.log(response)
      this.setState({
        questions: quest,
        opening: ope
      }, () => { });
      // console.log("componentDidMount: ", this.state.questions);

    }
    else {
      this.setState({ error: "Loja não encontrada" })
    }
  }
  display() {
    if (!this.state.opening && !this.state.error) {
      return <FaSpinner color="#888" size={14} />

    }
    if (this.state.error) {
      return (<p>{this.state.error}</p>)
    }
    const { opening, finished, nps, questions } = this.state;
    let value = null;
    if (nps !== null) {
      if (nps >= 8) {
        value = questions[1].options[0].op
      }
      else if (nps < 8 && nps >= 6) {

        value = questions[1].options[1].op
      }
      else if (nps < 6) {

        value = questions[1].options[2].op
      }
    }
    // console.log(questions[0]);
    if (nps === null) {
      return (<Question
        key={0}
        opening={opening}
        quest={questions[0]}
        title={questions[0].question}
        onChange={this.handleNPS} />
      )
    } else if (!finished) {
      return (<Question
        key={1}
        opening={opening}
        quest={questions[1]}
        title={value}
        onChange={this.handleComment} />
      )
    }
    else {

      const { fid } = this.state;
      return <Conclusion fid={fid} />
    };
  }
  render() {
    //


    //

    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* <Paper className={classes.paper}> */}
        <Grid container
          spacing={0}
          align="center"
          justify="center"
          direction="column"
        // style={{ backgroundColor: 'teal' }}
        >
          <div className={useStyles.content}>
            <img src={logo} style={{ width: '300px', paddingBottom: '70px' }} alt="" />
          </div>
          {this.display()}
          <Box mt={8}>
            <Copyright />
          </Box>
          {/* </Container> */}
        </Grid >
        {/* </Paper> */}

      </div >
    );
  }
}
