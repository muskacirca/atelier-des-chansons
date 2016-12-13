import React from 'react'

var latelier = require('./style/latelier.png');

class Intro extends React.Component {

    handleClick() {

        
    }
    
    render() {
        return  <div className="pointer intro-logo" onClick={this.handleClick.bind(this)}>
                    <img width="15%" height="15%" src={latelier} alt="L'Atelier" />
                </div>
    }
}

export default Intro
