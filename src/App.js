import React, { Component } from 'react'
import { Portal } from 'react-portal'
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

  getContent () {
    if (this.state.loading || this.state.error) return
    return (
      <div>
        <Day date={this.state.currentDate} coordinates={this.state.coordinates} />

        <div className='button-area button-area-left' onClick={this.goPrevDay.bind(this)}>
          <i className='fa fa-arrow-left' />
        </div>
        <div className='button-area button-area-right' onClick={this.goNextDay.bind(this)}>
          <i className='fa fa-arrow-right' />
        </div>

        <button className='pure-button pure-button-primary bottom-left rounded-60' onClick={this.toggleLocationScreen.bind(this)}>
          <i className='fa fa-location-arrow' />
        </button>

        <button className='pure-button pure-button-primary bottom-right rounded-60' onClick={this.goToday.bind(this)}>
          <i className='fa fa-calendar-o' />
        </button>
      </div>
    )
  }

  getError () {
    if (this.state.error) {
      return (
        <div className='error'>Error occurred :(</div>
      )
    }
  }

  getLoader () {
    const loadingClasses = this.state.loading ? 'loading spinner pure-u-1' : 'spinner pure-u-1'
    return (
      <div className={loadingClasses} />
    )
  }

  getModalPortal () {
    if (!this.state.modal) return

    let long = this.state.coordinates.longitude
    let lat = this.state.coordinates.latitude

    const changeLong = (e) => {
      long = parseFloat(e.target.value)
    }

    const changeLat = (e) => {
      lat = parseFloat(e.target.value)
    }

    const acceptChanges = () => {
      this.setState({
        coordinates: {
          longitude: long,
          latitude: lat
        }
      })
      this.toggleLocationScreen()
    }

    return (
      <Portal>
        <div id='modal-root'>
          <div className='overlay' />
          <div className='modal-container pure-g'>
            <h1 className='title pure-u-1'>Sijainti</h1>
            <div className='pure-u-1'>Longitude: <input type='text' className='longitude' defaultValue={long} onChange={changeLong} /></div>
            <div className='pure-u-1'>Latitude: <input type='text' className='latitude' defaultValue={lat} onChange={changeLat} /></div>
            <button className='pure-button pure-button-success' onClick={acceptChanges}>Ok</button>
          </div>
        </div>
      </Portal>
    )
  }

  goNextDay () {
    this.setState({
      currentDate: this.state.currentDate.add(1, 'days')
    })
  }

  goPrevDay () {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, 'days')
    })
  }

  goToday () {
    this.setState({
      currentDate: moment()
    })
  }

  toggleLocationScreen () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    return (
      <Swipeable onSwipedRight={this.goPrevDay.bind(this)} onSwipedLeft={this.goNextDay.bind(this)} className='App'>
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
        {
          /* location modal */
          this.getModalPortal()
        }
      </Swipeable>
    )
  }
}

export default App
