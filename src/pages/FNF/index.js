import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { Button, CssBaseline, TextField, Link, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import '../../App.css';
import api from '../../services/api'

import { login, isAuthenticated } from "../../services/auth";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {

    margin: theme.spacing(1),
  },
}));

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  }

  render() {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>

            <Typography component="h1" variant="h1">
              Página não encontrada.
            </Typography>

          </div>
        </Container>



      </>
    );
  }
}


export default withRouter(Login);