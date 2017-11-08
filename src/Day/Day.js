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
  }

  render() {
    return (
      <div className="Day">
      {
        ['nadir', 'sunrise', 'solarNoon', 'sunset'].map(type => <SunEvent type={type} times={this.times[type]}/>)
      }
      </div>
    );
  }
}

export default Day;
