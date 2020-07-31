import React from "react";
import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../../assets/img/completa_fundo_claro@4x.png";
import Copyright from "../Copyright";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


export default function BasicLayout(props) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -40%)'
        }}
      >
        <Grid container
          spacing={0}
          align="center"
          justify="center"
          direction="column"
        >
          <div className={useStyles.content}>

            <Link href="/"><img src={logo} alt="" style={{ width: '300px', paddingBottom: '30px' }} /></Link>

            {props.children}
            {/* {this.renderConclusion(error)} */}

          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
          {/* </Container> */}
        </Grid >
        {/* </Paper> */}

      </div >
    </>
  );
}