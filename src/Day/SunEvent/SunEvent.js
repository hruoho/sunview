import React, { Component } from 'react';
import './SunEvent.css';

class SunEvent extends Component {

  render() {
    return (
      <div className="SunEvent">
      Hello from SunEvent/{this.props.type}
      </div>
    );
  }
}

export default SunEvent;
