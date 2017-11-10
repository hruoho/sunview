import React, {Component} from 'react'
import './SunEvent.css'
import moment from 'moment'

const evtDict = {
  nadir: 'Nadir',
  sunrise: 'Sunrise',
  solarNoon: 'Solar noon',
  sunset: 'Sunset'
}

class SunEvent extends Component {
  constructor (props) {
    super(props)
    this.event = evtDict[this.props.type]
    this.formattedDiff = this.formatDiff(props.diff.prev)
  }

  getRootClass () {
    let classes = ['sunEvent', 'pure-g']
    if (this.props.isToday && this.props.isActive) { classes.push('active') }
    return classes.join(' ')
  }

  displayEvent () {
    return evtDict[this.props.type]
  }

  formatDiff (diff) {
    var fmt = diff > 0 ? '+mm:ss' : 'mm:ss'
    return diff.format(fmt, {trim: false})
  }

  render () {
    return (
      <div className={this.getRootClass()}>
        <div className='pure-u-1-2'>
          <div className='eventType'>
            <p>{this.displayEvent()}</p>
            <p className='eventDiff'>{this.props.isToday ? this.props.diff.current : ''}</p>
          </div>
        </div>
        <div className='pure-u-1-2'>
          <div className='eventMoments'>
            <p className='eventMoment'>{moment(this.props.time).format('HH:mm:ss')}</p>
            <p className='eventDiff'>{this.formattedDiff}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SunEvent
