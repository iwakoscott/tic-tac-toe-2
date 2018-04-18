import React, { Component } from 'react';
import { parse } from 'query-string';

function getRPSIcon(move){
  // ==== Computer Move Schema ====
  // 0 => Rock
  // 1 => Paper
  // 2 => Scissors
  switch(move){
    case 0:
      return <i className="far fa-hand-rock"></i>;
    case 1:
      return <i className="far fa-hand-paper"></i>;
    case 2:
      return <i className="far fa-hand-scissors"></i>;
    default:
      return null;
  }
} // getRPSIcon


class ComputerMove extends Component {

  state = {
    move: null,
  } // state

  componentDidMount(){
    const move = Math.floor(Math.random()*3);
    this.setState(() => ({ move }));
  } // componentDidMount

  render(){
    return this.props.children(this.state.move);
  } // render

} // ComputerMove

export default class RockPaperScissors extends Component {

  state = {
    initiated: true,
  }

  render(){
    const { initiated } = this.state;

    return (
      <div className="container">
        <h2 className="text-center">Rock Paper Scissors</h2>
        <ComputerMove>
          {move => (
            <div className="row">
              <div className="col-sm-4 offset-sm-4">
                <div
                  className="card d-flex flex-column justify-content-center align-items-center p-5">
                  <h3 className="display-2">{!initiated || move === null ? `?` : getRPSIcon(move)}</h3>
                </div>
              </div>
            </div>
          )}
        </ComputerMove>

      </div>
    );
  } // render

} // RockPaperScissors
