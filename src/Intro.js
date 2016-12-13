import React from 'react'


var latelier = require('./style/latelier.png');

class Intro extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return  <div className="intro-logo">

                    

                    <img width="15%" height="15%" src={latelier} alt="L'Atelier" />
                </div>
    }
}

export default Intro
