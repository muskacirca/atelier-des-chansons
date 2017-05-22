import React from 'react'

import SmallPlayer from './player/SmallPlayer'
import Modal from './utils/Modal'
import axios from 'axios'
import Alert from './utils/Alert'
const $ = require('jquery');

import FileSaver from 'file-saver'

const latelier = require('./style/latelier.png');
const latelierJP = require('./style/latelier-japanese.png');
const atelierSakura = require('./style/atelier-sakura.png');
const playlist = [
    {
        url: "https://soundcloud.com/atelierdeschansons/amaranth",
        name: "Amaranth",
        author: "ATELIER"
    },
    {
        url: "https://soundcloud.com/atelierdeschansons/change-change",
        name: "Change Change",
        author: "ATELIER"
    },
    {
        url: "https://soundcloud.com/atelierdeschansons/your-eyes",
        name: "Your Eyes",
        author: "ATELIER"
    },
    // {
    //     url: "https://soundcloud.com/muskacirca/blowin-in-the-wind",
    //     name: "Blowin' in the Wind",
    //     author: "L'Atelier"
    // }
    // {
    //     url: "https://soundcloud.com/outofpeace/the-fall",
    //     name: "The Fall",
    //     author: "Out of Peace"
    // },
    // {
    //     url: "https://soundcloud.com/outofpeace/the-key-is-somewhere-else",
    //     name: "The Key is Somewhere Else",
    //     author: "Out of Peace"
    // },
    // {
    //     url: "https://soundcloud.com/djmadkat/kay-kessinger-kontakt",
    //     name: "Kontakt",
    //     author: "KAY KESSIINGER"
    // },
    //
    // {
    //     url: "https://soundcloud.com/djmadkat/double-m-kenun-kay-kessinger",
    //     name: "Double M Kenun",
    //     author: "KAY KESSIINGER"
    // }
];

import './intro.css'
class Intro extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            jpLogo: false,
            screen: 2,
            isNavbarFixed: false,
            currentTrack: playlist[0],
            playlist: playlist,
            modalOpen: false,
            index: 0
        }
    }

    componentDidMount() {
        this.startPolling()
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
        this.setState({currentTrack: track})
    }

    renderSongList(playlist) {
        return playlist.map(track => {

            let className = track.name === this.state.currentTrack.name ? "playlist-item-active" : "playlist-item";

            return  <div key={track.url}
                         className={"pointer " + className }
                         onClick={this.changeSong.bind(this, track)}>

                        <h5 className="">{track.name}</h5>
                        <em className="">{track.author}</em>
                    </div>
        })
    }

    renderModal() {
        return  <Modal
            isOpen={this.state.modalOpen}
            onSubmit={this.onModalSubmit.bind(this)}
            onClose={this.onModalClose.bind(this)}
        />
    }

    subscribe() {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    onModalClose() {
        this.setState({modalOpen: false})
    }

    saveContact(name, email) {


        console.log("saving contact : " + JSON.stringify(name));
        // return this.handleAuth(axios({
        //     url: '/rs/contact',
        //     method: 'POST',
        //     crossOrigin: true,
        //     type: 'json',
        //     data: 
        // }));


    axios.post('/rs/contact', {name: name, email: email})
        .then((response) => {
            console.log("save contact response: " + JSON.stringify(response.data))

            $('html, body').animate({scrollTop: '0px'}, 1000);
            this.setState({message: response.data})
        })
        .catch((response) => {
            console.log("save contact error response: " + JSON.stringify(response.data))
        })
        
    }

    handleAuth(loginPromise) {

        // eslint-disable-next-line
        return loginPromise
            .then((response) => {
                console.log("save contact response: " + JSON.stringify(response.data))

                $('html, body').animate({scrollTop: '0px'}, 1000);
                this.setState({message: response.data})
            })
    }

    onModalSubmit(name, email) {
       this.saveContact(name, email);
       this.setState({modalOpen: false})
    }

    startPolling() {
        var self = this;
        setTimeout(() => {
            self._timer = setInterval(self.changeLogo.bind(self), 20000);
        }, 20000);
    }

    changeLogo() {
        this.setState({
            jpLogo: !this.state.jpLogo
        })
    }

    onMessageAlertDismiss() {
        this.setState({message: null})
    }

    renderAlert() {
        
        if(this.state.message) {
            console.log("render alert")
            let alert = {
                type: this.state.message.success ? "success" : "danger",
                message: this.state.message.success ? "Welcome " + this.state.message.data.name : "An unexpected error occurred ... Please try again later"
            };
            return <Alert delay={10000} alert={alert} onDismiss={this.onMessageAlertDismiss.bind(this)}/>
        }
    }

    render() {

        let songs = this.renderSongList(playlist);
        let modal = this.renderModal();
        let alert = this.renderAlert();
        let logoPath = atelierSakura; //this.state.jpLogo ? latelierJP : latelier

        return  <div className="App-container">

                    <div className="page-info-1 primary-color">
                        <div className="intro-logo">
                            <img width="15%" src={logoPath} alt="L'Atelier" />
                        </div>
                        <div className="sub-menu-container">
                            <div>Hand</div>
                            <div>Crafted</div>
                            <div>Music</div>
                        </div>
                        <SmallPlayer
                            color="#E65100"
                            track={this.state.currentTrack}
                            onTrackEnd={this.nextSong.bind(this)}
                            onForward={this.nextSong.bind(this)}
                            onBackward={this.previousSong.bind(this)}
                            // location={this.props.location.pathname}
                        />
                    </div>
                    <div className="welcome-message">
                        {alert}
                    </div>
                    <div className="page-info-2">
                        <div className="info-container">
                            <h1>L'Atelier EP 2016</h1>
                            {songs}
                        </div>
                    </div>
                    <div className="follow-banner primary-color">
                        <div className="info-container">
                            <div>Follow us on :</div>
                            <div className="icon-content">
                                <a href="https://www.facebook.com/atelierdeschansons">
                                    <i className="fa fa-2x fa-facebook-official" aria-hidden="true"/>
                                </a>
                                <a href="https://soundcloud.com/user-29395467">
                                    <i className="fa fa-2x fa-soundcloud" aria-hidden="true" />
                                </a>
                                <a href="https://atelierdeschansons.bandcamp.com/">
                                    <i className="fa fa-2x fa-bandcamp" aria-hidden="true" />
                                </a>
                            </div>
                            <div className=" subscribe-button">
                                <div className="pointer inline-content"  onClick={this.subscribe.bind(this)}>
                                    <i className="fa fa-2x fa-sign-in" aria-hidden="true" />
                                    <strong >{' '}Subscribe</strong>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="page-info-2">
                        <div className="info-container">
                            <h1>Next Shows</h1>
                            <div className="info-item">
                                <p>Yerres France - 10/06/2017</p>
                                <p>Paris - 21/06/2017</p>
                            </div>
                        </div>
                    </div>

                    {modal}
                </div>
    }
}

export default Intro
