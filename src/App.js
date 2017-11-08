import React, { Component } from 'react';
import './App.css';
import Day from './Day/Day';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: moment(),
      loading: true
    }
  }

  componentDidMount() {
    // get current coordinates
    this.getCoordinatesAsync()
      .then((coordinates) => {
        this.setState({
          currentDate: this.state.currentDate,
          coordinates,
          loading: false
        })
      })
      .catch((error) => {
        console.error(error)
        this.setState({
          currentDate: this.state.currentDate,
          loading: false,
          error: true
        })
      })
  }

  getCoordinatesAsync() {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords)
        },
        (error) => {
          reject(error)
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true
        });    
    })
  }

  nextDay() {
    this.setState({
      currentDate: this.state.currentDate.add(1, 'days')
    })

  }

  prevDay() {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, 'days')
    })
  }

  today() {
      this.setState({
        currentDate: moment()
      })
  }

  render() {
    const loadingClasses = this.state.loading ? 'loading spinner pure-u-1' : 'spinner pure-u-1';

    return (
      <div className="App">
        {/* loading icon */}
        <div className={loadingClasses}></div>

        {/* main content */}
        {(!this.state.loading && !this.state.error) ?
          <div>
            <Day date={this.state.currentDate} coordinates={this.state.coordinates} />
            <div className="buttons">
              <button onClick={this.prevDay.bind(this)}>PREV</button>
              <button onClick={this.today.bind(this)}>TODAY</button>
              <button onClick={this.nextDay.bind(this)}>NEXT</button>

              <span>{this.state.currentDate.format('YYYY-MM-DD')}</span>
            </div>
          </div>
          : undefined
        }

        {/* error message */}
        {this.state.error ? <div className="error">Error occurred :(</div> : undefined}
      </div>
    );
  }
}

export default App;
