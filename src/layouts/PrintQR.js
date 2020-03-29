import React,{Component} from 'react';
import '../assets/css/print-qr-code.css';
import QrCode from "qrcode.react";
import { FaHome, FaFacebook, FaInstagram } from "react-icons/fa";

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
    name: null,
    id:null,
    isLoading: true
  };

  async componentDidMount() {
    const qs = decodeURIComponent(this.props.match.params.id);
    const response = await api.post(`/store/${qs}`);
    if (!response.error) {
      const {name} = response.data;
      // console.log(response)
      this.setState({
        name,
        id:qs
      }, () => { });
      // console.log("componentDidMount: ", this.state.questions);

    }
    else {
      this.setState({ error: "Loja não encontrada" })
    }
  }

    componentWillUnmount() {
      this._isMounted = false;
    }


   getrandom = () => {
      let text = "";
      const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for (let i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  }

  render(){
    const { id } = this.props.match.params;
    console.log(id);
    const link = `https://couponfeed.co/feed/${id}`

    return (
      <div className="main">
          <div className="logo-container">
            <img src={cflogo} alt=""></img>
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
                  Faça uma avaliação em 30 segundos
              </div>
              <div className="step">
                  <span>3</span>
                  Nos ajude a melhorar e acumule pontos para trocar por produtos ou descontos
              </div>
             
          </div>
          <div className="qr">
              <Demo link={link} />
          </div>
          {/* <div className="txt-container">
            Não conseguiu acessar o QR code? Acesse https://couponfeed.co/f/{this.getrandom()}
          </div> */}
          <footer>
            <section class="ft-main">
              <div class="ft-main-item">
                <ul>
                  <li ><img src={cflogo} alt="" style={{width:'240px'}}/></li>
                  <li><FaHome/> https://couponfeed.co</li>
                  <li><FaFacebook/> https://fb.com/couponfeed</li>
                  <li><FaInstagram/> https://instagram.com/couponfeed</li>
                </ul>
              </div>
            </section>
          </footer>
        </div>
    );
  }
}