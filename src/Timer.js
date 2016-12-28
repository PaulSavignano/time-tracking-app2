import React, { Component } from 'react';
import TimerActionButton from './TimerActionButton';
import helpers from './helpers';

class Timer extends Component {
  constructor() {
    super()
    this.state = {
      showControls: false,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
  }
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }
  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }
  handleStartClick() {
    this.props.onStartClick(this.props.id);
  }
  handleStopClick() {
    this.props.onStopClick(this.props.id);
  }
  handleTrashClick() {
    this.props.onTrashClick(this.props.id);
  }
  handleMouseEnter() {
    this.setState({
      showControls: true
    });
  }
  handleMouseLeave() {
    this.setState({
      showControls: false
    });
  }
  getControls() {
    return (
      <div className='extra content'>
        <span
          className='right floated edit icon'
          onClick={this.props.onEditClick}
        >
          <i className='edit icon'></i>
        </span>
        <span
          className='right floated trash icon'
          onClick={this.handleTrashClick}
        >
          <i className='trash icon'></i>
        </span>
      </div>
    )
  }
  render() {
    const elapsedString = helpers.renderElapsedString(
      this.props.elapsed, this.props.runningSince
    );
    const controls = this.state.showControls ? this.getControls() : null;
    return (
      <div
        className='ui centered card'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          {controls}
        </div>
        <TimerActionButton
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
    );
  }
}

export default Timer;
