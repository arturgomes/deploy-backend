import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, } from "@material-ui/core";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import CardBody from "../../../components/Card/CardBody.js";


import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";


const useStyles = makeStyles(theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "28px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
}));

// import { Container } from './styles';

export default function NewStoreForm(props) {
  

  if (props.state.done === 'true') {
    return (<Card plain>
      <CardHeader color="success">
        <h4 style={{
          color: "rgba(255,255,255,1)",
          margin: "0",
          fontSize: "18px",
          marginTop: "0",
          marginBottom: "10px"
        }}>Cadastrar nova loja</h4>
       

        {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
      </CardHeader>
      <CardFooter>
      <p style={{
          color: "#000",
          margin: "0",
          fontSize: "18px",
          marginTop: "0",
          marginBottom: "0"
        }}>Oba! Nova loja cadastrada com sucesso!</p>
        
        {/* <Link to="/retail/shop">
          <Button
            fullWidth
            type="submit"
            color="success">
            Cadastrar nova loja?</Button>
        </Link> */}
      </CardFooter>
    </Card>)
  }
  else {
    return (
      <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form
            className={useStyles.form}
            noValidate
            onSubmit={props.submit}
          >
            <Card plain>
              {/* <CardHeader color="success"> */}
                <h4 style={{
                  // color: "rgba(255,255,255,1)",
                  margin: "0",
                  fontSize: "18px",
                  marginTop: "0",
                  marginBottom: "10px"
                }}>Cadastrar nova loja</h4>
                <p style={{
                  // color: "rgba(255,255,255,.62)",
                  margin: "0",
                  fontSize: "14px",
                  marginTop: "0",
                  marginBottom: "0"
                }}>Vamos lá, preencha aqui os dados sobre a nova loja a ser cadastrada.</p>

                {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
              {/* </CardHeader> */}
              <CardBody>
                {/* {error ? <div className="divError">{error}</div> : ``} */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoComplete="fname"
                      name="name"
                      value={props.state.name}
                      onChange={props.handleNameInput}
                      required
                      fullWidth
                      id="name"
                      label="Nome da Loja"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Telefone"
                      placeholder="(__) __________"
                      onChange={props.handlePhoneInput}
                      value={props.state.phone}
                      name="phone"
                      autoComplete="phone"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      name="manager"
                      style={{ marginBottom: 16 }}
                      label="Gerente"
                      onChange={props.handleManagerInput}
                      value={props.state.manager}
                      autoComplete="fname"
                    />
                  </GridItem>
                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button
                  fullWidth
                  type="submit"
                  color="success">
                  Cadastrar!</Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
      </>)
    }

}
