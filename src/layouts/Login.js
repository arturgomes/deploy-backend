import React, { Component } from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Divider } from 'semantic-ui-react'
// import { FaSpinner } from 'react-icons/fa';


import Button from "../components/CustomButtons/Button.js";

// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import BasicLayout from "../components/CouponFeed/BasicLayout";
import LoginFacebook from '../components/Facebook'
import api from "../services/api";

import { login, getUser, isAuthenticated } from "../services/auth";

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

export default class Login extends Component {

  state = {
    user: {},
    error: null,
    authenticated: false
  };

  async componentDidMount() {

      const url = "https://api.couponfeed.co/auth/success/";
      await api.get("/auth/success")
      // fetch(url, {
      //   method: "GET",
      //   credentials: 'include',
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": true
      //   }
      // })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
          if (!isAuthenticated()) {
          // console.log(responseJson)
          this.setState({
            authenticated: true,
            user: responseJson.user
          })
          .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
          // console.log(responseJson.token);
          const { name, id, tu } = responseJson.login;
          login(responseJson.token, name, id, tu);
          // this.props.history.push("/customer");
          getUser() === 'customer' ? this.props.history.push("/customer") : this.props.history.push("/retail");
        }
        })
        .catch(error => {
          this.setState({
            // authenticated: false,
            error: "Failed to authenticate user"
          });
        });
  }

  handleSignIn = async e => {
    e.preventDefault();
    // const fid = decodeURIComponent(this.props.match.params.fid);

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
      console.log(this.state.error);
    } else {
      await api
        .post("/sessions", { email, password })
        .then(response => {
          // console.log(response.data);
          if (response.data.login !== null) {
            const { name, id, tu } = response.data.login;
            login(response.data.token, name, id, tu);
            getUser() === 'customer' ? this.props.history.push("/customer") : this.props.history.push("/retail");
          } else {
            this.setState({ err: "Usuario ou senha inválidos" });
          }

        })
        .catch(error => {
          // Error 😨
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            this.setState({ err: error.response.data });
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
          }
        });

    }
  };

  responseFacebook = (response) => {
    console.log(response);
  }

  responseGoogle = (response) => {
    console.log(response);
  }
  componentFacebookClicked =  () => {
    // await api.post(`/a/facebook`)
    window.open("https://api.couponfeed.co/auth/facebook", "_self");
    // window.open("http://localhost:3000/auth/facebook", "_self");
    // console.log("clicked")
  }
  componentGoogleClicked =  () => {
    // await api.post(`/a/facebook`)
    window.open("https://api.couponfeed.co/auth/google", "_self");
    // window.open("http://localhost:3000/auth/google", "_self");
    // console.log("clicked")
  }

  render() {
    // const { authenticated } = this.state;

    return (

      <BasicLayout>
        <Avatar className={useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fazer Login
          </Typography>
        <LoginFacebook />

        <Divider horizontal style={{ color: "#444", marginTop: '20px', marginBottom: '20px' }}><hr style={{ border: '1px solid red' }} />ou</Divider>

        <form
          className={useStyles.form}
          noValidate
          onSubmit={this.handleSignIn}
        >
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => this.setState({ email: e.target.value })}
          />
          <TextField
            // variant="outlined"
            style={{ marginBottom: '30px' }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
          // className={useStyles.submit}
          >
            Faça login
            </Button>
          <Grid container>
            {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid> */}
            <Grid item>
              <Link
                href="/signup" variant="body2">
                {"Ainda não se cadastrou? Faça já o seu!"}
              </Link>
            </Grid>
          </Grid>
        </form>

      </BasicLayout>
    );
  }
}
