import React, { Component } from 'react';
import './App.css';
import Navigation from './component/Navigation';
import Main from '../src/component/Main';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Main/>
      </div>
    );
  }
}

export default App;
