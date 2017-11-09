import React, { Component } from 'react'
import './App.css'
import Day from './Day/Day'
import moment from 'moment'
import Swipeable from 'react-swipeable'

const defaultCoordinates = {
  latitude: 60.1697334,
  longitude: 24.9489475
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentDate: moment(),
      loading: true
    }
  }



  async componentDidMount () {
    // get current coordinates
    if (process.env.NODE_ENV !== 'production') {
      return this.setState({
        coordinates: defaultCoordinates,
        loading: false
      })
    }

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

  getCoordinatesAsync () {
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
        })
    })
  }

  nextDay () {
    this.setState({
      currentDate: this.state.currentDate.add(1, 'days')
    })
  }

  prevDay () {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, 'days')
    })
  }

  today () {
    this.setState({
      currentDate: moment()
    })
  }

  getContent () {
    if (!this.state.loading && !this.state.error) {
      return (
        <div>
          <Day date={this.state.currentDate} coordinates={this.state.coordinates} />

          <div className='button-area button-area-left' onClick={this.prevDay.bind(this)}>
            <i className='fa fa-arrow-left' />
          </div>
          <div className='button-area button-area-right' onClick={this.nextDay.bind(this)}>
            <i className='fa fa-arrow-right' />
          </div>

          <button className='pure-button pure-button-primary bottom-right rounded-60' onClick={this.today.bind(this)}>
            <i className='fa fa-calendar-o' />
          </button>
        </div>
      )
    }
  }

  getLoader () {
    const loadingClasses = this.state.loading ? 'loading spinner pure-u-1' : 'spinner pure-u-1'
    return (
      <div className={loadingClasses} />
    )
  }

  getError () {
    if (this.state.error) {
      return (
        <div className='error'>Error occurred :(</div>
      )
    }
  }

  render () {
    return (
      <Swipeable onSwipedRight={this.prevDay.bind(this)} onSwipedLeft={this.nextDay.bind(this)} className='App'>
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
      </Swipeable>
    )
  }
}

export default App
