import React, { Component } from 'react';
import './Day.css';
import SunEvent from './SunEvent/SunEvent';
import moment from 'moment';

var SunCalc = require('suncalc')

class Day extends Component {
  constructor(props) {
    super(props)
    let latitude = 60.10
    let longitude = 24.56
    this.times = SunCalc.getTimes(moment(), latitude, longitude)
    this.state = {
      now: moment()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      now: moment()
    });
  }

  getDiff(type) {
    const time = this.times[type]
    return moment(this.state.now).to(time)
  }

  render() {
    return (
      <div className="Day">
      {
        ['nadir', 'sunrise', 'solarNoon', 'sunset'].map(type => <SunEvent type={type} time={this.times[type]} diff={this.getDiff(type)} />)
      }
      </div>
    );
  }
}

export default Day;
