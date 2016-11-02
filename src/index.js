import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/css/bootstrap.min.css'
import './style/css/font-awesome.min.css'

import {
    Router,
    browserHistory
} from 'react-router'

import routes from './routes/routes'


ReactDOM.render(<Router history={browserHistory}
                        routes={routes} />, document.getElementById('root'));
