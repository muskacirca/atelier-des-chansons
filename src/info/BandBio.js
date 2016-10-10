import React from 'react'

class BandBio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavbarFixed: false
        }
    }

    render() {

        return  <div ref="body2" key="body2" className="body-2">
                    <i className="navigation-icon-left fa fa-2x fa-hand-o-left" onClick={this.switchScreen.bind(this)}/>
                    <BandInfo isMenuFixed={this.state.isNavbarFixed}/>
                </div>

    }
}

export default BandBio