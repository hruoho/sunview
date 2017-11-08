import React, { Component } from 'react';
import './App.css';
import Day from './Day/Day';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {currentDate: moment()}
  }

  nextDay() {
    this.setState({
      currentDate: this.state.currentDate.add(1, 'days')
    })

  }

  prevDay() {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, 'days')
    })
  }

  today() {
      this.setState({
        currentDate: moment()
      })
  }

  render() {
    return (
      <div className="App">
        <Day date={this.state.currentDate}/>
        <div className="buttons">
          <button onClick={this.prevDay.bind(this)}>PREV</button>
          <button onClick={this.today.bind(this)}>TODAY</button>
          <button onClick={this.nextDay.bind(this)}>NEXT</button>

          <span>{this.state.currentDate.format('YYYY-MM-DD')}</span>
        </div>
      </div>
    );
  }
}

export default App;
