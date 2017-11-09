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
    if (process.env.NODE_ENV !== 'production') return this.setState({
      currentDate: this.state.currentDate,
      coordinates: {
        latitude: 60.1697334,
        longitude: 24.9489475
      },
      loading: false
    })

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

  getContent() {
    if (this.state.loading || this.state.error) return;
    return (
      <div>
        <h1 className="text-center">{this.state.currentDate.format('ddd MMM DD, YYYY')}</h1>
        <Day date={this.state.currentDate} coordinates={this.state.coordinates} />

        <button className="button-area button-area-left" onClick={this.prevDay.bind(this)}>PREV</button>
        <button className="button-area button-area-right" onClick={this.nextDay.bind(this)}>NEXT</button>

        <div className="buttons">
          <button className="pure-button m-auto" onClick={this.today.bind(this)}>TODAY</button>
        </div>
      </div>
    )
  }

  getLoader() {
    const loadingClasses = this.state.loading ? 'loading spinner pure-u-1' : 'spinner pure-u-1';
    return (
      <div className={loadingClasses}></div>
    )
  }

  getError() {
    if (!this.state.error) return;
    return (
      <div className="error">Error occurred :(</div>
    )
  }

  render() {
    return (
      <div className="App">
        {
          /* loading icon */
          this.getLoader()
        }
        {
          /* main content */
          this.getContent()
        }
        {
          /* error message */
          this.getError()
        }
      </div>
    );
  }
}

export default App;
