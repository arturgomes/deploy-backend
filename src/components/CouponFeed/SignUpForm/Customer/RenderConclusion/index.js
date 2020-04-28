import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import GridItem from "../../../../../components/Grid/GridItem.js";
import GridContainer from "../../../../../components/Grid/GridContainer.js";
import Button from "../../../../../components/CustomButtons/Button.js";
import Card from "../../../../../components/Card/Card.js";
import CardBody from "../../../../../components/Card/CardBody.js";
import CardHeader from "../../../../../components/Card/CardHeader.js";



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

export default function RenderConclusion(props) {
  return (<GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="success">
          <h4 className={useStyles.cardTitleWhite}>Cadastro realizado com sucesso!</h4>
          <p className={useStyles.cardCategoryWhite}>Obrigado, {this.state.name}, pelo seu cadastro! Vamos começar fazendo login?</p>

          {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
        </CardHeader>
        <CardBody>
          <Link to={`/login/${this.props.fid}`}>
            <Button type="submit"
              style={{ marginBottom: 16 }}
              fullWidth
              // variant="contained"
              color="primary"> Fazer login</Button>
          </Link>
        </CardBody>
      </Card>

    </GridItem>
  </GridContainer>) }