import React, {Component} from 'react';
import './SunEvent.css';
import moment from 'moment';

const evtDict = {
  nadir: 'Nadir',
  sunrise: 'Sunrise',
  solarNoon: 'Solar noon',
  sunset: 'Sunset'
}

class SunEvent extends Component {

  constructor(props) {
    super(props)
    this.event = evtDict[this.props.type]
  }

  getActiveClass() {
    let classes = ['sunEvent', 'pure-g']
    if (this.props.isToday && this.props.isActive)
      classes.push('active')
    return classes.join(' ')
  }

  getEvent() {
    return evtDict[this.props.type]
  }
  
  render() {
    return (
      <div className={this.getActiveClass()}>
        <div className="pure-u-1-2">
          <div className="eventType">
            <p>{this.getEvent()}</p>
            <p className="eventDiff">{this.props.isToday ? this.props.diff.current : ''}</p>
          </div>
        </div>
        <div className="pure-u-1-2">
          <div className="eventMoments">
            <p className="eventMoment">{moment(this.props.time).format('HH:mm:ss')}</p>
            <p className="eventDiff">{this.props.diff.prev}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SunEvent;
