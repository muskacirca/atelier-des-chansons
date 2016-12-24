import React from 'react'
import ReactPlayer from 'react-player'
import Modal from '../utils/Modal'
import FileSaver from 'file-saver'

import {
    toggleClassInBody
} from '../utils/utils'

import './Player.css';
class SmallPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            track: this.props.track,
            playing: false,
            volume: 0.8,
            played: 0,
            loaded: 0,
            duration: 0,
            isMenuOpen: false,
            modalOpen: false
        };

        this.playPause = this.playPause.bind(this);
        this.previousTrack = this.previousTrack.bind(this);
        this.nextTrack = this.nextTrack.bind(this);
        this.setVolume.bind(this);
        this.onSeekMouseDown.bind(this);
        this.onSeekChange.bind(this);
        this.onProgress.bind(this);
        this.onSeekMouseUp.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    componentWillReceiveProps(newprops) {
        if(newprops.track.url !== this.state.track.url) {
            this.setState({
                track: newprops.track,
                played: 0
            })
        }
    }

    playPause() {
        this.setState({ playing: !this.state.playing })
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
        this.setState({ seeking: false });
        this.refs.player.seekTo(parseFloat(e.target.value))
    }

    onProgress(status) {
        this.setState({
            played: status.played,
            buffered: status.buffered
        })
    }

    toggleMenu(e) {
        e.preventDefault();
        toggleClassInBody('with--menu')
    }


    onTrackEnd() {
        this.props.onTrackEnd();
        this.setState({played: 0})
    }

    computeTime(delta) {

        let minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        let seconds = delta % 60;
        seconds = Math.trunc(seconds);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return minutes + ":" + seconds
    }


    onBuffer() {
        console.log("onBuffer");
    }

    computeElapsedTime() {
        let yo = (this.state.duration * this.state.played) / 100;
        return  Math.trunc(yo * 100);
    }

    subscribe() {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    onModalClose() {
        this.setState({modalOpen: false})
    }

    onModalSubmit(email) {

        var data = new Blob([email], {type: 'text/plain'});

        FileSaver.saveAs(data, "yo.txt");
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        // if (textFile !== null) {
        //     window.URL.revokeObjectURL(textFile);
        // }
        //
        // textFile = window.URL.createObjectURL(data);

        // return textFile;


        this.setState({modalOpen: false})
    }

    renderModal() {
        return  <Modal
            isOpen={this.state.modalOpen}
            onSubmit={this.onModalSubmit}
            onClose={this.onModalClose}
        />
    }

    computePlayerConfig() {
        let screenWidth = window.innerWidth;
        let length = screenWidth > 750 ? 0 : 0;
        return {width: length, height: length}
    }

    computePlayerCommand() {

        let screenWidth = window.innerWidth;

        let length = screenWidth > 750 ? "fa-2x" : "";

        return {width: length, height: length}
    }

    previousTrack() {
        this.props.onBackward()
    }

    nextTrack() {
        this.props.onForward();
    }

    render() {

        const {
            soundcloudConfig,
            vimeoConfig,
            youtubeConfig,
            fileConfig
        } = this.state;

        let elapsedSeconds = this.computeElapsedTime();
        let elapsedTime = this.computeTime(elapsedSeconds);
        let time = this.computeTime(this.state.duration);
        
        let player = this.computePlayerConfig();

        return  <div className="small-player-container">
            <div className="player-command-container">

                <i className="pointer fa fa-step-backward" onClick={this.previousTrack} aria-hidden="true" />
                {this.state.playing ? <i className="pointer fa fa-2x fa-pause" onClick={this.playPause} aria-hidden="true"/>
                    : <i className="pointer fa fa-2x fa-play" onClick={this.playPause} aria-hidden="true" />}
                <i className="pointer fa fa-step-forward" onClick={this.nextTrack} aria-hidden="true" />
            </div>
            <div className="player-info">
                <div className="player-img">
                    <ReactPlayer
                        ref='player'
                        className='react-player'
                        width={player.width}
                        height={player.height}
                        url={this.state.track.url}
                        playing={this.state.playing}
                        volume={this.state.volume}
                        soundcloudConfig={soundcloudConfig}
                        vimeoConfig={vimeoConfig}
                        youtubeConfig={youtubeConfig}
                        fileConfig={fileConfig}
                        onDuration={duration => this.setState({ duration })}
                        onEnded={this.onTrackEnd.bind(this)}
                        onProgress={this.onProgress.bind(this)}
                        onBuffer={this.onBuffer.bind(this)}
                    />
                </div>

            </div>
        </div>
    }
}

// <div className="player-text">
//     {"playing "} <strong>{this.state.track.name}</strong>
// </div>

SmallPlayer.propTypes = {
    track: React.PropTypes.object,
    onForward: React.PropTypes.func,
    onBackward: React.PropTypes.func,
    onTrackEnd: React.PropTypes.func
};

export default SmallPlayer
