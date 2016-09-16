import React from 'react'
import ReactPlayer from 'react-player'

import './Player.css';
class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url: this.props.url,
            playing: true,
            volume: 0.8,
            played: 0,
            loaded: 0,
            duration: 0
        };

        this.playPause = this.playPause.bind(this);
        this.stop = this.stop.bind(this);
        this.setVolume.bind(this);
        this.onSeekMouseDown.bind(this);
        this.onSeekChange.bind(this);
        this.onProgress.bind(this);
        this.onSeekMouseUp.bind(this);
    }

    playPause() {
        this.setState({ playing: !this.state.playing })
    }

    stop() {
        this.setState({ url: null, playing: false })
    }

    setVolume(e) {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    onSeekMouseDown(e) {
        this.setState({ seeking: true })
    }

    onSeekChange(e) {
        this.setState({ played: parseFloat(e.target.value) })
    }

    onSeekMouseUp(e) {
        this.setState({ seeking: false })
        this.refs.player.seekTo(parseFloat(e.target.value))
    }

    onProgress() {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(this.state)
        }
    }

    render() {

        const {
            soundcloudConfig,
            vimeoConfig,
            youtubeConfig,
            fileConfig
        } = this.state;

        return  <div className="player-container" style={{backgroundColor: this.props.color}}>
                    <div className="player-img">
                        <ReactPlayer
                            ref='player'
                            className='react-player'
                            width={100}
                            height={100}
                            url={this.state.url}
                            playing={this.state.playing}
                            volume={this.state.volume}
                            soundcloudConfig={soundcloudConfig}
                            vimeoConfig={vimeoConfig}
                            youtubeConfig={youtubeConfig}
                            fileConfig={fileConfig}

                            onDuration={duration => this.setState({ duration })}
                        />
                    </div>
                    <div className="player-command-container">
                        <button className="btn btn-default btn-circle btn-lg" onClick={this.playPause}>
                            {this.state.playing ? <i className="fa fa-pause" aria-hidden="true"/> : <i className="fa fa-play" aria-hidden="true" />}
                        </button>
                    </div>
                    <div className="player-info">
                        <em>Atelier des Chansons</em><br />
                        <strong>Diamonds</strong>
                    </div>
                </div>
    }
}

export default Player


// onStart={() => console.log('onStart')}
// onPlay={() => this.setState({ playing: true })}
// onPause={() => this.setState({ playing: false })}
// onBuffer={() => console.log('onBuffer')}
// onEnded={() => this.setState({ playing: false })}
// onError={e => console.log('onError', e)}
// onProgress={this.onProgress}
