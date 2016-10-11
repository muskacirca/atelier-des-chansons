import React, {Component} from 'react';
import Player from './player/Player'
import Playlist from './menu/Playlist'

import './App.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
    toggleClassInBody
} from './utils/utils'

const playlist = [
    {
        url: "https://soundcloud.com/muskacirca/diamonds",
        name: "Diamonds",
        author: "Atelier des Chansons"
    },
    {
        url: "https://soundcloud.com/muskacirca/mr-tambourine-man",
        name: "Tambourine Man",
        author: "Atelier des Chansons"
    },
    {
        url: "https://soundcloud.com/muskacirca/blowin-in-the-wind",
        name: "Blowin' in the Wind",
        author: "Atelier des Chansons"
    },
    {
        url: "https://soundcloud.com/outofpeace/the-fall",
        name: "The Fall",
        author: "Out of Peace"
    },
    {
        url: "https://soundcloud.com/outofpeace/the-key-is-somewhere-else",
        name: "The Key is Somewhere Else",
        author: "Out of Peace"
    },
    {
        url: "https://soundcloud.com/djmadkat/kay-kessinger-kontakt",
        name: "Kontakt",
        author: "KAY KESSIINGER"
    },

    {
        url: "https://soundcloud.com/djmadkat/double-m-kenun-kay-kessinger",
        name: "Double M Kenun",
        author: "KAY KESSIINGER"
    }
];

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: 2,
            isNavbarFixed: false,
            currentTrack: playlist[0],
            playlist: playlist
        }
    }

    nextSong() {
        let index1 = this.state.index === playlist.length - 1
            ? 0
            : this.state.index + 1;

        this.setState({
            currentTrack: playlist[index1],
            index: index1
        })
    }

    previousSong() {
        let index2 = this.state.index === 0
            ? playlist.length - 1
            : this.state.index - 1;

        this.setState({
            currentTrack: playlist[index2],
            index: index2
        })
    }

    changeSong(track) {
        toggleClassInBody('with--menu');
        this.setState({currentTrack: track})
    }

    render() {

        return <div ref="App" className="App">
                    <ReactCSSTransitionGroup
                        className="body-container"
                        transitionName="body"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })}
                    </ReactCSSTransitionGroup>



                <div className="player-wrapper">
                    <Player
                        color="#E65100"
                        track={this.state.currentTrack}
                        onTrackEnd={this.nextSong.bind(this)}
                        onForward={this.nextSong.bind(this)}
                        onBackward={this.previousSong.bind(this)}
                    />
                </div>

                <Playlist
                        playlist={this.state.playlist}
                        currentTrack={this.state.currentTrack}
                        handleChangeSong={this.changeSong.bind(this)}
                    />
                </div>
    }

}

export default App;
