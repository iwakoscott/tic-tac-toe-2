import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import StartMenu from './StartMenu';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={StartMenu}/>
      </div>
    );
  }
}

export default App;
