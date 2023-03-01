import React, { Component } from 'react'
import './Day.css'
import SunEvent from './SunEvent/SunEvent'
import moment from 'moment'
require('moment-duration-format')

var SunCalc = require('suncalc')

class Day extends Component {
  constructor (props) {
    super(props)
    this.sunEvents = ['sunrise', 'sunset', 'nadir', 'solarNoon']
    this.setTimes(props.date, props.coordinates)
    this.state = {
      now: moment()
    }
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillReceiveProps (props) {
    this.setTimes(props.date, props.coordinates)
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  getDayLength () {
    var sunrise = moment(this.eventTimes['sunrise'])
    var sunset = moment(this.eventTimes['sunset'])
    return moment.duration(sunset.diff(sunrise)).format('h [hrs] m [min]')
  }

  getDiff (type) {
    const eventTime = moment(this.eventTimes[type])
    const ydaEventTime = moment(this.ydaEventTimes[type])
    return {
      current: moment(this.state.now).to(eventTime),
      prev: moment.duration(eventTime.diff(ydaEventTime.add(1, 'days')))
    }
  }

  getNextEventIdx () {
    return this.sunEvents
      .map(event => moment(this.eventTimes[event]))
      .findIndex(event => event.isAfter(this.state.now))
  }

  getSunEvents () {
    return (<div className={'sunEvents'}>
      {this.sunEvents.map((type, index) => {
        return (
          <SunEvent
            key={index}
            type={type}
            time={this.getTimes(type)}
            diff={this.getDiff(type)}
            isToday={this.isToday(this.props.date)}
            isActive={this.isActive(index)}/>
        )
      })}
    </div>
    )
  }

  getTimes (type) {
    return this.eventTimes[type]
  }

  isActive (index) {
    return this.getNextEventIdx() === index
  }

  isToday (event) {
    if (!moment.isMoment(event)) event = moment(event)
    return event.isSame(this.state.now, 'day')
  }

  setTimes (date, { latitude, longitude }) {
    this.eventTimes = SunCalc.getTimes(date, latitude, longitude)
    this.ydaEventTimes = SunCalc.getTimes(moment(date).subtract(1, 'days'), latitude, longitude)
  }

  tick () {
    this.setState({
      now: moment()
    })
  }

  render () {
    return (
      <div className='Day'>
        <h1 className='text-center'>{this.props.date.format('ddd MMM DD, YYYY')}</h1>
        <h3 className='text-center'>Day length: {this.getDayLength()}</h3>
        {this.getSunEvents()}
      </div>
    )
  }
}

export default Day
