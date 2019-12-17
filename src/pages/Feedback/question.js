import React, { Component } from 'react';
import { QInput, ScoreButton, QuestionBox, PHigh, PSmall } from './styles'

export default class Question extends Component {
  state = {
    text: ''
  }

  render() {
    const { opening, quest, title } = this.props;
    let fields = null;
    if (quest.type === 'radio') {
      fields = quest.options.map(option =>
        <>
          <ScoreButton theme={option.color}
            key={option}
            onClick={() => this.props.onChange(option.value)}
            type="button"
          >{option.value}</ScoreButton>
        </>
      )
    } else if (quest.type === 'text') {
      fields = (
        <QuestionBox>
          <QInput>
            <input
              type="text"
              rows="5"
              placeholder="Digite sua opinião..."
              value={this.state.text}
              onChange={(e) => this.setState({ text: e.target.value })}
            />
          </QInput>
          <button
            className='btn'
            onClick={() => this.props.onChange(this.state.text)}
            type="button"
          >Enviar</button>
        </QuestionBox>
      )
    }

    return (<>
      <PHigh>{opening}</PHigh>
      <PSmall>{title}</PSmall>
      {fields}
    </>)

  }

} 