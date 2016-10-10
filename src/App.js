import React, {Component} from 'react';
import Player from './player/Player'
import Playlist from './menu/Playlist'
import BandInfo from './info/BandInfo'

import './App.css';

var Sunflower = require('./style/sunflowers.jpg');
var Jungle = require('./style/jungle.jpg');
var Music = require('./style/music.jpg');
var Concert = require('./style/concert.jpg');
var Soleil = require('./style/soleil.jpg');

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import {
    removeClassInBodyIfNeeded,
    toggleClassInBody
} from './utils/utils'

const wallpapers = [
    {img: Jungle, playerColor: "#607D8B"},
    {img: Music, playeCcolor: "#039BE5"},
    {img: Concert, playColor: "#00695C"},
    {img: Sunflower, playerColor: "#E65100"},
    {img: Soleil, playerColor: "#E65100"}
];

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

var images = [];

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: 2,
            index: 0,
            isNavbarFixed: false,
            wallpaper: {img: Sunflower, playerColor: "#E65100"},
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

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll.bind(this), false);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll.bind(this), false);
        this.preload([Sunflower, Jungle, Music, Concert, Soleil]);
        this.startPolling()
    }
    
    handleScroll(e) {

        let scrollTop = document.body.scrollTop;
        if(scrollTop > 60) {
            this.setState({isNavbarFixed: true})
        } else if(scrollTop < 151) {
            this.setState({isNavbarFixed: false})
        }
    }

    startPolling() {
        var self = this;
        setTimeout(function() {
            self.changeWallpaper(); // do it once and then start it up ...
            self._timer = setInterval(self.changeWallpaper.bind(self), 10000);
        }, 10000);
    }

    changeWallpaper() {
        let length = wallpapers.length;
        let index = this.state.index;
        if(index > length - 1) index = 0;
        let wallpaper = wallpapers[index];
        this.setState({
            wallpaper: wallpaper,
            index: index + 1
        })
    }

    preload(playlist) {
        for (let i = 0; i < playlist.length; i++) {
            images[i] = new Image();
            images[i].src = playlist[i]
        }
    }

    hideMenuIfNeeded() {
        removeClassInBodyIfNeeded('with--menu')
    }


    switchScreen() {
        if (this.state.screen === 1) {
            this.setState({screen: 2})
        } else {
            this.setState({screen: 1})
        }
    }

    renderBody() {

        if(this.state.screen === 1) {

            let background = {
                backgroundImage: "url(" + this.state.wallpaper.img + ")"
            };

            return  <div key="body-1" className="body-1" >
                        <div className="App-header" style={background} onClick={this.hideMenuIfNeeded.bind(this)}>
                            <h1>L'Atelier des Chansons</h1>
        
                            <i className="navigation-icon-right fa fa-2x fa-hand-o-right" aria-hidden="true" onClick={this.switchScreen.bind(this)}/>
                        </div>
                    </div>
        }

        return  <div ref="body2" key="body2" className="body-2" onDragStart={this.switchScreen.bind(this)}>
                    <i className="navigation-icon-left fa fa-2x fa-hand-o-left" aria-hidden="true" onClick={this.switchScreen.bind(this)}/>
                    <BandInfo isMenuFixed={this.state.isNavbarFixed}/>
                </div>

    }

    changeSong(track) {
        toggleClassInBody('with--menu')
        this.setState({currentTrack: track})
    }

    render() {
        
        let body = this.renderBody();

        return <div ref="App" className="App">
                    <ReactCSSTransitionGroup
                        className="body-container"
                        transitionName="body"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        {body}
                    </ReactCSSTransitionGroup>

                    <div className="player-wrapper">
                        <Player
                            color={this.state.wallpaper.playerColor}
                            track={this.state.currentTrack}
                            // onTrackEnd={this.nextSong.bind(this)}
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
