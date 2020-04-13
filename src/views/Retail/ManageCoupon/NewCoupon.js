import React, { Link } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";


import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import CardBody from "../../../components/Card/CardBody.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { Container } from './styles';


const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        width: 120
      }
    }
  }
});
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectControl:{
    margin: theme.spacing(1),
    width: 120,
    padding: '10px 26px 10px 12px',

  }
}));

export default function NewCoupon(props) {
  // const [startDate, setStartDate] = useState(new Date());
  if (props.state.done) {
    return (<Card plain>
      {/* <CardHeader color="success"> */}
      <h4 style={{
        // color: "rgba(255,255,255,1)",
        margin: "0",
        fontSize: "18px",
        marginTop: "0",
        marginBottom: "10px"
      }}>Cadastrar novo cupom</h4>
      <p style={{
        // color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      }}>Oba! No cupom cadastrado com sucesso!</p>

      {/* <p className={useStyles.cardCategoryWhite}>Complete seu perfil</p> */}
      {/* </CardHeader> */}
      <CardFooter>
        <Link to="/retail/shop">
          <Button
            fullWidth
            type="submit"
            color="warning">
            Cadastrar novo cupom?</Button>
        </Link>
      </CardFooter>
    </Card>)
  }
  else {
    return (

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form
            className={useStyles.form}
            noValidate
            onSubmit={props.handleSubmit}
          >
            <Card plain>
              {/* <CardHeader color="success"> */}
              <h4 style={{
                // color: "rgba(255,255,255,1)",
                margin: "0",
                fontSize: "18px",
                marginTop: "0",
                marginBottom: "10px"
              }}>Cadastrar novo cupom</h4>
              <p style={{
                // color: "rgba(255,255,255,.62)",
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                marginBottom: "0"
              }}>Vamos lá, preencha aqui os dados sobre a novo cupom a ser cadastrado.</p>
              {/* </CardHeader> */}
              <CardBody>
                {/* {error ? <div className="divError">{error}</div> : ``} */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoComplete="fname"
                      name="name"
                      value={props.state.name}
                      onChange={props.handleNome}
                      required
                      fullWidth
                      id="name"
                      label="Nome do cupom"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      autoComplete="fname"
                      name="name"
                      value={props.state.descricao}
                      onChange={props.handleDescricao}
                      required
                      fullWidth
                      id="name"
                      label="Descrição do Cupom"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      required
                      fullWidth
                      id="discount"
                      label="Desconto"
                      onChange={props.handleTypeDiscount}
                      value={props.state.discount}
                      name="discount"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      required
                      fullWidth
                      id="feedcoins"
                      label="Feedcoins"
                      onChange={props.handleFeedcoins}
                      value={props.state.feedcoins}
                      name="feedcoins"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>

                    <TextField
                      required
                      fullWidth
                      id="expireDate"
                      label="Validade"
                      onChange={props.handleExpDate}
                      value={props.state.expDate}
                      name="expireDate"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl >
                      <InputLabel id="demo-simple-select-label">Fidelidade</InputLabel>
                      <Select
                        autoWidth={false}
                        // fullWidth
                        className={useStyles.selectControl}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.state.loyalty}
                        onChange={props.handleLoyalty}
                        label="Fidelidade"
                        name="loyalty"
                        theme={theme}
                      >
                        <MenuItem
                        theme={theme}
                          value={true}>Sim</MenuItem>
                        <MenuItem
                          value={false}>Não</MenuItem>
                      </Select>
                    </FormControl>
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
    );
  }
}
