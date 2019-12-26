import React, { Component } from 'react';
import { QInput, ScoreButton, QuestionBox, PHigh, PSmall } from './styles'
import { Button, Typography, TextField, ButtonGroup, Slider, Container } from "@material-ui/core";

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
          <Button
            size="small"
            style={{ backgroundColor: option.color, margin: '2px', maxWidth: '30px', maxHeight: '30px', minWidth: '25px', minHeight: '30px' }}
            key={option}
            onClick={() => this.props.onChange(option.value)}
            type="button"
          >{option.value}
          </Button>
        </>
      )
      return (<>{opening}
        <p>{quest.question}</p>
        <ButtonGroup orientation="horizontal" color="primary" aria-label="outlined primary button group" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}>
          {fields}
        </ButtonGroup>

      </ >)
    } else if (quest.type === 'text') {
      fields = (
        <Container maxWidth="sm" style={{ fontSize: '14px' }}>
          {/* <QInput> */}
          <TextField id="outlined-basic"
            value={this.state.text}
            multiline
            rowsMin={3}
            style={{ minWidth: '280px', marginTop: '10px' }}
            onChange={(e) => this.setState({ text: e.target.value })} label="descreva aqui em poucas palavras" variant="outlined" />
          {/* <input
              type="text"
              rows="5"
              placeholder="Digite sua opinião..."
              value={this.state.text}
              onChange={(e) => this.setState({ text: e.target.value })}
            /> */}
          {/* </QInput> */}
          <Button
            // className='btn'
            onClick={() => this.props.onChange(this.state.text)}
            style={{ marginTop: 16, marginBottom: 16 }}
            fullWidth
            variant="contained"
            color="primary"
          >Enviar</Button>
        </Container>
      )
      return (<>

        <Typography variant="body1" component="body1">
          {title}
        </Typography>
        {fields}
      </>)
    }



  }

} 