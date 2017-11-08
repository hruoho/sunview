import React, { Component } from 'react';
import './SunEvent.css';
import moment from 'moment';

class SunEvent extends Component {

    constructor(props) {
      super(props)
      this.time = moment(props.times)
    }

    getDiff() {
      return moment().diff(this.time)
    }

    render() {

      return (
        <div className="SunEvent">
          <div>Type: {this.props.type}</div>
          <div>At: {moment(this.props.times).format('HH:mm:ss')}</div>
          <div>Diff: {this.getDiff()}</div>
        </div>
      );
    }
}

export default SunEvent;
