import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/css/bootstrap.min.css'
import './style/css/font-awesome.min.css'

import {
    Router,
    useRouterHistory
} from 'react-router'

import routes from './routes/routes'

import { createHashHistory } from 'history'

import { createHashHistory } from 'history'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(<Router history={appHistory}
                        routes={routes} />, document.getElementById('root'));
