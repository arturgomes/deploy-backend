import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import '../../App.css';

import api from '../../services/api';
import Question from './question';
import Conclusion from './conclusion';

export default class Feedback extends Component {
  state = {
    opening: null,
    questions: [],
    nps: null,
    comment: null,
    finished: false,
    phone: null,
    error: null
  }


  handleNPS = async (answer) => {
    const { nps } = this.state;

    if (nps === null) {
      this.setState({
        nps: answer,
      }, () => { });
    }

  }

  handleComment = async (answer) => {
    const comm = answer;
    this.setState({
      finished: true,
      comment: comm

    }, () => { })

    const qs = decodeURIComponent(this.props.match.params.id);
    console.log(qs);
    await api.post(`/feed/${qs}/c`, {
      answers: {
        nps: this.state.nps,
        com: answer
      }
    }).then(response => this.setState({
      fid: response.data.fid
    }, () => { })).catch(error => {
      console.log(error.message);
    })
    // const fid = response.data.fid;
    // console.log(fid);
    // return response;

  }
  async componentDidMount() {
    const qs = decodeURIComponent(this.props.match.params.id);
    const response = await api.post(`/feed/${qs}/f`);
    if (!response.error) {
      const quest = response.data.questions;
      const ope = response.data.opening;
      // console.log(response)
      this.setState({
        questions: quest,
        opening: ope
      }, () => { });

    }
    else {
      this.setState({ error: "Loja não encontrada" })
    }
  }

  render() {

    if (!this.state.opening && !this.state.error) {
      return <FaSpinner color="#888" size={14} />

    }
    if (this.state.error) {
      return (<p>{this.state.error}</p>)
    }
    const { opening, finished, nps, questions } = this.state;
    let value = null;
    if (nps !== null) {
      if (nps >= 8) {
        value = questions[1].options[0].op
      }
      else if (nps < 8 && nps >= 6) {

        value = questions[1].options[1].op
      }
      else if (nps < 6) {

        value = questions[1].options[2].op
      }
    }
    // console.log(questions[0]);
    if (nps === null) {
      return (<Question
        opening={opening}
        quest={questions[0]}
        title={questions[0].question}
        onChange={this.handleNPS} />
      )
    } else if (!finished) {
      return (<Question
        opening={opening}
        quest={questions[1]}
        title={value}
        onChange={this.handleComment} />
      )
    }
    else {

      const { fid } = this.state;
      return <Conclusion fid={fid} />
    };
  }
}
