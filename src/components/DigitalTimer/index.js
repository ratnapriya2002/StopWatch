import {Component} from 'react'
import './index.css'
/* componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  tick = () => {
    this.setState({
      date: new Date()
    })
  }
  */

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeSeconds: 0,
    timeMinutes: 25,
    fixedTimeMinutes: 25,
    allowToChange: true,
  }

  onTimeControl = () => {
    this.timerID = setInterval(this.tick, 1000)
  }

  onTimerIncrement = () => {
    const {isTimerRunning, allowToChange} = this.state
    if (!isTimerRunning && allowToChange) {
      this.setState(prevState => ({
        fixedTimeMinutes: prevState.fixedTimeMinutes + 1,
        timeMinutes: prevState.fixedTimeMinutes,
      }))
      this.setState(prevState => ({
        timeMinutes: prevState.fixedTimeMinutes,
      }))
    }
  }

  onTimerDecrement = () => {
    const {isTimerRunning, allowToChange} = this.state
    if (!isTimerRunning && allowToChange) {
      this.setState(prevState => ({
        fixedTimeMinutes: prevState.fixedTimeMinutes - 1,
      }))
      this.setState(prevState => ({
        timeMinutes: prevState.fixedTimeMinutes,
      }))
    }
  }

  onReset = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.setState(prevState => ({
        timeMinutes: prevState.fixedTimeMinutes,
        timeSeconds: 0,
        allowToChange: !prevState.allowToChange,
      }))
    }
    this.onStartStop()
  }

  onStartStop = () => {
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.onTimeControl()
      this.setState(prevState => ({allowToChange: !prevState.allowToChange}))
    } else {
      clearInterval(this.timerID)
    }
  }

  tick = () => {
    const {timeSeconds, timeMinutes} = this.state
    if (timeMinutes <= 0 && timeSeconds <= 0) {
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      this.onReset()
      clearInterval(this.timerID)
    } else if (timeSeconds <= 0) {
      this.setState({timeSeconds: 60})
      this.setState(prevState => ({
        timeSeconds: prevState.timeSeconds - 1,
        timeMinutes: prevState.timeMinutes - 1,
      }))
    } else {
      this.setState(prevState => ({
        timeSeconds: prevState.timeSeconds - 1,
      }))
    }
  }

  render() {
    const {
      isTimerRunning,
      timeSeconds,
      timeMinutes,
      fixedTimeMinutes,
    } = this.state

    const text = isTimerRunning ? 'Pause' : 'Start'

    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    const icon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const altText = isTimerRunning ? 'pause icon' : 'play icon'

    const showMinutes = timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes

    const showSeconds = timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds

    return (
      <div className="main-content">
        <div className="main-bg-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="content">
            <div className="timer-container">
              <div className="time-content">
                <h1>{`${showMinutes}:${showSeconds}`}</h1>
                <p className="time-control-text">{timerStatus}</p>
              </div>
            </div>
            <div>
              <div className="timer-controllers">
                <button
                  type="button"
                  className="timer-controllers-sub"
                  onClick={this.onStartStop}
                >
                  <img src={icon} alt={altText} className="icon-size-style" />
                  <p className="time-control-text">{text}</p>
                </button>

                <button
                  type="button"
                  className="timer-controllers-sub"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon-size-style"
                  />
                  <p className="time-control-text">Reset</p>
                </button>
              </div>
              <div>
                <p className="time-control-text">Set Timer Limit</p>
              </div>
              <div className="button-controls">
                <button
                  type="button"
                  className="button-style-control"
                  onClick={this.onTimerDecrement}
                >
                  -
                </button>
                <div className="set-time-background">
                  <p>{fixedTimeMinutes}</p>
                </div>
                <button
                  type="button"
                  className="button-style-control"
                  onClick={this.onTimerIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
