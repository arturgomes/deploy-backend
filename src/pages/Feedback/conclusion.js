import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PHigh, PSmall } from './styles'

export default class Conclusion extends Component {
  render() {

    return (<>
      <PHigh>Obrigado! Pela sua participação, você acumulou 1 FeedCoin.</PHigh>
      <PSmall> Faça login ou se cadastre agora mesmo para começar a coletar pontos. Quanto mais feedbacks você der, mais chances você tem de ganhar prêmios e descontos!</PSmall>
      <form>
        <label htmlFor=""></label>
        <Link to={`/signup/${this.props.fid}`}>
          <button className='btn'>
            Cadastre-se e acumule FeedCoins!
          </button>
        </Link>
        <Link to={`/auth/${this.props.fid}`}>
          <button className='btn1'>
            Fazer login
          </button>
        </Link>
      </form>
    </>)

  }

}
