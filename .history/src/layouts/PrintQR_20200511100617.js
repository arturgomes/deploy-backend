import React, { Component } from 'react';
import '../assets/css/print-qr-code.css';
import QrCode from "qrcode.react";
import { FaHome, FaFacebook, FaInstagram } from "react-icons/fa";
import LinearProgress from '@material-ui/core/LinearProgress';

import cflogo from "../assets/img/completa_fundo_claro@4x.png"
import api from "../services/api";


class Demo extends Component {

  render() {
    return (
      <div>
        <QrCode size={400} renderAs='svg' value={this.props.link} />
      </div>
    );
  }
}

export default class PrintQR extends Component {

  state = {
    name: '',
    id: '',
    retail_id: '',
    isLoading: true,
    url: ''
  };

  async componentDidMount() {
    const qs = decodeURIComponent(this.props.match.params.id);
    await api.post(`/shopsl`, { shop_id: qs })
      .then(response => {
        const { retail_id, name, short_url } = response.data;
        this.setState({
          name,
          id: qs,
          short_url,
          retail_id
        }, () => { });
      }
      )
      .catch(error => this.setState({ error: "Loja não encontrada" }))

    await api.post(`/files/${this.state.retail_id}`)
      .then(res => {
        const { url } = res.data[0];
        this.setState({ url })
      })
      .catch(error => { console.log(error) });
      this.setState({isLoading: false });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { id } = '4141925a-e95a-44ac-9ab5-f63b5e7e1b8a';
    const link = `https://couponfeed.co/feed/${id}`
    const base_url = `https://couponfeed.co`


    if (this.state.isLoading) {
      return <LinearProgress />
    }
    else {
      return (
        <div className="main">
          <div className="logo-container">
            {/* {console.log(this.state.url)} */}
            <img src={this.state.url} alt=""></img>
          </div>
          <div className="title">
            Avalie e concorra!
          </div>
          <div className="steps">
            <div className="step">
              <span>1</span>
                  Aponte sua câmera para o QR code abaixo
              </div>
            <div className="step">
              <span>2</span>
                  Faça uma avaliação em 30 segundos sobre a loja {this.state.name}
              </div>
            <div className="step">
              <span>3</span>
                  Nos ajude a melhorar e acumule pontos para trocar por produtos ou descontos
              </div>

          </div>
          <div className="qr">
            <Demo link={link} />
          </div>
          <div className="txt-container">
            Não conseguiu acessar o QR code? Acesse https://couponfeed.co/f/{this.state.short_url}
          </div>
          <footer>
            <section className="ft-main">
              <div className="ft-main-item">
                <ul>
                  <li ><img src={cflogo} alt="" style={{ width: '240px' }} /></li>
                  <li><FaHome /> {base_url}</li>
                  <li><FaFacebook /> https://fb.com/couponfeed</li>
                  <li><FaInstagram /> https://instagram.com/couponfeed</li>
                </ul>
              </div>
            </section>
          </footer>
        </div>
      );
    }
  }
}