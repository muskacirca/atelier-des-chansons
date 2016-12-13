import React from 'react'

import {
    removeClassInBodyIfNeeded
} from './utils/utils'

var Sunflower = require('./style/sunflowers.jpg');
var Jungle = require('./style/jungle.jpg');
var Music = require('./style/music.jpg');
var Concert = require('./style/concert.jpg');
var Soleil = require('./style/soleil.jpg');

const wallpapers = [
    {img: Jungle, playerColor: "#607D8B"},
    {img: Music, playerColor: "#039BE5"},
    {img: Concert, playerColor: "#00695C"},
    {img: Sunflower, playerColor: "#E65100"},
    {img: Soleil, playerColor: "#E65100"}
];

var wallpaperImages = [];

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            wallpaper: {img: Sunflower, playerColor: "#E65100"}
        }
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        this.preload([Sunflower, Jungle, Music, Concert, Soleil]);
        this.startPolling()
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

    hideMenuIfNeeded() {
        removeClassInBodyIfNeeded('with--menu')
    }

    preload(playlist) {
        for (let i = 0; i < playlist.length; i++) {
            wallpaperImages[i] = new Image();
            wallpaperImages[i].src = playlist[i]
        }
    }

    render() {

        let background = {
            backgroundImage: "url(" + this.state.wallpaper.img + ")"
        };

        return  <div key="body-1" className="body-1" >
                    <div className="App-header" style={background} onClick={this.hideMenuIfNeeded.bind(this)}>
                        <h1>L'Atelier des Chansons</h1>
                        <img height="50%" src={latelier} alt="L'Atelier" />
                    </div>
                </div>

    }
}

export default Home
