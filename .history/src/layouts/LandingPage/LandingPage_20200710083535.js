import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"


import { useScrollPosition } from '@n8tb1t/use-scroll-position'
// import PerfectScrollbar from "perfect-scrollbar";

import {
  FaQrcode,
  FaFacebook,
  FaInstagram,
  // FaCheck,
  // FaTimes,
  FaWhatsapp,
  FaChartBar,
  FaHandsHelping
} from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//Material.ui
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined'; //clock
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';


import AnchorLink from "react-anchor-link-smooth-scroll";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slogan from "./images/sem_slogan_fundo_claro@4x.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/fontawesome-all.css";
import "./css/fontawesome.css";
import "./css/swiper.css";
import "./css/magnific-popup.css";
import "./css/styles.css";

import Header from "../../components/Header/Header.js";
import Button from "../../components/CustomButtons/Button.js";
import styles from '../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle'
// import Parallax from "../../components/Parallax/Parallax.js";
import feedback from "./images/feedback.svg";
import { login, getId, getUser, isAuthenticated, getTu } from '../../services/auth';
import { api } from '../../services/api';

const useStyles = makeStyles(styles);
const classes = useStyles();


// let ps;

export default class LandingPage extends Component {
  async componentDidMount() {
    api.get('/login/success')
      // fetch("https://api.couponfeed.co/login/success", {
      //   method: "GET",
      //   credentials: "include",
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
        // this.setState({
        // authenticated: true,
        // user: responseJson.data.login
        // });
        const { name, id, tu } = responseJson.data;
        login(responseJson.data.token, name, id, tu);
        // getUser() === 'customer' ? this.props.history.push("/customer") : this.props.history.push("/retail");
      })
      .catch(error => {
        this.setState({
          // authenticated: false,
          error: "Failed to authenticate user"
        });
      });
    if (isAuthenticated() && (getUser() === 'customer')) {
      const fid = decodeURIComponent(this.props.match.params.fid);
      if (fid) {
        // console.log("tem fid");
        api.post(`/users/i`, {
          fid,
          user_id: getId()
        })
          .then(response => {
            this.props.history.push("/customer");
          })
          .catch(err => { this.setState({ error: err.response.data.error }) })
      }

    }
    if (isAuthenticated() && (getUser() === 'retail')) {
      const fid = decodeURIComponent(this.props.match.params.fid);
      if (fid) {
        // console.log("tem fid");
        api.post(`/users/i`, {
          fid,
          user_id: getId()
        })
          .then(response => {
            this.props.history.push("/retail");
          })
          .catch(err => { this.setState({ error: err }) })
      }
    }
  }
  // const { ...rest } = props;

  // const [prices] = useState([
  //   {
  //     value: 0,
  //     category: "Prata",
  //     type: "Ideal para MEI",
  //     features: [
  //       { valid: false, fmonth: "60 feedbacks por mês" },
  //       { valid: true, fmonth: "Relatório 60 feedbacks por mês" },
  //       { valid: true, fmonth: "Registro de um QR code" },
  //       { valid: false, fmonth: "Acesso a um dashboard personalizado" },
  //       { valid: false, fmonth: "Relatórios por e-mail" },
  //     ],
  //     prices: {
  //       monthly: "34.90",
  //       trimestral: "89.70",
  //       anual: "298.80"
  //     }
  //   },
  //   {
  //     value: 1,
  //     category: "Ouro",
  //     type: "Ideal quem está começando",

  //     features: [
  //       { valid: false, fmonth: "60 feedbacks por mês" },
  //       { valid: true, fmonth: "Relatório 60 feedbacks por mês" },
  //       { valid: true, fmonth: "Registro de um QR code" },
  //       { valid: false, fmonth: "Acesso a um dashboard personalizado" },
  //       { valid: false, fmonth: "Relatórios por e-mail" },
  //     ],
  //     prices: {
  //       monthly: "99",
  //       trimestral: "270",
  //       anual: "1020"
  //     }

  //   },
  //   {
  //     value: 2,
  //     category: "Diamante",
  //     type: "Ideal quem está em expansão",

  //     features: [
  //       { valid: true, fmonth: "Feedbacks ilimitados" },
  //       { valid: true, fmonth: "Relatório 60 feedbacks por mês" },
  //       { valid: true, fmonth: "Registro de um QR code" },
  //       { valid: true, fmonth: "Acesso a um dashboard personalizado" },
  //       { valid: true, fmonth: "Relatórios por e-mail" },
  //     ],
  //     prices: {
  //       monthly: "199",
  //       trimestral: "540",
  //       anual: "1980"
  //     }
  //   },
  //   {
  //     value: 3,
  //     category: "Platinum",
  //     type: "Ideal quem tem filiais",

  //     features: [
  //       { valid: true, fmonth: "Feedbacks ilimitados" },
  //       { valid: true, fmonth: "Relatório ilimitados" },
  //       { valid: true, fmonth: "Registro de cinco QR codes" },
  //       { valid: true, fmonth: "Acesso a um dashboard personalizado" },
  //       { valid: true, fmonth: "Relatórios por e-mail" },
  //     ],
  //     prices: {
  //       monthly: "359",
  //       trimestral: "897",
  //       anual: "3180"
  //     }
  //   },
  // ])

  // styles
  // const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  // const mainPanel = React.createRef();
  // // states and functions
  // const resizeFunction = () => {
  //   if (window.innerWidth >= 960) {
  //     // setMobileOpen(false);
  //   }
  // };
  // // initialize and destroy the PerfectScrollbar plugin
  // React.useEffect(() => {
  //   // if (navigator.platform.indexOf("Win") > -1) {
  //   //   ps = new PerfectScrollbar(mainPanel.current, {
  //   //     suppressScrollX: true,
  //   //     suppressScrollY: false
  //   //   });
  //   //   document.body.style.overflow = "hidden";gi
  //   // }
  //   // window.addEventListener("resize", resizeFunction);
  //   // // Specify how to clean up after this effect:
  //   // return function cleanup() {
  //   //   if (navigator.platform.indexOf("Win") > -1) {
  //   //     ps.destroy();
  //   //   }
  //   //   window.removeEventListener("resize", resizeFunction);
  //   // };
  //   const ps = new PerfectScrollbar(mainPanel.current);
  // }, [mainPanel]);

//   const[headerStyle] = useState({
//     transition: 'all 200ms ease-in'
//   })

//   useScrollPosition(
//     ({ prevPos, currPos }) => {
//   // const isVisible = currPos.y > prevPos.y

//   // const shouldBeStyle = isVisible ? {
//   //   backgroundColor: 'transparent',
//   //   transition: `all 200ms ${isVisible ? 'ease-in' : 'ease-out'}`,
//   //   // transform: isVisible ? 'none' : 'translate(0, -100%)'
//   // }
//   //   : {
//   //     backgroundColor: '#fff',
//   //     transition: `all 200ms ${isVisible ? 'ease-in' : 'ease-out'}`,
//   //     // transform: isVisible ? 'none' : 'translate(0, -20%)',
//   //     height: '1rem'
//   //   }

//   // if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

//   // setHeaderStyle(shouldBeStyle)
// },
//   [headerStyle]
//   )
render(){
  return (
    <>
      <Header
        brand={slogan}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        rightLinks={<>
          {/* <HeaderLinks/> */}
          <List className={classes.list}>

            {isAuthenticated() ?
              (<ListItem className={classes.listItem}>
                <Button
                  href={getTu() === '897316929176464ebc9ad085f31e7284' ? "/customer" : "/retail"}
                  className={classes.navLink}
                  // onClick={e => e.preventDefault()}
                  color="transparent"
                >
                  Seu Perfil
                  </Button>
              </ListItem>) :
              (<ListItem className={classes.listItem}>
                <Button
                  href="/login"
                  className={classes.navLink}
                  //  onClick={e => e.preventDefault()}
                  color="transparent"
                >
                  Área do cliente
                 </Button>
              </ListItem>)
            }
            <ListItem className={classes.listItem}>
              <Button
                href="/rsignup"
                className={useStyles.registerNavLink}
                style={{ fontSize: "14px" }}
                // onClick={e => e.preventDefault()}
                color="rose"
                round
              >
                Quero ouvir meus clientes agora!
                  </Button>
            </ListItem>
          </List></>
        }
      />


      <header id="header" className="header" >
        <div className="header-content">
          {/* <Parallax > */}

          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="text-container">
                  <h1><span className="turquoise">Dê Feedbacks</span> <br />Concorra a prêmios
                  </h1>
                  <p className="p-large">Quem não gosta de um desconto ou brinde? A CouponFeed veio para auxiliar
                  o varejista na coleta de feedbacks das experiências de seu cliente. E em troca, o
                  cliente acumula pontos que podem ser convertidos em descontos em produtos e também
                                participa de promoções exclusivas.</p>


                  {/* <AnchorLink className="btn-solid-lg" href="/rsignup">TESTE GRATIS POR 30 DIAS</AnchorLink > */}
                </div>
                {/* <div className="row"> */}
                <div className="iWant">
                  <div className="cta-group" style={{ textAlign: 'center' }}>
                    <ul>
                      <li>
                        <span>EU QUERO...</span>
                      </li>
                      <li>
                        <Button className="btn-solid-lg1" component={Link} to="/signup">DAR FEEDBACKS</Button >
                      </li>
                      <li>
                        <p><i>Escolha essa se você é consumidor e quer ganhar prêmios em troca de seus feedbacks.</i></p>
                      </li>
                    </ul>
                  </div>
                  <div className="cta-middle" style={{ textAlign: 'center' }}><span>OU</span></div>
                  <div className="cta-group" style={{ textAlign: 'center' }}>
                    <ul>
                      <li>
                        <span>EU QUERO...</span>
                      </li>
                      <li>
                        <Button className="btn-solid-lg2" component={Link} to="/rsignup">OUVIR MEUS CLIENTES</Button >
                      </li>
                      <li>
                        <p><i>Escolha essa se você é varejista ou presta serviços para clientes</i></p>
                      </li>
                    </ul>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="iHide">
                <div className="col-lg-4">
                  <div className="image-container">
                    <img className="img-fluid" src={feedback} alt="alternative" />
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* </Parallax> */}
        </div>
      </header >


      <div id="services" className="cards-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Solução completa para seu negócio</h2>
              <p className="p-heading p-large">Independente do tamanho do seu negócio, a opinião do seu consumidor é essencial para avaliar a qualidade do atendimento, do serviço prestado, e até mesmo do produto disponível no estoque. A CouponFeed te auxilia na tomada de decisões para o crescimento do seu negócio.</p>
            </div>
          </div>
          <div className="row">

            <div className="col-lg-12">
              <div className="card">
                <QueryBuilderOutlinedIcon style={{ fontSize: 120, paddingBottom: 20, alignContent: 'center', justifyContent: 'center' }} />
                <h4 className="card-title">Obtenha feedbacks 24/7</h4>
                <p>Obtenha feedbacks dos clientes a qualquer hora, enqunato que seu estabelecimento estiver aberto.</p>
              </div>
              <div className="card">
                <TransferWithinAStationIcon style={{ fontSize: 120, paddingBottom: 20 }} />
                <div className="card-body">
                  <h4 className="card-title">Feedback da experiência do cliente</h4>
                  <p>Ao usar o CouponFeed, o seu cliente irá fornecer um feedback de sua experiência antes de deixar seu estabelecimento.</p>
                </div>
              </div>
              <div className="card">
                <FaQrcode style={{ fontSize: 120, paddingBottom: 20 }} />
                <div className="card-body">
                  <h4 className="card-title">QR Code ao invés de totens</h4>
                  <p>Sem totens ou botões! Seu cliente irá dar seu feedback direto de seu celular, ainda dentro da loja</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <TiDocumentText style={{ fontSize: 120, paddingBottom: 20 }} />
                <div className="card-body">
                  <h4 className="card-title">Relatórios</h4>
                  <p>Os feebacks estarão disponíveis imediatamente no seu perfil CouponFeed</p>
                </div>
              </div>
              <div className="card">
                <FaChartBar style={{ fontSize: 120, paddingBottom: 20 }} />
                <div className="card-body">
                  <h4 className="card-title">Estatísticas</h4>
                  <p>Seu perfil conta com estatísticas e gráficos sobre os feedbacks, para um rápido monitoramento. Auxilia na tomada de decisão para a melhoria na prestação de serviço.</p>
                </div>
              </div>
              <div className="card">
                <FaHandsHelping style={{ fontSize: 120, paddingBottom: 20 }} />
                <div className="card-body">
                  <h4 className="card-title">Fidelidade</h4>
                  <p>Faça campanhas de fidelização de seus clientes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* value:2, 
        category:"Diamante",
        type:"Ideal lojistas em expansão",
        fmonth:"feedbacks ilimitados", 
        prices:[
          {monthly:"199"},
          {trimestral:"550"},
          {anual:"2000"} */}


      {/*       

      <div id="pricing" className="cards-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>ESCOLHA SEU PLANO</h2>
              <p className="p-heading p-large">Planos pensados para atender os mais diferentes volumes de vendas mensais. </p>
            </div>
          </div>
          <div 
          >
            <div 
            >
                    {prices.map((p) => (
                      <div className="card">
                        <div className="card-body">
                            <div className="card-title">{p.category}</div>
                            <div className="card-subtitle">{p.type}</div>
                            <hr className="cell-divide-hr" />
                            <ul className="list-unstyled li-space-lg">
                              {p.features.map((feat) => (
                                <li className="media">
                                  {feat.valid ? (<FaCheck />):(<FaTimes/>)}
                                  <div className="media-body">{feat.fmonth}</div>
                              </li>
                              ))
                              }

                            </ul>
                            <hr className="cell-divide-hr" />
                            <div className="price">
                              <span className="currency">R$ </span><span className="value">{p.prices.monthly}</span>
                              <div className="frequency">mensal</div>
                            </div>
                            <hr className="cell-divide-hr" />
                            <div className="price">
                              <span className="currency">R$ </span><span className="value">{(p.prices.trimestral/3).toFixed(2)}</span>
                              <div className="frequency"><p>Assinatura trimestral</p>Total: R$ {p.prices.trimestral} </div>
                            </div>
                            <hr className="cell-divide-hr" />
                            <div className="price">
                              <span className="currency">R$ </span><span className="value">{(p.prices.anual/12).toFixed(2)}</span>
                              <div className="frequency"> <p>Assinatura anual</p>Total: R$ {p.prices.anual}</div>
                            </div>
                            <div className="button-wrapper">
                              <AnchorLink className="btn-solid-reg page-scroll" href="#request">Grátis por 30 dias</AnchorLink >
                            </div>
                          </div>
                      </div>
                ))}
            </div>
          </div>
        </div>
      </div> */}



      <div id="contact" className="form-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Informações de Contato</h2>
              <ul className="list-unstyled li-space-lg">
                <li className="address">Não hesite em nos contactar ou mandar uma mensagem</li>

                <li>Olga <FaWhatsapp className="turquoise" style={{ fontSize: 20 }} /> <AnchorLink className="turquoise"
                  href="https://wa.me/5567992432095">+55 67
                                99243-2095</AnchorLink >
                </li>
                <li>Artur <FaWhatsapp className="turquoise" style={{ fontSize: 20 }} /> <AnchorLink className="turquoise"
                  href="https://wa.me/5567993021141">+55
                  67
                                99302-1141</AnchorLink >
                </li>
                <li><i className="fas fa-envelope"></i><AnchorLink className="turquoise"
                  href="mailto:couponfeedbr@gmail.com">couponfeedbr@gmail.com</AnchorLink ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>




      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-col">
                <h4>Sobre a CouponFeed</h4>
                <p>Somos fascinados em oferecer um dos mais atrativos serviços de coleta de informações sobre a
                            experiência dos clientes.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="footer-col last">
                <h4>Siga-nos nas redes sociais</h4>

                <a href="https://fb.com/couponfeed"> <FaFacebook style={{ fontSize: 30 }} /></a>

                <a href="https://instagram.com/couponfeed"> <FaInstagram style={{ fontSize: 30, marginLeft: 10 }} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="p-small">Copyright © 2020 <AnchorLink href="https://inovatik.com">Inovatik</AnchorLink > - All rights
                        reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
}
