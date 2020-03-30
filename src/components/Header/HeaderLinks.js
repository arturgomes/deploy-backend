/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaFacebook, FaInstagram } from "react-icons/fa";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { isAuthenticated, getTu } from '../../services/auth';


// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <>
      <List className={classes.list}>
        {/* <ListItem className={classes.listItem}>
          <AnchorLink className={classes.dropdownLink} href="#header">Inicio <span className="sr-only">(atual)</span></AnchorLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <AnchorLink className={classes.dropdownLink} href="#services">Serviços</AnchorLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <AnchorLink className={classes.dropdownLink} href="#pricing">Preços</AnchorLink>
        </ListItem> 
        */}
        {/* <ListItem className={classes.listItem}>
          <AnchorLink className={classes.dropdownLink} href="#pricing">Preços</AnchorLink>
        </ListItem>  */}
        
        <ListItem className={classes.listItem}>
          <AnchorLink className="btn-solid-lg1" href="#contact">Contato</AnchorLink>
        </ListItem>
        {isAuthenticated() ?
          (<ListItem className={classes.listItem}>
            <a className="btn-solid-lg" href={getTu() === '897316929176464ebc9ad085f31e7284' ? "/customer" : "/retail"}>Ver seu perfil</a>
          </ListItem>) :
          (<ListItem className={classes.listItem}>
            <a className={classes.dropdownLinkD} href="/login">Área do cliente</a>
          </ListItem>)}

        {/* <ListItem className={classes.listItem}>
          <AnchorLink className={classes.dropdownLink} href="#about" id="navbarDropdown" role="button"
            aria-haspopup="true" aria-expanded="false">Sobre</AnchorLink>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <AnchorLink className={classes.dropdownLink} href="terms-conditions.html"><span className="item-text">Condições
                                contratuais</span></AnchorLink>
            <div className="dropdown-items-divide-hr"></div>
            <AnchorLink className={classes.dropdownLink} href="privacy-policy.html"><span className="item-text">Política de
                                Privacidade</span></AnchorLink>
          </div>
        </ListItem> */}
        {/* 
        <ListItem className={classes.listItem}>
          <Tooltip
            id="instagram-tooltip"
            title="Nos siga no instagram"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href="https://www.instagram.com/couponfeed"
              target="_blank"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fab fa-instagram"} />
            </Button>
          </Tooltip>
          
        </ListItem> */}
        <ListItem className={classes.listItem}>
          <a href="https://fb.com/couponfeed"> <FaFacebook style={{ fontSize: 30 }} /></a>


          {/* <Tooltip
            id="instagram-facebook"
            title="Nos siga no facebook"
            placement={window.innerWidth > 959 ? "top" : "left"}
            classes={{ tooltip: classes.tooltip }}
          >
            <Button
              color="transparent"
              href="https://fb.com/couponfeed"
              target="_blank"
              className={classes.navLink}
            >
              <i className={classes.socialIcons + " fab fa-facebook"} />
            </Button>
          </Tooltip> */}
        </ListItem>
        <ListItem className={classes.listItem}>
          <a href="https://instagram.com/couponfeed"> <FaInstagram style={{ fontSize: 30, marginLeft: 10 }} /></a>
        </ListItem>
      </List>

    </>
  );
}
