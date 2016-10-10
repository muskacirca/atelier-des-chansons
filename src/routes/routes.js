import React from 'react';
import { IndexRoute, Route } from 'react-router';

import BandInfo from '../info/BandInfo'
import Home from '../Home'

import App from '../App'


export default <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="band" component={BandInfo} />
                </Route>

