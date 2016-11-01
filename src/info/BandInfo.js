import React from 'react'

import BandBio from './BandBio'
import Store from './Store'
import Shows from './Shows'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './BandInfo.css';
class BandInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTab: "Bio",
            isNavbarFixed: false
        }
    }


    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll.bind(this), false);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll.bind(this), false);
    }

    handleScroll(e) {

        let scrollTop = document.body.scrollTop;
        if(scrollTop > 60) {
            this.setState({isNavbarFixed: true})
        } else if(scrollTop < 151) {
            this.setState({isNavbarFixed: false})
        }
    }

    chooseRoute() {
        switch (this.state.selectedTab) {
            case "Bio":
                return <BandBio />;
            case "Store":
                return <Store />;
            case "Shows":
                return <Shows />
        }
    }

    handleMenuClick(route) {
        this.setState({selectedTab: route})
    }

    render() {

        let bandMenuClass = this.state.isNavbarFixed
                    ? "band-menu-fixed"
                    : "band-menu";
        
        let body = this.chooseRoute();

        return  <div>
                    <div className={bandMenuClass}>
                        <div className="band-menu-elt" onClick={this.handleMenuClick.bind(this, "Bio")}>Bio</div>
                        <div className="band-menu-elt" onClick={this.handleMenuClick.bind(this, "Shows")}>Shows</div>
                        <div className="band-menu-elt" onClick={this.handleMenuClick.bind(this, "Store")}>Store</div>
                    </div>
                    <div className="band-body">
                        <ReactCSSTransitionGroup
                            className="body-container"
                            transitionName="body"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>
                            
                            {body}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
    }
}

export default BandInfo
