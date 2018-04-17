import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './StartMenu.css';

function PlayersSelector(){
  return (
    <div className="mt-5">
      <Link to='/rock-paper-scissors?players=1'>
        <h3 className="button">One-player</h3>
      </Link>
      <Link to='/rock-paper-scissors?players=2'>
        <h3 className="button">Two-player</h3>
      </Link>
    </div>
  );
} // PlayersSelector

export default class StartMenu extends Component {

  state = {
    start: false,
  } // state

  handleClick = () => this.setState(() => ({ start: true }));

  render(){
    const { start } = this.state;

    return (
      <div className="container-fluid viewport-centered">
        <h1 className="display-4">Tic-Tac-Toe</h1>
        {start
          ? <PlayersSelector />
          : <h2
              className="mt-5 button"
              onClick={this.handleClick}
              >Start</h2>}
      </div>
    );
  } // render

} // StartMenu
