import React from "react";
// @material-ui/core components
// core components

import { IoMdPrint } from "react-icons/io";
import { RiEBike2Line } from "react-icons/ri";
// import { FaEdit } from "react-icons/fa";

import GridItem from "../../../components/Grid/GridItem.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import Table from "../../../components/Table/Table.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import Button from "../../../components/CustomButtons/Button.js";

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

export default function ListStores(props) {


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
          }} >Lista de lojas</h4>
          <p style={{
            // color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
          }}>
            Aqui estão as lojas da {props.name}
            </p>
          {/* </CardHeader> */}
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nome", "Gerente", "Telefone", " "]}
              tableData={
                // [
                // ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                // ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                // ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                // ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                // ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                // ["Mason Porter", "Chile", "Gloucester", "$78,615"]
                
              // ]
              
              props.list.map(item => [`${item.name}`, `${item.manager}`, `${item.phone}`, 
                    <><Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><IoMdPrint/></Button>
                      <Button onClick={() => openInNewTab(`/print-thermal/${item.id}`)}><RiEBike2Line/></Button>
                      {/* <Button onClick={() => openInNewTab(`/print-qr/${item.id}`)}><MdDeleteForever/></Button> */}
                    </>])
            }
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
