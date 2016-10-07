import React, {Component} from 'react';
import Player from './player/PlayerWrapper'
import BandInfo from './info/BandInfo'

import './App.css';

var Sunflower = require('./style/sunflowers.jpg');
var Jungle = require('./style/jungle.jpg');
var Music = require('./style/music.jpg');
var Concert = require('./style/concert.jpg');
var Soleil = require('./style/soleil.jpg');

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


import {
    removeClassInBodyIfNeeded
} from './utils/utils'

const wallpapers = [
    {img: Jungle, playerColor: "#607D8B"},
    {img: Music, playeCcolor: "#039BE5"},
    {img: Concert, playColor: "#00695C"},
    {img: Sunflower, playerColor: "#E65100"},
    {img: Soleil, playerColor: "#E65100"}
];

var images = new Array();

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: 2,
            index: 0,
            isNavbarFixed: false,
            wallpaper: {img: Sunflower, playerColor: "#E65100"}
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.preload([Sunflower, Jungle, Music, Concert, Soleil]);
        this.startPolling()
    }

    getDocHeight() {
        let D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    handleScroll(e) {

        let scrollTop = this.getDocHeight();
        console.log("scrollTop : " + JSON.stringify(scrollTop));
        if(scrollTop > 152) {
             console.log("scrolling height " + scrollTop);
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



        if(this.state.screen == 1) {

            let background = {
                backgroundImage: "url(" + this.state.wallpaper.img + ")"
            };
            
            return <div key="body-1" className="body-1" >
                <div className="App-header" style={background} onClick={this.hideMenuIfNeeded.bind(this)}>
                    <h1>L'Atelier des Chansons</h1>

                    <i className="navigation-icon-right fa fa-2x fa-hand-o-right" aria-hidden="true" onClick={this.switchScreen.bind(this)}/>
                </div>
            </div>
        }

        return <div key="body2" className="body-2" onDragStart={this.switchScreen.bind(this)}>
            <i className="navigation-icon-left fa fa-2x fa-hand-o-left" aria-hidden="true" onClick={this.switchScreen.bind(this)}/>
            <BandInfo isMenuFixed={this.state.isNavbarFixed}/>
        </div>

    }

    render() {


        let className = "App";
        // className = this.state.screen === 1
        //     ? className + " screen-1"
        //     : className + " screen-2";

        let body = this.renderBody();

        return <div className={className}>


                    <ReactCSSTransitionGroup
                        className="body-container"
                        transitionName="body"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        {body}
                    </ReactCSSTransitionGroup>

                    <Player color={this.state.wallpaper.playerColor} />
                </div>
    }

}

export default App;
