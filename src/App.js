import React, {Component} from 'react';
import logo from './logo.svg';
import Player from './player/PlayerWrapper'
import './App.css';

var Sunflower = require('./style/sunflowers.jpg');
var Jungle = require('./style/jungle.jpg');
var Music = require('./style/music.jpg');
var Concert = require('./style/concert.jpg');

const wallpapers = [ {img: Jungle, playerColor: "#607D8B"}, {img: Music, playeCcolor: "#039BE5"},
    {img: Concert, playColor: "#00695C"}, {img: Sunflower, playerColor: "#E65100"}];
class App extends Component {



    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            wallpaper: {img: Sunflower, playerColor: "#E65100"}
        }
    }

    componentDidMount() {
        this.startPolling()
    }

    startPolling() {
        var self = this;
        setTimeout(function() {
            self.changeWallpaper(); // do it once and then start it up ...
            self._timer = setInterval(self.changeWallpaper.bind(self), 25000);
        }, 25000);
    }

    changeWallpaper() {
        let length = wallpapers.length;
        let index = this.state.index;
        if(index > length - 1) {
            console.log("first");
            index = 0;
        }
        let wallpaper = wallpapers[index];
        this.setState({
            wallpaper: wallpaper,
            index: index + 1
        })
    }


    render() {

        // Not working
        // let url = './style//sunflowers.jpg'
        let background = {
            backgroundImage: "url(" + this.state.wallpaper.img + ")"
        };

        return (
            <div className="App" >
                <div className="App-header" style={background}>
                    <h1>L'Atelier des Chansons</h1>

                </div>
                <Player color={this.state.wallpaper.playerColor}/>
                    
            </div>
        );
    }
}

export default App;
