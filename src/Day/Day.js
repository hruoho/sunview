import React, { Component } from 'react';
import './Day.css';
import SunEvent from './SunEvent/SunEvent';
import SunCalc from 'suncalc';
import moment from 'moment';

class Day extends Component {
  render() {
    return (
      <div className="Day">
      {
        ['nadir', 'sunrise', 'solarNoon', 'sunset'].map(type => <SunEvent type={type}/>)
      }
      </div>
    );
  }
}

export default Day;
