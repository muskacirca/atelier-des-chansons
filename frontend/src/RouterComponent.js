import React from 'react'

import {
    Router,
    browserHistory
} from 'react-router'

import routes from './routes/routes'


// , document.getElementById('root')

class RouterComponent extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        
        return  <Router history={browserHistory} routes={routes} />
    }
}

export default RouterComponent
