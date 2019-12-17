import React, { Component } from 'react';
import { ScoreButton } from './styles';

export default class Question extends Component {
  state = {
    text: ''
  }

  render() {
    const { quest } = this.props;
    let fields = null;
    if (quest.type === 'radio') {
      fields = quest.options.map(option =>
        <>
          <ScoreButton theme={option.color}
            key={option}
            onClick={() => this.props.onChange(option.id)}
            type="button"
          >{option.value}</ScoreButton>
        </>
      )
    } else if (quest.type === 'text') {
      fields = (
        <p>
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
        </p>
      )
    }

    return (<>
      <p>{quest.question}</p>
      {fields}
    </>)

  }

} 