import React, { Component } from 'react';

let timeouts = [];

function RPSIcon({ move }){
  // ==== RPS Move Schema ====
  // 0 => Rock
  // 1 => Paper
  // 2 => Scissors
  let classNames = "far";

  switch(move){
    case 0:
      classNames += " fa-hand-rock";
      break;
    case 1:
      classNames += " fa-hand-paper";
      break;
    case 2:
      classNames += " fa-hand-scissors";
      break;
    default:
      classNames += " fa-question-circle";
      break;
  }

  return <i className={classNames}></i>;
} // RPSIcon

function ScoreBoard({ me, computer, moveCount }){
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>{`You: ${me}`}</div>
      <div className="ml-2">{`Computer: ${computer}`}</div>
      <div className="ml-2">{`Round: ${moveCount}`}</div>
    </div>
  );
} // ScoreBoard

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
          <RPSIcon move={move}/>
        </button>)}
    </div>
  );
} // MoveSelector


class ComputerMove extends Component {

  state = {
    move: null,
  } // state

  static getDerivedStateFromProps(nextProps, prevState){

    const { startGame, initiated } = nextProps;

    if (!startGame && !initiated){
      return {
        move: null
      }
    }

    if (startGame && initiated){
      const move = Math.floor(Math.random()*3);
      return { move };
    }

    return {
      ...prevState
    }

  } // getDerivedStateFromProps

  componentDidUpdate(nextProps){
    nextProps.getComputersMove(this.state.move);
  } // componentDidUpdate

  render(){
    return this.props.children(this.state.move);
  } // render

} // ComputerMove

export default class RockPaperScissors extends Component {

  state = {
    me: 0,
    computer: 0,
    message: `Who will get 'X'? Best of two!`,
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

  componentDidUpdate(){
    // for every update we will check to see if a player won then route to actual tic-tac-toe game
    const { me, computer } = this.state;
    if (me === 2 || computer === 2){
      if (window.confirm(me === 2 ? 'You won!' : 'You lost! :(')){
         this.props.history.push(`/rock-paper-scissors&me=${me === 2? 'x' : 'o'}`)
      }
    }
  } // componentDidUpdate

  handleMoveSelection = myMove => {

    // 1. Let application know there was a initiated move
    this.setState({initiated: true}, () => {
      // 2. check to see if there is a winner or a tie
      const winner = this.tallyWinner(myMove, this.computersMove);

      if (winner === null){
        return this.setState(({ moveCount }) => ({
          moveCount: moveCount + 1,
          message: "Tie!",
          startGame: false
        }), () => timeouts.push(
          setTimeout(() => this.setState({
            initiated: false,
            message: ''
          }, () => this.setState({startGame: true})), 1500)
        ));
      } // if tie increment moveCount and return

      this.setState(({ moveCount }) => ({
        [winner]: this.state[winner] + 1,
        message: `${ winner === 'me' ? 'You' : 'Computer' } win${ winner === 'computer' ? 's' : ''}!`,
        startGame: false,
        moveCount: moveCount + 1
      }), () => timeouts.push(
        setTimeout(() => this.setState({
          initiated: false,
          message: ''
        }, () => this.setState({startGame: true})), 1500)
      ));
    });

  } // handleMoveSelection

  getComputersMove = computersMove => this.computersMove = computersMove;

  componentWillUnmount(){
    timeouts.forEach(timeout => clearTimeout(timeout));
  } // componentWillUnmount

  componentDidMount(){

    // This is to generate the computer dialogue before the match.
    timeouts.push(setTimeout(() => this.setState({message: '', startGame: true}), 200));

  } // componentDidMount

  render(){
    const { initiated, message, startGame, me, computer, moveCount } = this.state;
    return (
      <div
        style={{height: "100vh"}}
        className="container d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mb-3">Rock Paper Scissors</h2>
        <ScoreBoard
          moveCount={moveCount}
          me={me}
          computer={computer}/>
        <h2 className="text-center">{message}</h2>

        {/* Computer's Move Card */}
        <div>
          <ComputerMove
            getComputersMove={this.getComputersMove}
            startGame={startGame}
            initiated={initiated}>
            {move => (
              <div
                style={{width: "20rem"}}
                className="card d-flex justify-content-center align-items-center p-5">
                <div className="card-title">
                  <h3>Computer's Move:</h3>
                </div>
                <h3 className="display-2">
                  <RPSIcon move={move}/>
                </h3>
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
