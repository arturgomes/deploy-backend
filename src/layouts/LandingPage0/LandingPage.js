import React, { useRef, useEffect, useState } from "react";

import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import PerfectScrollbar from "perfect-scrollbar";

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
import HeaderLinks from "../../components/Header/HeaderLinks.js";

import sv1 from "./images/services-icon-1.svg"
import sv2 from "./images/services-icon-2.svg"
import sv3 from "./images/services-icon-3.svg"
import feedback from "./images/feedback.svg";

import logo from "../../assets/img/completa_fundo_escuro@4x.png";
import { isAuthenticated, getTu } from '../../services/auth'
const dashboardRoutes = [];

let ps;

export default function LandingPage(props) {
  const { ...rest } = props;

  // styles
  // const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      // setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const [headerStyle, setHeaderStyle] = useState({
    transition: 'all 200ms ease-in'
  })

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible = currPos.y > prevPos.y

      // const shouldBeStyle = isVisible ? {
      //   backgroundColor: 'transparent',
      //   transition: `all 200ms ${isVisible ? 'ease-in' : 'ease-out'}`,
      //   // transform: isVisible ? 'none' : 'translate(0, -100%)'
      // }
      //   : {
      //     backgroundColor: '#fff',
      //     transition: `all 200ms ${isVisible ? 'ease-in' : 'ease-out'}`,
      //     // transform: isVisible ? 'none' : 'translate(0, -20%)',
      //     height: '1rem'
      //   }

      // if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

      // setHeaderStyle(shouldBeStyle)
    },
    [headerStyle]
  )

  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={slogan}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      {/* <nav
        style={{ ...headerStyle }}
        className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top" >


        <AnchorLink
          className="navbar-brand logo-image"
          href="index.html">
          <img
            // width="200"
            src={slogan}
            alt="alternative" /></AnchorLink>


        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-awesome fas fa-bars"></span>
          <span className="navbar-toggler-awesome fas fa-times"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul

            className="navbar-nav ml-auto">
            <li className="nav-item">
              <AnchorLink className="nav-link page-scroll" href="#header">Inicio <span className="sr-only">(atual)</span></AnchorLink>
            </li>
            <li className="nav-item">
              <AnchorLink className="nav-link page-scroll" href="#services">Serviços</AnchorLink>
            </li>
            <li className="nav-item">
              <AnchorLink className="nav-link page-scroll" href="#pricing">Preços</AnchorLink>
            </li>

            <li className="nav-item dropdown">
              <AnchorLink className="nav-link dropdown-toggle page-scroll" href="#about" id="navbarDropdown" role="button"
                aria-haspopup="true" aria-expanded="false">Sobre</AnchorLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <AnchorLink className="dropdown-item" href="terms-conditions.html"><span className="item-text">Condições
                                contratuais</span></AnchorLink>
                <div className="dropdown-items-divide-hr"></div>
                <AnchorLink className="dropdown-item" href="privacy-policy.html"><span className="item-text">Política de
                                Privacidade</span></AnchorLink>
              </div>
            </li>
            <li className="nav-item">
              <AnchorLink className="nav-link page-scroll" href="#contact">Contato</AnchorLink>
            </li>
          </ul>
          <span className="nav-item social-icons">
            <span className="fa-stack">
              <AnchorLink href="http://fb.com/couponfeed">
                <i className="fas fa-circle fa-stack-2x facebook"></i>
                <i className="fab fa-facebook-f fa-stack-1x"></i>
              </AnchorLink >
            </span>
            <span className="fa-stack">
              <AnchorLink href="#your-link">
                <i className="fas fa-circle fa-stack-2x twitter"></i>
                <i className="fab fa-twitter fa-stack-1x"></i>
              </AnchorLink >
            </span>
          </span>
        </div>
      </nav > */}




      <header id="header" className="header" >
        <div className="header-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="text-container">
                  <h1><span className="turquoise">Dê Feedbacks</span> <br />Concorra a prêmios
                  </h1>
                  <p className="p-large">Quem não gosta de um desconto ou brinde? A CouponFeed veio para auxiliar
                      o varejista na coleta de feedbacks das experiências de seu cliente. E em troca, o
                      cliente acumula pontos que podem ser convertidos em descontos em produtos e também
                                participa de promoções exclusivas.</p>
                  <AnchorLink className="btn-solid-lg1" href="#services">DECOLE AGORA
                                MESMO</AnchorLink >
                </div>
              </div>
              <div className="col-lg-6">
                <div className="image-container">
                  <img className="img-fluid" src={feedback} alt="alternative" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header >


      <div id="services" className="cards-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Business Growth Services</h2>
              <p className="p-heading p-large">We serve small and medium sized companies in all tech related
                        industries with high quality growth services which are presented below</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">


              <div className="card">
                <img className="card-image" src={sv1} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Market Analysis</h4>
                  <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks
                                against the closest competitors</p>
                </div>
              </div>



              <div className="card">
                <img className="card-image" src={sv2} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Opportunity Scan</h4>
                  <p>Once the market analysis process is completed our staff will search for opportunities
                                that are in reach</p>
                </div>
              </div>



              <div className="card">
                <img className="card-image" src={sv3} alt="alternative" />
                <div className="card-body">
                  <h4 className="card-title">Action Plan</h4>
                  <p>With all the information in place you will be presented with an action plan that your
                                company needs to follow</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>



      {/* 

      <div id="pricing" className="cards-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Multiple Pricing Options</h2>
              <p className="p-heading p-large">We've prepared pricing plans for all budgets so you can get started
                        right away. They're great for small companies and large organizations</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">STARTER</div>
                  <div className="card-subtitle">Just to see what can be achieved</div>
                  <hr className="cell-divide-hr" />
                  <div className="price">
                    <span className="currency">$</span><span className="value">199</span>
                    <div className="frequency">monthly</div>
                  </div>
                  <hr className="cell-divide-hr" />
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">Improve Your Email Marketing</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">User And Admin Rights Control</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-times"></i>
                      <div className="media-body">List Building And Cleaning</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-times"></i>
                      <div className="media-body">Collected Data Management</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-times"></i>
                      <div className="media-body">More Planning And Evaluation</div>
                    </li>
                  </ul>
                  <div className="button-wrapper">
                    <AnchorLink className="btn-solid-reg page-scroll" href="#request">REQUEST</AnchorLink >
                  </div>
                </div>
              </div>


              <div className="card">
                <div className="card-body">
                  <div className="card-title">MEDIUM</div>
                  <div className="card-subtitle">Very appropriate for the short term</div>
                  <hr className="cell-divide-hr" />
                  <div className="price">
                    <span className="currency">$</span><span className="value">299</span>
                    <div className="frequency">monthly</div>
                  </div>
                  <hr className="cell-divide-hr" />
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">Improve Your Email Marketing</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">User And Admin Rights Control</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">List Building And Cleaning</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">Collected Data Management</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-times"></i>
                      <div className="media-body">More Planning And Evaluation</div>
                    </li>
                  </ul>
                  <div className="button-wrapper">
                    <AnchorLink className="btn-solid-reg page-scroll" href="#request">REQUEST</AnchorLink >
                  </div>
                </div>
              </div>


              <div className="card">
                <div className="label">
                  <p className="best-value">Best Value</p>
                </div>
                <div className="card-body">
                  <div className="card-title">COMPLETE</div>
                  <div className="card-subtitle">Must have for large companies</div>
                  <hr className="cell-divide-hr" />
                  <div className="price">
                    <span className="currency">$</span><span className="value">399</span>
                    <div className="frequency">monthly</div>
                  </div>
                  <hr className="cell-divide-hr" />
                  <ul className="list-unstyled li-space-lg">
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">Improve Your Email Marketing</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">User And Admin Rights Control</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">List Building And Cleaning</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">Collected Data Management</div>
                    </li>
                    <li className="media">
                      <i className="fas fa-check"></i>
                      <div className="media-body">More Planning And Evaluation</div>
                    </li>
                  </ul>
                  <div className="button-wrapper">
                    <AnchorLink className="btn-solid-reg page-scroll" href="#request">REQUEST</AnchorLink >
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

 */}






      <div id="contact" className="form-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Informações de Contato</h2>
              <ul className="list-unstyled li-space-lg">
                <li className="address">Não hesite em nos contactar ou mandar uma mensagem</li>

                <li>Olga <i className="fas fa-whatsapp"></i><AnchorLink className="turquoise"
                  href="https://wa.me/5567992432095">+55 67
                                9243-2095</AnchorLink >
                </li>
                <li>Artur <i className="fas fa-whatsapp"></i><AnchorLink className="turquoise"
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
                <p>Somos fascinados em oferecer um dos mais atrativos serviços de coleta de ifnormações sobre a
                            experiência dos clientes.</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="footer-col last">
                <h4>Social Media</h4>
                <span className="fa-stack">
                  <AnchorLink href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                  </AnchorLink >
                </span>
                <span className="fa-stack">
                  <AnchorLink href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-twitter fa-stack-1x"></i>
                  </AnchorLink >
                </span>
                <span className="fa-stack">
                  <AnchorLink href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-google-plus-g fa-stack-1x"></i>
                  </AnchorLink >
                </span>
                <span className="fa-stack">
                  <AnchorLink href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-instagram fa-stack-1x"></i>
                  </AnchorLink >
                </span>
                <span className="fa-stack">
                  <AnchorLink href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-linkedin-in fa-stack-1x"></i>
                  </AnchorLink >
                </span>
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
