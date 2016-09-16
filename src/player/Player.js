import React from 'react'
import ReactPlayer from 'react-player'

import {
    toggleClassInBody
} from '../utils/utils'

import './Player.css';
class Player extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            track: this.props.track,
            playing: true,
            volume: 0.8,
            played: 0,
            loaded: 0,
            duration: 0,
            
            isMenuOpen: false
        };

        this.playPause = this.playPause.bind(this);
        this.stop = this.stop.bind(this);
        this.setVolume.bind(this);
        this.onSeekMouseDown.bind(this);
        this.onSeekChange.bind(this);
        this.onProgress.bind(this);
        this.onSeekMouseUp.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this)
    }
    
    componentWillReceiveProps(newprops) {
        if(newprops.track.url !== this.state.track.url) {
            this.setState({track: newprops.track})
        }
    }

    playPause() {
        this.setState({ playing: !this.state.playing })
    }

    stop() {
        this.setState({ track: {}, playing: false })
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

    toggleMenu(e) {
        e.preventDefault();
        toggleClassInBody('with--menu')
    }


    onTrackEnd() {
        this.props.onTrackEnd();
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
                            url={this.state.track.url}
                            playing={this.state.playing}
                            volume={this.state.volume}
                            soundcloudConfig={soundcloudConfig}
                            vimeoConfig={vimeoConfig}
                            youtubeConfig={youtubeConfig}
                            fileConfig={fileConfig}
                            onDuration={duration => this.setState({ duration })}
                            onEnded={this.onTrackEnd.bind(this)}
                        />
                    </div>
                    <div className="player-command-container">
                        <button className="btn btn-default btn-circle btn-lg" onClick={this.playPause}>
                            {this.state.playing ? <i className="fa fa-pause" aria-hidden="true"/> : <i className="fa fa-play" aria-hidden="true" />}
                        </button>
                    </div>
                    <div className="player-info">
                        <em>{this.state.track.author}</em><br />
                        <strong>{this.state.track.name}</strong>
                    </div>
                    <div id="menu"  className="pointer" onClick={this.toggleMenu}>
                        <i className="fa fa-3x fa-bars" aria-hidden="true" />
                    </div>
                    
        </div>
    }
}

Player.propTypes = {
    track: React.PropTypes.object
};


export default Player


// onStart={() => console.log('onStart')}
// onPlay={() => this.setState({ playing: true })}
// onPause={() => this.setState({ playing: false })}
// onBuffer={() => console.log('onBuffer')}
// onEnded={() => this.setState({ playing: false })}
// onError={e => console.log('onError', e)}
// onProgress={this.onProgress}
