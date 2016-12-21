import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/css/bootstrap.min.css'
import './style/css/font-awesome.min.css'
import Intro from './Intro'

import {
    Router,
    browserHistory
} from 'react-router'

import routes from './routes/routes'

// <Router history={browserHistory}
// routes={routes} />
ReactDOM.render(<Intro />, document.getElementById('root'));
