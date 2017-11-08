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
    this.sunEvents = ['nadir', 'sunrise', 'solarNoon', 'sunset']
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

  getActiveSunEventIndex() {
    return this.sunEvents.findIndex(event => moment(this.times[event]).isAfter(this.state.now))
  }

  getDiff(type) {
    const time = this.times[type]
    return moment(this.state.now).to(time)
  }
  
  getSunEvents() {
    return (
      this.sunEvents.map((type, index) => {
        return (
          <SunEvent
            key={index}
            type={type}
            time={this.getTimes(type)}
            diff={this.getDiff(type)}
            isActive={this.isActive(index)} />
        )
      })
    )
  }

  getTimes(type) {
    return this.times[type]
  }

  isActive(index) {
    return this.getActiveSunEventIndex() === index
  }

  tick() {
    this.setState({
      now: moment()
    });
  }

  render() {
    return (
      <div className="Day">
        {this.getSunEvents()}
      </div>
    );
  }
}

export default Day;
