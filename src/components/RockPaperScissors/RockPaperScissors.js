import React, { Component } from 'react';
import { parse } from 'query-string';

export default class RockPaperScissors extends Component {

  render(){
    const { players } = this.state;
    return (
      <div>
        <h2>players {players}</h2>
      </div>
    );
  } // render

} // RockPaperScissors
