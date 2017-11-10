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
    const coords = await this.getCoordinates()

    this.setState({
      currentDate: this.state.currentDate,
      coordinates: coords,
      loading: false
    })
  }

  async getCoordinates () {
    let coords = defaultCoordinates
    try {
      var pos = await this.getCoordinatesAsync()
      coords = pos.coords
    } catch (err) {
      this.setState({
        error: true,
        errObj: err
      })
    }

    return coords
  }

  getCoordinatesAsync (opts) {
    opts = opts || {}
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        opts)
    })
  }

  getContent () {
    if (this.state.loading) return
    return (
      <div>
        <Day date={this.state.currentDate} coordinates={this.state.coordinates} />

        <div className='button-area button-area-left' onClick={this.goPrevDay.bind(this)}>
          <i className='fa fa-arrow-left animated infinite pulse' />
        </div>
        <div className='button-area button-area-right' onClick={this.goNextDay.bind(this)}>
          <i className='fa fa-arrow-right animated infinite pulse' />
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
        <div className='error'>Error occurred! Using default coordinates now.</div>
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
        },
        modal: false
      })
    }

    return (
      <Portal>
        <div id="modal-root">
          <div className="overlay" />
          <div className="modal-container">
            <form className="pure-form pure-form-aligned">
              <fieldset>
                <legend>Sijainti</legend>
                <div className="pure-control-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input id="longitude" type="text" className="longitude" defaultValue={long} onChange={changeLong} />
                </div>
                <div className="pure-control-group">
                  <label htmlFor="latitude">Longitude</label>
                  <input id="latitude" type="text" className="latitude" defaultValue={lat} onChange={changeLat} />
                </div>
                <div className="pure-controls">
                  <button type="button" className="pure-button pure-button-primary" onClick={acceptChanges}>OK</button>
                </div>
              </fieldset>
            </form>
            <i className="fa fa-times close button-top-right" onClick={this.toggleLocationScreen.bind(this)} />
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
