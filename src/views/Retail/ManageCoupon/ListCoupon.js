import React  from 'react';
// import { makeStyles } from "@material-ui/core/styles";
// import { TextField, } from "@material-ui/core";
import {format,parseISO} from "date-fns";
import pt from 'date-fns/locale/pt';

// import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import Table from "../../../components/Table/Table.js";
// import CardHeader from "../../../components/Card/CardHeader.js";
// import CardFooter from "../../../components/Card/CardFooter.js";
import CardBody from "../../../components/Card/CardBody.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
// import Button from "../../../components/CustomButtons/Button.js";

// import { Container } from './styles';



export default function ListCoupon(props) {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          {/* <CardHeader color="primary"> */}
          <h4 style={{
            // color: "rgba(255,255,255,1)",
            margin: "0",
            fontSize: "18px",
            marginTop: "0",
            marginBottom: "10px"
          }} >Listar os Cupons</h4>
          <p style={{
            // color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
          }}>
            Aqui estão os cupons da {props.name}
            </p>
          {/* </CardHeader> */}
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nome", "Descrição", "Desconto", "Validade","Feedcoins","Usa fidelidade?"]}
              tableData={
              //   [
              //   ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
              //   ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
              //   ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
              //   ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
              //   ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
              //   ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              // ]
              props.list.map(item => [`${item.name}`, `${item.description}`, `${item.discount}`, `${format(parseISO(item.expire_date), "dd ' de ' MMMM  ' de '  y", { locale: pt })}`, `${item.feedcoins}`, `${item.loyalty? "Sim":"Não"}` ])
            }
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}