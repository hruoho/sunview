import React, {Component} from 'react';
import './SunEvent.css';
import moment from 'moment';

class SunEvent extends Component {

  getActiveClass() {
    let classes = ['sunEvent', 'pure-g']
    if (this.props.isActive)
      classes.push('active')
    return classes.join(' ')
  }

  render() {
    return (<div className={this.getActiveClass()}>
      <div className="pure-u-1-3">
        <div className="eventType">
          <p>{this.props.type}</p>
        </div>
      </div>
      <div className="pure-u-2-3">
        <div className="eventMoments">
          <p className="eventMoment">{moment(this.props.time).format('HH:mm:ss')}</p>
          <p className="eventDiff">{this.props.diff}</p>
        </div>
      </div>
    </div>);
  }
}

export default SunEvent;
