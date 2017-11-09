import React, { Component } from 'react';
import './Day.css';
import SunEvent from './SunEvent/SunEvent';
import moment from 'moment';
require('moment-duration-format')

var SunCalc = require('suncalc')

class Day extends Component {
  constructor(props) {
    super(props)
    this.sunEvents = ['nadir', 'sunrise', 'solarNoon', 'sunset']
    this.setTimes(props.date, props.coordinates)
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

  componentWillReceiveProps(props) {
    this.setTimes(props.date, props.coordinates)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  getActiveSunEventIndex() {
    return this.sunEvents.findIndex(event => {
      event = moment(this.times[event])
      return event.isAfter(this.state.now)
    } )
  }

  // TODO move formatting to SunEvent
  getDiff(type) {
    const time = this.times[type]
    const prevTime = moment(this.prevTimes[type]).add(1, 'days')
    let prev = moment.duration(moment(time).diff(prevTime))
    let prevFmt = prev.format('mm:ss', {trim: false})
    return {
      current: moment(this.state.now).to(time),
      prev: prev >= 0 ? '+' + prevFmt : prevFmt
    }
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
            isToday={this.isToday(this.props.date)}
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

  isToday(event) {
    if (typeof event !== 'moment') event = moment(event)
    return event.isSame(this.state.now, 'day')
  }

  setTimes(date, { latitude, longitude }) {
    this.times = SunCalc.getTimes(date, latitude, longitude)
    this.prevTimes = SunCalc.getTimes(moment(date).subtract(1, 'days'), latitude, longitude)
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
