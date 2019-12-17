import React, { Component } from 'react';
import './App.css';
// import api from '../../services/api';
import Question from './question';

export default class Feedback extends Component {
  state = {
    answers: [],
    questions: [
      {
        qid: 'd3c64a66-1685-11ea-8d71-362b9e155667',
        type: 'radio',
        name: 'nps',
        jump: true,
        question: 'O quão satisfeito você está com nosso serviço de atendimento?',
        // (Se sua empresa está buscando melhorar o atendimento pós- venda, essa é uma boa pergunta a se fazer.)
        options: [
          { id: 0, value: 0, color: "#b72125", type: "detrator", text: ":(" },
          { id: 1, value: 1, color: "#d52027", type: "detrator", text: ":(" },
          { id: 2, value: 2, color: "#f05223", type: "detrator", text: ":(" },
          { id: 3, value: 3, color: "#f37022", type: "detrator", text: ":(" },
          { id: 4, value: 4, color: "#faa823", type: "detrator", text: ":(" },
          { id: 5, value: 5, color: "#ffca27", type: "detrator", text: ":(" },
          { id: 6, value: 6, color: "#ecdb12", type: "detrator", text: ":(" },
          { id: 7, value: 7, color: "#e8e73d", type: "neutro", text: ":|" },
          { id: 8, value: 8, color: "#c5d82e", type: "neutro", text: ":|" },
          { id: 9, value: 9, color: "#afd135", type: "promotor", text: ":)" },
          { id: 10, value: 10, color: "#65b64d", type: "promotor", text: ":)" }
        ]
      },
      {
        qid: 'd3c64cc8-1685-11ea-8d71-362b9e155667',
        type: 'radio',
        name: 'promotor',
        straightTo: 'comentario',
        question: 'Que legal! Qual a probabilidade de você recomendar a loja XYZ para um amigo ou parente que você goste ?',
        options: [
          { id: 4, value: 0, text: "0" },
          { id: 5, value: 1, text: "1" },
          { id: 6, value: 2, text: ".." },
          { id: 7, value: 10, text: "10" }
        ],

      },
      {
        qid: 'd3c64e1c-1685-11ea-8d71-362b9e155667',
        type: 'radio',
        name: 'neutro',
        straightTo: 'comentario',
        question: 'O que poderíamos fazer para tornar sua experiência como consumidor ainda melhor?',
        options: [
          { id: 8, value: 1, text: 'Mais simpatia' },
          { id: 9, value: 2, text: 'Mais atenção' },
          { id: 10, value: 3, text: 'Mais cordialidade' },
          { id: 11, value: 4, text: 'Mais disposição' },
        ],
      },
      {
        qid: 'd3c64f5c-1685-11ea-8d71-362b9e155667',
        type: 'radio',
        name: 'detrator',
        straightTo: 'comentario',
        condition: ["detrator", "neutro", "promotor"],
        question: 'O que você acha que faltou hoje no atendimento a você ?',
        options: [
          { id: 12, value: 1, text: 'Mais simpatia' },
          { id: 13, value: 2, text: 'Mais atenção' },
          { id: 14, value: 3, text: 'Mais cordialidade' },
          { id: 15, value: 4, text: 'Mais disposição' },
        ],
      },
      {
        qid: 'd3c65092-1685-11ea-8d71-362b9e155667',
        type: 'text',
        name: 'comentario',
        last: true,
        question: 'Gostaria de deixar algum comentário para nós sobre sua experiência hoje?', // coloca o texto ai
        options: [],
      },
    ],
    active: 0,
    finished: false
  }

  handleChange = (answer) => {
    const { active, questions, answers } = this.state;
    let next = null;

    if (questions[active].jump) {
      let currAnswer = questions[active].options.find(option => option.id === answer);
      questions.forEach((q, index) => {
        if (q.name === currAnswer.value)
          next = index;
      })
    }

    if (questions[active].straightTo) {
      questions.forEach((q, index) => {
        if (q.name === questions[active].straightTo)
          next = index;
      })
    }

    if (questions[active].last) {
      this.setState({
        finished: true,
        answers: this.state.answers.concat({
          qid: questions[active].qid,
          ans: answer
        })
      }, () => console.log(this.state.answers));

    } else {
      this.setState({
        active: next ? next : (active + 1),
        answers: answers.concat({
          qid: questions[active].qid,
          ans: answer
        })
      }, () => console.log(this.state.answers))
    }
  }

  render() {
    const { active, questions, finished } = this.state;
    return finished ? (
      <div>Fim... :D</div>
    ) : (<Question
      currentStep={active}
      quest={questions[active]}
      onChange={this.handleChange} />

      );
  }
}
