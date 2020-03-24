import React,{Component} from 'react';
import '../assets/css/print-qr-code.css';
import QrCode from "qrcode.react";
import cflogo from "../assets/img/completa_fundo_claro@4x.png"
import cfescuro from "../assets/img/completa_fundo_escuro@4x.png"
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

  render(){
  const { id } = this.state
  console.log(id);
  const link = `https://couponfeed.co/feed/${id}`
  let name;
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
        <div className="logo-container">
          <div className="shape">
          <img src={cfescuro} alt=""></img>
          </div>
        </div>
        
      </div>
  );
}
}
