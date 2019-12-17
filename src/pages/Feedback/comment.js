import React, { Component } from 'react';
import { PHigh, PSmall } from './styles'

export default class Comment extends Component {
  state = {
    text: ''
  }

  render() {
    const { quest } = this.props;
    const fields = (<PSmall>
      <input
        type="text"
        placeholder="Digite sua sugestão"
        value={this.state.text}
        onChange={(e) => this.setState({ text: e.target.value })}
      />
      <button // vamo pro outro
        onClick={() => this.props.onChange(this.state.text)}
        type="button"
      >Enviar</button>
    </PSmall>
    )

    return (<>
      <PHigh>{quest.question}</PHigh>
      {fields}
    </>)

  }

} 