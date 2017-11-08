import React, { Component } from 'react';
import './SunEvent.css';
import moment from 'moment';

class SunEvent extends Component {

   render() {
      return (
        <div className="SunEvent">
          <div className="eventType">{this.props.type}</div>
          <div className="eventMoment">{moment(this.props.time).format('HH:mm:ss')}</div>
          <div className="eventDiff">{this.props.diff}</div>
        </div>
      );
    }
}

export default SunEvent;
