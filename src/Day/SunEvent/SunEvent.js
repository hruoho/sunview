import React, {Component} from 'react'
import './SunEvent.css'
import moment from 'moment'

const sunEventTitles = {
  nadir: 'Nadir',
  sunrise: 'Sunrise',
  solarNoon: 'Solar noon',
  sunset: 'Sunset',
  dawn: 'Dawn',
  dusk: 'Dusk'
}

class SunEvent extends Component {
  constructor (props) {
    super(props)
    this.event = sunEventTitles[this.props.type]
  }

  getRootClass () {
    let classes = ['sunEvent']
    if (this.props.isToday && this.props.isActive) { classes.push('active') }
    return classes.join(' ')
  }

  showSunEventTitle () {
    return sunEventTitles[this.props.type]
  }

  formatDiff (diff) {
    const fmt = diff > 0 ? '+mm:ss' : 'mm:ss'
    return diff.format(fmt, {trim: false})
  }

  render () {
    return (
      <div className={this.getRootClass()}>
        <p>{this.showSunEventTitle()}</p>
        <p className='eventDiff'>{this.props.isToday ? this.props.diff.current : ''}</p>
        <p className='eventMoment'>{moment(this.props.time).format('HH:mm:ss')}</p>
        <p className='eventDiff'>{this.formatDiff(this.props.diff.prev)}</p>
      </div>
    )
  }
}

export default SunEvent
