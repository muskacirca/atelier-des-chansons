import React from 'react'
import Player from './Player'
import Playlist from '../menu/Playlist'

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
    }
];

class PlayerWrapper extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            currentTrack: playlist[4]
        };



    }    
    
    changeSong(track) {
        console.log("track : " + JSON.stringify(track));
        this.setState({currentTrack: track})
    }
    

    render() {
        
        return  <div>
                    <Player color={this.props.color} track={this.state.currentTrack} />

                    <Playlist playlist={playlist} handleChangeSong={this.changeSong.bind(this)}/>
                </div>
    }
}

export default PlayerWrapper
