import React, { Component, PropTypes } from 'react'
import { withMediaPlayer, withMediaProps, withKeyboardControls, controls } from '../src/react-media-player'
import PlayPause from './PlayPause'
import MuteUnmute from './MuteUnmute'
import Repeat from './Repeat'

const { CurrentTime, Progress, SeekBar, Duration, Volume } = controls

const PrevTrack = (props) => (
  <svg width="10px" height="12px" viewBox="0 0 10 12" {...props}>
    <polygon fill="#FAFBFB" points="10,0 2,4.8 2,0 0,0 0,12 2,12 2,7.2 10,12"/>
  </svg>
)

const NextTrack = (props) => (
  <svg width="10px" height="12px" viewBox="0 0 10 12" {...props}>
    <polygon fill="#FAFBFB" points="8,0 8,4.8 0,0 0,12 8,7.2 8,12 10,12 10,0"/>
  </svg>
)

class MediaPlayer extends Component {
  _handlePrevTrack = () => {
    this.props.onPrevTrack()
  }

  _handleNextTrack = () => {
    this.props.onNextTrack()
  }

  _handleRepeatTrack = () => {
    this.props.onRepeatTrack()
  }

  render() {
    const { Player, vendor, keyboardControls, media, currentTrack, repeatTrack } = this.props
    const { isFullscreen, playPause } = media
    let classes = 'media-player'

    if (isFullscreen) {
      classes += ' media-player--fullscreen'
    }

    return (
      <div className={classes} onKeyDown={keyboardControls} tabIndex="0">
        <div className="media-player-element" onClick={() => playPause()}>
          {Player}
        </div>
        <div className="media-controls media-controls--full">
          <div className="media-row">
            <CurrentTime className="media-control media-control--current-time"/>
            {currentTrack}
            <Duration className="media-control media-control--duration"/>
          </div>
          <div className="media-control-group media-control-group--seek">
            <Progress className="media-control media-control--progress"/>
            <SeekBar className="media-control media-control--seekbar"/>
          </div>
          <div className="media-row">
            <div className="media-control-group">
              <MuteUnmute className="media-control media-control--mute-unmute"/>
            </div>
            <div className="media-control-group">
              <PrevTrack className="media-control media-control--prev-track" onClick={this._handlePrevTrack}/>
              <PlayPause className="media-control media-control--play-pause"/>
              <NextTrack className="media-control media-control--next-track" onClick={this._handleNextTrack}/>
            </div>
            <div className="media-control-group">
              <Repeat
                className="media-control media-control--repeat"
                isActive={repeatTrack}
                onClick={this._handleRepeatTrack}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withMediaPlayer(withKeyboardControls(MediaPlayer))
