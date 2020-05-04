import React, { Component } from 'react';
import '../assets/css/print-th.css';
import QrCode from "qrcode.react";
import { FaHome, FaFacebook, FaInstagram } from "react-icons/fa";
import LinearProgress from '@material-ui/core/LinearProgress';

import cflogo from "../assets/img/completa_monocromatica@4x.png"
import api from "../services/api";

class Demo extends Component {

  render() {
    return (
      <div>
        <QrCode size={500} renderAs='svg' value={this.props.link} />
      </div>
    );
  }
}

export default class PrintQRThermal extends Component {

  state = {
    name: '',
    id: '',
    retail_id: '',
    isLoading: true,
    url: ''
  };

  async componentDidMount() {
    const qs = decodeURIComponent(this.props.match.params.id);
    const response = await api.post(`/shopsl`, { shop_id: qs });
    if (!response.error) {
      const { retail_id, name, short_url } = response.data;
      this.setState({
        name,
        id: qs,
        short_url,
        retail_id
      }, () => { });

    }
    else {
      this.setState({ error: "Loja não encontrada" })
    }
    const res = await api.post(`/files/${this.state.retail_id}`);
    if (!res.error) {
      const { url } = res.data[0];
      console.log();
      this.setState({ url })
    }
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    const { id } = this.props.match.params;
    const link = `https://couponfeed.co/feed/${id}`

    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (
        <div className="mainTH" >
          <div className="logo-container">
            <img src={this.state.url} alt=""></img>
          </div>
          <div className="title">
            Avalie e concorra!
          </div>
          <div className="steps">
            <div className="step">
              1.
              Aponte sua câmera para o QR code abaixo
              </div>
            <div className="step">
              2.
                  Faça uma avaliação em 30 segundos sobre a loja {this.state.name}
            </div>
            <div className="step">
              3.
              Nos ajude a melhorar e acumule pontos para trocar por produtos ou descontos
              </div>

          </div>
          <div className="qr" style={{ paddingLeft: '-5px' }}>
            <Demo link={link} />
          </div>
          {/* <div className="steps"> */}
            Não conseguiu acessar o QR code? Acesse <spam>https://couponfeed.co/f/{this.state.short_url}</spam>
            <div className="logo-container">
              <p><img src={cflogo} alt="" style={{ width: '350px' }} /></p>
              <p><FaHome /> https://couponfeed.co</p>
              <p><FaFacebook /> https://fb.com/couponfeed</p>
              <p><FaInstagram /> https://instagram.com/couponfeed</p>
            </div>
          {/* </div> */}


          {/* <div className="footer"> */}
          {/* <section className="ft-main"> */}
          {/* <div className="ft-main-item"> */}

          {/* </div> */}
          {/* </section> */}
          {/* </div> */}
        </div>
      );
    }
  }
}