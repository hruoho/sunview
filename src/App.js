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

  async componentDidMount() {
    // get current coordinates
    if (process.env.NODE_ENV !== 'production') return this.setState({
      currentDate: this.state.currentDate,
      coordinates: {
        latitude: 60.1697334,
        longitude: 24.9489475
      },
      loading: false
    })

    try {
      const coordinates = await this.getCoordinatesAsync()
      this.setState({
        currentDate: this.state.currentDate,
        coordinates,
        loading: false
      })
    } catch (error) {
      console.error(error)
      this.setState({
        currentDate: this.state.currentDate,
        loading: false,
        error: true
      })
    }
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
        <Day date={this.state.currentDate} coordinates={this.state.coordinates} />

        <div className="button-area button-area-left" onClick={this.prevDay.bind(this)}>
          <i className="fa fa-arrow-left"></i>
        </div>
        <div className="button-area button-area-right" onClick={this.nextDay.bind(this)}>
          <i className="fa fa-arrow-right"></i>
        </div>

        <button className="pure-button pure-button-primary bottom-right rounded-60" onClick={this.today.bind(this)}>
          <i className="fa fa-calendar-o"></i>
        </button>
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
