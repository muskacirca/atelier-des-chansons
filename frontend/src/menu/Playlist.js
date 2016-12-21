import React from 'react'

import './Menu.css';
class Playlist extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeSong = this.onChangeSong
    }


    onChangeSong(track) {
        this.props.handleChangeSong(track)
    }

    renderSongList(playlist) {
        return playlist.map(track => {

            let className = track === this.props.currentTrack ? "playlist-item-active" : "playlist-item";

            return  <div key={track.url}
                         className={"pointer " + className }
                         onClick={this.onChangeSong.bind(this, track)}>

                        <h5 className="">{track.name}</h5>
                        <em className="">{track.author}</em>
                    </div>


        })
    }

    render() {

        let songs = this.renderSongList(this.props.playlist);

        return  <div className="menu-container">
                    <h3>Playlist</h3>
                    <div className="playlist-container">
                        {songs}
                    </div>
                </div>
    }
}

export default Playlist
