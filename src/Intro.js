import React from 'react'

import Player from './player/Player'
import SmallPlayer from './player/SmallPlayer'
import Playlist from './menu/Playlist'
import Modal from './utils/Modal'

import FileSaver from 'file-saver'

var latelier = require('./style/latelier.png');

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

import './intro.css'
class Intro extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: 2,
            isNavbarFixed: false,
            currentTrack: playlist[0],
            playlist: playlist,
            modalOpen: false,
            index: 0
        }
    }

    handleClick() {


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

    onModalSubmit(email) {

        var data = new Blob([email], {type: 'text/plain'});

        FileSaver.saveAs(data, "yo.txt");

        this.setState({modalOpen: false})
    }

    render() {

        let songs = this.renderSongList(playlist);
        let modal = this.renderModal();

        return  <div className="App-container">

                    <div className="page-info-1">
                        <div className="intro-logo">
                            <img width="15%" src={latelier} alt="L'Atelier" />
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
                    <div className="page-info-2">
                        <div className="info-container">
                            <h1>L'Atelier EP 2016</h1>
                            {songs}
                        </div>
                    </div>
                    <div className="follow-banner">
                        <div className="info-container">
                            <div>Follow us on :</div>
                            <div className="icon-content">
                                <i className="fa fa-2x fa-facebook-official" aria-hidden="true"/>
                                <i className="fa fa-2x fa-soundcloud" aria-hidden="true" />
                                <i className="fa fa-2x fa-bandcamp" aria-hidden="true" />
                            </div>
                            <div className="pointer subscribe-button" onClick={this.subscribe.bind(this)}>
                                <div className="inline-content">
                                    <i className="fa fa-2x fa-sign-in" aria-hidden="true" />
                                    <strong>{' '}Subscribe</strong>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="page-info-2">
                        <div className="info-container">
                            <h1>Next Shows</h1>
                            <div className="info-item">
                                <p>Café de la Plage, Paris France - 07/01/2017</p>
                            </div>
                        </div>
                    </div>

                    {modal}
                </div>
    }
}

export default Intro
