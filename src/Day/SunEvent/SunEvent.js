import React, { Component } from 'react';
import './SunEvent.css';
import moment from 'moment';

class SunEvent extends Component {

    constructor(props) {
      super(props)
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

    getDiff() {
      return moment(this.state.now).to(this.props.time)
    }

    render() {
      return (
        <div className="SunEvent">
          <div className="eventType">{this.props.type}</div>
          <div className="eventMoment">{moment(this.props.time).format('HH:mm:ss')}</div>
          <div className="eventDiff">{this.getDiff()}</div>
        </div>
      );
    }
}

export default SunEvent;
