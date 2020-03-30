import React, { Component } from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "../components/CustomButtons/Button.js";

// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import logo from "../assets/img/completa_fundo_claro@4x.png";
import Grid from '@material-ui/core/Grid';

import api from "../services/api";

import { login, getTu, isAuthenticated } from "../services/auth";

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
  // styles
  // const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  // const mainPanel = React.createRef();
  // states and functions
  // const [image] = React.useState(bgImage);
  // const [color] = React.useState("blue");
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // state = {
  //   email: "",
  //   password: "",
  //   error: null
  // };
  handleSignIn = async e => {
    e.preventDefault();

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

            getTu() === '897316929176464ebc9ad085f31e7284' ? this.props.history.push("/customer") : this.props.history.push("/retail");
          } else {
            this.setState({ err: "Usuario ou senha inválidos" });
          }
          //parei aqui, tenho que fazer if para o tipo de autenticaçao
          //se eh usuario final ou se é retail, pra mudar os dashboards.
          // ver linha 79 

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

  // handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  // getRoute = () => {
  //   return window.location.pathname !== "/retail/maps";
  // };
  // resizeFunction = () => {
  //   if (window.innerWidth >= 960) {
  //     setMobileOpen(false);
  //   }
  // };
  // // initialize and destroy the PerfectScrollbar plugin
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  //   window.addEventListener("resize", resizeFunction);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener("resize", resizeFunction);
  //   };
  // }, [mainPanel]);
  render() {
    if (isAuthenticated()) {
      (getTu() !== "897316929176464ebc9ad085f31e7284") ?
        this.props.history.push("/retail")
        : this.props.history.push("/customer")
    }

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
            <Avatar className={useStyles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Fazer Login
          </Typography>
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
          </div>
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
