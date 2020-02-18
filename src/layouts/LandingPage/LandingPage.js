import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import AnchorLink from "react-anchor-link-smooth-scroll";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./css/bootstrap.min.css";

import "./css/linearicons.css";
import "./css/magnific-popup.css";
import "./css/animate.css";
import "./css/normalize.css";
import "./style.css";
import "./css/responsive.css";

import logo from "../../assets/img/completa_fundo_escuro@4x.png";

let ps;


export default function Admin({ ...rest }) {
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
  return (
    <>
      {/* <div className="preloader">
        <span>
          <i className="lnr lnr-sun"></i>
        </span>
      </div> */}
      <nav className="mainmenu-area" data-spy="affix" data-offset-top="200">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#primary_menu"
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <AnchorLink className="navbar-brand" href="#">
              <img src={logo} alt="Logo" />
            </AnchorLink>
          </div>
          <div className="collapse navbar-collapse" id="primary_menu">
            <ul className="nav navbar-nav mainmenu">
              <li className="active">
                <AnchorLink href="#home_page">Home</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#about_page">About</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#features_page">Features</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#gallery_page">Gallery</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#price_page">Pricing</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#questions_page">FAQ</AnchorLink>
              </li>
              <li>
                <AnchorLink href="blog.html">Blog</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#contact_page">Contacts</AnchorLink>
              </li>
            </ul>
            <div className="right-button hidden-xs">
              <AnchorLink href="/signin">Sign Up</AnchorLink>
            </div>
          </div>
        </div>
      </nav>
      {/* MainMenu-Area-End -->
Home-Area */}
      <header className="home-area overlay" id="home_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 hidden-sm col-md-5">
              <figure
                className="mobile-image wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <img src="images/header-mobile.png" alt="" />
              </figure>
            </div>
            <div className="col-xs-12 col-md-7">
              <div className="space-80 hidden-xs"></div>
              <h1 className="wow fadeInUp" data-wow-delay="0.4s">
                Start your amazing stuff through appy.
              </h1>
              <div className="space-20"></div>
              <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do
                  eiusmod tempor incididunt ut labore et laborused sed do
                  eiusmod tempor incididunt ut labore et laborused.
                </p>
              </div>
              <div className="space-20"></div>
              <AnchorLink
                href="#"
                className="bttn-white wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <i className="lnr lnr-download"></i>Download App
              </AnchorLink>
            </div>
          </div>
        </div>
      </header>
      {/* Home-Area-End -->
About-Area */}
      <section className="section-padding" id="about_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-offset-1">
              <div className="page-title text-center">
                <img src="images/about-logo.png" alt="About Logo" />
                <div className="space-20"></div>
                <h5 className="title">About Appy</h5>
                <div className="space-30"></div>
                <h3 className="blue-color">
                  A beautiful app for consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut mollit anim id est laborum. Sedut
                  perspiciatis unde omnis.{" "}
                </h3>
                <div className="space-20"></div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do
                  eiusmod tempor incididunt ut labore et laborused sed do
                  eiusmod tempor incididunt ut labore et laborused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About-Area-End -->
Progress-Area */}
      <section className="progress-area gray-bg" id="progress_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="page-title section-padding">
                <h5 className="title wow fadeInUp" data-wow-delay="0.2s">
                  Our Progress
                </h5>
                <div className="space-10"></div>
                <h3 className="dark-color wow fadeInUp" data-wow-delay="0.4s">
                  Grat Application Ever
                </h3>
                <div className="space-20"></div>
                <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiing elit, sed
                    do eiusmod tempor incididunt ut labore et laborused sed do
                    eiusmod tempor incididunt ut labore et laborused.
                  </p>
                </div>
                <div className="space-50"></div>
                <AnchorLink
                  href="#"
                  className="bttn-default wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  Learn More
                </AnchorLink>
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <figure className="mobile-image">
                <img src="images/progress-phone.png" alt="" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {/* Progress-Area-End */}
      {/* Video-Area */}
      <section className="video-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <div className="video-photo">
                <img src="images/video-image.jpg" alt="" />
                <AnchorLink
                  href="https://www.youtube.com/watch?v=ScrDhTsX0EQ"
                  className="popup video-button"
                >
                  <img src="images/play-button.png" alt="" />
                </AnchorLink>
              </div>
            </div>
            <div className="col-xs-12 col-md-5 col-md-offset-1">
              <div className="space-60 hidden visible-xs"></div>
              <div className="page-title">
                <h5 className="title wow fadeInUp" data-wow-delay="0.2s">
                  VIDEO FEATURES
                </h5>
                <div className="space-10"></div>
                <h3 className="dark-color wow fadeInUp" data-wow-delay="0.4s">
                  Grat Application Ever
                </h3>
                <div className="space-20"></div>
                <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiing elit, sed
                    do eiusmod tempor incididunt ut labore et laborused sed do
                    eiusmod tempor incididunt ut labore et laborused.
                  </p>
                </div>
                <div className="space-50"></div>
                <AnchorLink
                  href="#"
                  className="bttn-default wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  Learn More
                </AnchorLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Video-Area-End */}
      {/* Feature-Area */}
      <section className="feature-area section-padding-top" id="features_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2">
              <div className="page-title text-center">
                <h5 className="title">Features</h5>
                <div className="space-10"></div>
                <h3>Pwoerful Features As Always</h3>
                <div className="space-60"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <i className="lnr lnr-rocket"></i>
                </div>
                <h4>Fast &amp; Powerful</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.4s">
                <div className="box-icon">
                  <i className="lnr lnr-paperclip"></i>
                </div>
                <h4>Easily Editable</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.6s">
                <div className="box-icon">
                  <i className="lnr lnr-cloud-download"></i>
                </div>
                <h4>Cloud Storage</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60"></div>
            </div>
            <div className="hidden-xs hidden-sm col-md-4">
              <figure className="mobile-image">
                <img src="images/feature-image.png" alt="" />
              </figure>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <i className="lnr lnr-clock"></i>
                </div>
                <h4>Easy Notifications</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.4s">
                <div className="box-icon">
                  <i className="lnr lnr-laptop-phone"></i>
                </div>
                <h4>Fully Responsive</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.6s">
                <div className="box-icon">
                  <i className="lnr lnr-cog"></i>
                </div>
                <h4>Editable Layout</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="space-60"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Feature-Area-End */}
      {/* Testimonial-Area */}

      <section className="testimonial-area" id="testimonial_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="page-title text-center">
                <h5 className="title">Testimonials</h5>
                <h3 className="dark-color">Our Client Loves US</h3>
                <div className="space-60"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <div className="team-slide">
                <div className="team-box">
                  <div className="team-image">
                    <img src="images/team-1.png" alt="" />
                  </div>
                  <h4>Ashekur Rahman</h4>
                  <h6 className="position">Art Dirrector</h6>
                  <p>
                    Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                    laborelaborus ed sed do eiusmod tempo.
                  </p>
                </div>
                <div className="team-box">
                  <div className="team-image">
                    <img src="images/team-2.jpg" alt="" />
                  </div>
                  <h4>Ashekur Rahman</h4>
                  <h6 className="position">Art Dirrector</h6>
                  <p>
                    Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                    laborelaborus ed sed do eiusmod tempo.
                  </p>
                </div>
                <div className="team-box">
                  <div className="team-image">
                    <img src="images/team-3.jpg" alt="" />
                  </div>
                  <h4>Ashekur Rahman</h4>
                  <h6 className="position">Art Dirrector</h6>
                  <p>
                    Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                    laborelaborus ed sed do eiusmod tempo.
                  </p>
                </div>
                <div className="team-box">
                  <div className="team-image">
                    <img src="images/team-1.png" alt="" />
                  </div>
                  <h4>Ashekur Rahman</h4>
                  <h6 className="position">Art Dirrector</h6>
                  <p>
                    Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                    laborelaborus ed sed do eiusmod tempo.
                  </p>
                </div>
                <div className="team-box">
                  <div className="team-image">
                    <img src="images/team-2.jpg" alt="" />
                  </div>
                  <h4>Ashekur Rahman</h4>
                  <h6 className="position">Art Dirrector</h6>
                  <p>
                    Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                    laborelaborus ed sed do eiusmod tempo.
                  </p>
                </div>
                <div className="team-box">
                  <div className="team-image">
                    <img src="images/team-3.jpg" alt="" />
                  </div>
                  <h4>Ashekur Rahman</h4>
                  <h6 className="position">Art Dirrector</h6>
                  <p>
                    Lorem ipsum dolor sit amet, conseg sed do eiusmod temput
                    laborelaborus ed sed do eiusmod tempo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial-Area-End */}
      {/* Gallery-Area */}
      <section className="gallery-area section-padding" id="gallery_page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-sm-6 gallery-slider">
              <div className="gallery-slide">
                <div className="item">
                  <img src="images/gallery-1.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-2.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-3.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-4.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-1.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-2.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-3.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-1.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-2.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-3.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-4.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-1.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-2.jpg" alt="" />
                </div>
                <div className="item">
                  <img src="images/gallery-3.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-5 col-lg-3">
              <div className="page-title">
                <h5
                  className="white-color title wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  Screenshots
                </h5>
                <div className="space-10"></div>
                <h3 className="white-color wow fadeInUp" data-wow-delay="0.4s">
                  Screenshot 01
                </h3>
              </div>
              <div className="space-20"></div>
              <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do
                  eiusmod tempor incididunt ut labore et laborused sed do
                  eiusmod tempor incididunt ut labore et laborused.
                </p>
              </div>
              <div className="space-50"></div>
              <AnchorLink
                href="#"
                className="bttn-default wow fadeInUp"
                data-wow-delay="0.8s"
              >
                Learn More
              </AnchorLink>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery-Area-End */}
      {/* How-To-Use */}
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="page-title">
                <h5 className="title wow fadeInUp" data-wow-delay="0.2s">
                  Our features
                </h5>
                <div className="space-10"></div>
                <h3 className="dark-color wow fadeInUp" data-wow-delay="0.4s">
                  Aour Approach of Design is Prety Simple and Clear
                </h3>
              </div>
              <div className="space-20"></div>
              <div className="desc wow fadeInUp" data-wow-delay="0.6s">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiing elit, sed do
                  eiusmod tempor incididunt ut labore et laborused sed do
                  eiusmod tempor incididunt ut labore et laborused.
                </p>
              </div>
              <div className="space-50"></div>
              <AnchorLink
                href="#"
                className="bttn-default wow fadeInUp"
                data-wow-delay="0.8s"
              >
                Learn More
              </AnchorLink>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1">
              <div className="space-60 hidden visible-xs"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <i className="lnr lnr-clock"></i>
                </div>
                <h4>Easy Notifications</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
              <div className="space-50"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <i className="lnr lnr-laptop-phone"></i>
                </div>
                <h4>Fully Responsive</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
              <div className="space-50"></div>
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="box-icon">
                  <i className="lnr lnr-cog"></i>
                </div>
                <h4>Editable Layout</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How-To-Use-End */}
      {/* Download-Area */}
      <div className="download-area overlay">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 hidden-sm">
              <figure className="mobile-image">
                <img src="images/download-image.png" alt="" />
              </figure>
            </div>
            <div className="col-xs-12 col-md-6 section-padding">
              <h3 className="white-color">Download The App</h3>
              <div className="space-20"></div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quibusdam possimus eaque magnam eum praesentium unde.
              </p>
              <div className="space-60"></div>
              <AnchorLink href="#" className="bttn-white sq">
                <img src="images/apple-icon.png" alt="apple icon" /> Apple Store
              </AnchorLink>
              <AnchorLink href="#" className="bttn-white sq">
                <img src="images/play-store-icon.png" alt="Play Store Icon" />{" "}
                Play Store
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>
      {/* Download-Area-End */}
      {/* <!--Price-Area */}
      <section className="section-padding price-area" id="price_page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="page-title text-center">
                <h5 className="title">Pricing Plan</h5>
                <h3 className="dark-color">Our Awesome Pricing Plan</h3>
                <div className="space-60"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="price-box">
                <div className="price-header">
                  <div className="price-icon">
                    <span className="lnr lnr-rocket"></span>
                  </div>
                  <h4 className="upper">Free</h4>
                </div>
                <div className="price-body">
                  <ul>
                    <li>Easy Installations</li>
                    <li>Unlimited support</li>
                    <li>Uniqe Elements</li>
                  </ul>
                </div>
                <div className="price-rate">
                  <sup>&#36;</sup> <span className="rate">0</span>{" "}
                  <small>/Month</small>
                </div>
                <div className="price-footer">
                  <AnchorLink href="#" className="bttn-white">
                    Purchase
                  </AnchorLink>
                </div>
              </div>
              <div className="space-30 hidden visible-xs"></div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="price-box">
                <div className="price-header">
                  <div className="price-icon">
                    <span className="lnr lnr-diamond"></span>
                  </div>
                  <h4 className="upper">Medium</h4>
                </div>
                <div className="price-body">
                  <ul>
                    <li>Easy Installations</li>
                    <li>Unlimited support</li>
                    <li>Free Forever</li>
                  </ul>
                </div>
                <div className="price-rate">
                  <sup>&#36;</sup> <span className="rate">49</span>{" "}
                  <small>/Month</small>
                </div>
                <div className="price-footer">
                  <AnchorLink href="#" className="bttn-white">
                    Purchase
                  </AnchorLink>
                </div>
              </div>
              <div className="space-30 hidden visible-xs"></div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <div className="price-box">
                <div className="price-header">
                  <div className="price-icon">
                    <span className="lnr lnr-pie-chart"></span>
                  </div>
                  <h4 className="upper">Business</h4>
                </div>
                <div className="price-body">
                  <ul>
                    <li>Easy Installations</li>
                    <li>Unlimited support</li>
                    <li>Free Forever</li>
                  </ul>
                </div>
                <div className="price-rate">
                  <sup>&#36;</sup> <span className="rate">99</span>{" "}
                  <small>/Month</small>
                </div>
                <div className="price-footer">
                  <AnchorLink href="#" className="bttn-white">
                    Purchase
                  </AnchorLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--Price-Area-End */}
      {/* <!--Questions-Area */}
      <section id="questions_page" className="questions-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="page-title text-center">
                <h5 className="title">FAQ</h5>
                <h3 className="dark-color">Frequently Asked Questions</h3>
                <div className="space-60"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="toggole-boxs">
                <h3>Faq first question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <h3>About freewuent question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <h3>Why more question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <h3>What question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="space-20 hidden visible-xs"></div>
              <div className="toggole-boxs">
                <h3>Faq second question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <h3>Third faq question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <h3>Why more question goes here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
                <h3>Seventh frequent question here? </h3>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--Questions-Area-End */}
      {/* Subscribe-Form */}
      <div className="subscribe-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2">
              <div className="subscribe-form text-center">
                <h3 className="blue-color">Subscribe for More Features</h3>
                <div className="space-20"></div>
                <form id="mc-form">
                  <input
                    type="email"
                    className="control"
                    placeholder="Enter your email"
                    required="required"
                    id="mc-email"
                  />
                  <button className="bttn-white active" type="submit">
                    <span className="lnr lnr-location"></span> Subscribe
                  </button>
                  <label className="mt10" htmlFor="mc-email"></label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Subscribe-Form-Area */}
      {/* Footer-Area */}
      <footer className="footer-area" id="contact_page">
        <div className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="page-title text-center">
                  <h5 className="title">Contact US</h5>
                  <h3 className="dark-color">Find Us By Bellow Details</h3>
                  <div className="space-60"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <div className="footer-box">
                  <div className="box-icon">
                    <span className="lnr lnr-map-marker"></span>
                  </div>
                  <p>
                    8-54 Paya Lebar Square <br /> 60 Paya Lebar Roa SG,
                    Singapore
                  </p>
                </div>
                <div className="space-30 hidden visible-xs"></div>
              </div>
              <div className="col-xs-12 col-sm-4">
                <div className="footer-box">
                  <div className="box-icon">
                    <span className="lnr lnr-phone-handset"></span>
                  </div>
                  <p>
                    +65 93901336 <br /> +65 93901337
                  </p>
                </div>
                <div className="space-30 hidden visible-xs"></div>
              </div>
              <div className="col-xs-12 col-sm-4">
                <div className="footer-box">
                  <div className="box-icon">
                    <span className="lnr lnr-envelope"></span>
                  </div>
                  <p>
                    yourmail@gmail.com <br /> backpiper.com@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer-Bootom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-5">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                <span>
                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved | This template is made with{" "}
                  <i className="lnr lnr-heart" aria-hidden="true"></i> by{" "}
                  <AnchorLink href="https://colorlib.com" target="_blank">
                    Colorlib
                  </AnchorLink>
                </span>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                <div className="space-30 hidden visible-xs"></div>
              </div>
              <div className="col-xs-12 col-md-7">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <AnchorLink href="#">About</AnchorLink>
                    </li>
                    <li>
                      <AnchorLink href="#">Services</AnchorLink>
                    </li>
                    <li>
                      <AnchorLink href="#">Features</AnchorLink>
                    </li>
                    <li>
                      <AnchorLink href="#">Pricing</AnchorLink>
                    </li>
                    <li>
                      <AnchorLink href="#">Testimonial</AnchorLink>
                    </li>
                    <li>
                      <AnchorLink href="#">Contacts</AnchorLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer-Bootom-End */}
      </footer>
      {/* Footer-Area-End */}
      {/* <!--Vendor-JS*/}
    </>
  );
}
