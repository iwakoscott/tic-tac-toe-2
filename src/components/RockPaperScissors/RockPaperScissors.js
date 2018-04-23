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
      return <i className="far fa-question-circle"></i>;
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
    startGame: true,
    initiated: false,
  } // state

  static getDerivedStateFromProps(nextProps, prevState){
    const move = Math.floor(Math.random()*3);
    const { startGame, initiated } = nextProps;
  
    return startGame === prevState.startGame
      ? {...prevState}
      : { move, startGame, initiated }

  } // getDerivedStateFromProps

  componentDidUpdate(nextProps){
    nextProps.getComputersMove(this.state.move);
  } // componentDidUpdate

  render(){
    const { move, initiated } = this.state;
    return this.props.children(initiated ? move : null);
  } // render

} // ComputerMove

export default class RockPaperScissors extends Component {

  state = {
    me: 0,
    computer: 0,
    message: `Who will get 'X'? Best two out of three!`,
    startGame: false,
    moveCount: 0,
    initiated: false,
  } // state

  tallyWinner = (myMove, computerMove) => {
    // Rock Paper Scissors Schema
    // Rock: 0, Paper: 1, Scissors: 2
    // 1 beats 0
    // 2 beats 1
    // 0 beats 2

    // there is a tie
    if (myMove === computerMove) { return null };

    const sum = myMove + computerMove;
    switch(sum){
      case 1:
        return myMove === 1 ? 'me' : 'computer';
      case 2:
        return myMove === 0 ? 'me' : 'computer';
      case 3:
        return myMove === 2 ? 'me' : 'computer';
    }

  } // tallyWinner

  handleMoveSelection = myMove => {

    // 1. let application know user initiated a move
    this.setState({initiated: true}, () => {

      // 2. check to see if there is a winner or a tie
      const winner = this.tallyWinner(myMove, this.computersMove);

      if (winner === null){
        return this.setState(({ moveCount }) => ({
          moveCount: moveCount + 1,
          message: "Tie!",
          startGame: false
        }));
      } // if tie increment moveCount and return

      this.setState(({ moveCount }) => ({
        [winner]: this.state[winner] + 1,
        message: `${ winner === 'me' ? 'You' : 'Computer' } win${ winner === 'computer' ? 's' : ''}!`,
        startGame: false,
        moveCount: moveCount + 1
      }), () => setTimeout(() => this.setState({ startGame: true, initiated: false }), 2000));

    });

  } // handleMoveSelection

  getComputersMove = computersMove => this.computersMove = computersMove;

  componentDidMount(){

    // This is to generate the computer dialogue before the match.
    setTimeout(() => this.setState({message: '', startGame: true}), 200);

  } // componentDidMount

  render(){
    const { initiated, message, startGame } = this.state;
    return (
      <div
        style={{height: "100vh"}}
        className="container d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Rock Paper Scissors</h2>
        <h2 className="text-center">{message}</h2>

        {/* Computer's Move Card */}
        <div>
          <ComputerMove getComputersMove={this.getComputersMove} startGame={startGame} initiated={initiated}>
            {move => (
              <div
                style={{width: "20rem"}}
                className="card d-flex justify-content-center align-items-center p-5">
                <div className="card-title">
                  <h3>Computer's Move:</h3>
                </div>
                <h3 className="display-2">{getRPSIcon(move)}</h3>
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
