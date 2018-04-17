import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import StartMenu from './StartMenu';
import RockPaperScissors from './RockPaperScissors';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={StartMenu}/>
          <Route path='/rock-paper-scissors' component={RockPaperScissors}/>
          <Route path='/tic-tac-toe'/>
        </Switch>
      </div>
    );
  }
}

export default App;
