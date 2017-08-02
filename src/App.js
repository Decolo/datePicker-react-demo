import React, { Component } from 'react';
import DatePicker from './DatePicker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="date"/>
        <DatePicker/>
      </div>
    );
  }
}

export default App;
