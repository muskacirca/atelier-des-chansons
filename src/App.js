import React, {Component} from 'react';
import logo from './logo.svg';
import Player from './player/Player'
import './App.css';

var Sunflower = require('./style/sunflowers.jpg');
var Jungle = require('./style/jungle.jpg');

const wallpapers = [ Jungle, Sunflower]
class App extends Component {


    
    constructor(props) {
        super(props);
        
        this.state = {
            index: 0,
            wallpaper: Sunflower
        }
    }

    componentDidMount() {
        this.startPolling()
    }

    startPolling() {
        console.log("start polmling");
        var self = this;
        setTimeout(function() {
            self.changeWallpaper(); // do it once and then start it up ...
            self._timer = setInterval(self.changeWallpaper.bind(self), 15000);
        }, 15000);
    }
    
    changeWallpaper() {
        console.log("changingg wallpaper");
        let length = wallpapers.length;
        let index = this.state.index;
        if(index > length - 1) {
            console.log("first");
            index = 0;
        }
        let wallpaper = wallpapers[index]
        this.setState({
            wallpaper: wallpaper,
            index: index + 1
        })
    }


    render() {

        // Not working
        // let url = './style//sunflowers.jpg'
        let background = {
            backgroundImage: "url(" + this.state.wallpaper + ")"
        };

        return (
            <div className="App" >
                <div className="App-header" style={background}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>L'Atelier des Chansons</h2>

                </div>
                <Player url="https://soundcloud.com/muskacirca/diamonds"/>
            </div>
        );
    }
}

export default App;
