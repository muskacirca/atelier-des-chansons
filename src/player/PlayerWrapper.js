import React from 'react'
import Player from './Player'
import Playlist from '../menu/Playlist'

import {
    toggleClassInBody
} from '../utils/utils'

import tail from 'lodash/tail'

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

class PlayerWrapper extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentTrack: playlist[0],
            playlist: playlist
            
        };
    }

    changeSong(track) {
        toggleClassInBody('with--menu')
        this.setState({currentTrack: track})
    }

    onTrackEnd() {
        
        let newOrder = tail(this.state.playlist);
        newOrder.push(this.state.currentTrack);
        this.setState({
            playlist: newOrder,
            currentTrack: newOrder[0]
        })
    }
    
    render() {

        return  <div className="player-wrapper">
                    <Player
                        color={this.props.color}
                        track={this.state.currentTrack}
                        onTrackEnd={this.onTrackEnd.bind(this)}
                    />

                    <Playlist
                        playlist={this.state.playlist}
                        currentTrack={this.state.currentTrack}
                        handleChangeSong={this.changeSong.bind(this)}
                    />
                </div>
    }
}

export default PlayerWrapper
