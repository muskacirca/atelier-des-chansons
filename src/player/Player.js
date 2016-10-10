import React from 'react'
import ReactPlayer from 'react-player'
import Modal from '../utils/Modal'

import {
    toggleClassInBody
} from '../utils/utils'

import './Player.css';
class Player extends React.Component {

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
        console.log("closing");
        this.setState({modalOpen: false})
    }

    onModalSubmit(email) {
        console.log("email", JSON.stringify(email));
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
        let length = screenWidth > 750 ? 55 : 55;
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

    showLandscape() {
        this.context.router.push("/")
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
        
        let modal = this.renderModal();

        let player = this.computePlayerConfig();
        
        return  <div className="player-container" style={{backgroundColor: this.props.color}}>
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
                        <div className="player-text">
                            <em>{this.state.track.author}</em><br />
                            <strong>{this.state.track.name}</strong><br />
                            <span>{elapsedTime + " / " + time}</span>
                        </div>
                    </div>
                    <div className="pointer mobile-hide menu-right" onClick={this.subscribe}>
                        <div className="inline-content">
                            <i className="fa fa-2x fa-sign-in" aria-hidden="true" />
                            <strong>{' '}Subscribe</strong>
                        </div>
                    </div>
                    <div id="menu">
                        <i className="pointer fa fa-3x fa-globe" onClick={this.showLandscape()} />
                        <i className="pointer fa fa-3x fa-bars" onClick={this.toggleMenu} />
                    </div>
                    {modal}

        </div>
    }
}

Player.propTypes = {
    track: React.PropTypes.object,
    onForward: React.PropTypes.func,
    onBackward: React.PropTypes.func,
    onTrackEnd: React.PropTypes.func
};

Player.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Player
