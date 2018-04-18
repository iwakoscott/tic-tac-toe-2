import React, { Component } from 'react';

function getRPSIcon(move){
  // ==== RPS Move Schema ====
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

function MoveSelector({ handleMoveSelection, disabled }){
  const moves = [0, 1, 2];
  return (
    <div className="btn-group">
      {moves.map(move =>
        <button
          disabled={disabled}
          onClick={() => handleMoveSelection(move)}
          key={move}
          className="btn btn-outline-dark btn-lg">
          {getRPSIcon(move)}
        </button>)}
    </div>
  );
} // MoveSelector


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
    initiated: false,
    myMove: null,
    computersMessage: `Who will get 'X'?`,
    startGame: false,
  } // state

  handleMoveSelection = myMove => this.setState(() => ({ myMove, initiated: true }));

  componentDidMount(){

    setTimeout(() => this.setState(() => ({
      computersMessage: 'Best two out of three!',
      startGame: true
    })), 3000);

  } // componentDidMount

  render(){
    const { initiated, computersMessage, startGame } = this.state;

    return (
      <div
        style={{height: "100vh"}}
        className="container d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-5 display-4">Rock Paper Scissors</h2>
        <h2 className="text-center mb-5 display-5">{computersMessage}</h2>

        {/* Computer's Move Card */}
        <div>
          <ComputerMove>
            {move => (
              <div
                style={{width: "20rem"}}
                className="card d-flex justify-content-center align-items-center p-5">
                <h3 className="display-2">{!initiated || move === null ? `?` : getRPSIcon(move)}</h3>
              </div>
            )}
          </ComputerMove>
        </div>

        {/* My Moves Selectors */}
        <div className="d-flex justify-content-center align-items-center mt-5">
          <MoveSelector
            handleMoveSelection={this.handleMoveSelection}
            disabled={!startGame}/>
        </div>

      </div>
    );
  } // render

} // RockPaperScissors
