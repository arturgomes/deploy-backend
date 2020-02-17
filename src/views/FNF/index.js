import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import descontente from '../../assets/descontente@4x.png'
import '../../App.css';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(8),
    paddingRight: '20px'
  },
  photo: {
    height: '100px',
    width: '100px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {

    margin: theme.spacing(1),
  },
}));

class PNP extends Component {
  state = {
    email: "",
    password: "",
    error: null
  }
  handleMain = e => {
    e.preventDefault();
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={useStyles.paper}>
            <Grid container>
              <Typography component="h1" variant="h4">
                Página não encontrada.
              </Typography>
              <form onSubmit={this.handleMain}>
                <Button type="submit"
                  style={{ marginBottom: 16 }}
                  fullWidth
                  variant="contained"
                  color="primary">Voltar</Button>
              </form>
            </Grid>
          </div>
        </Container>

      </>
    );
  }
}


export default withRouter(PNP);