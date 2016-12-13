import React from 'react';
import { IndexRoute, Route } from 'react-router';

import BandInfo from '../info/BandInfo'
import Home from '../Home'

import App from '../App'
import Intro from '../Intro'

export default <Route path="/" component={App}>
                    <IndexRoute component={Home} />
                    <Route path="intro" component={Intro} />
                    <Route path="band" component={BandInfo} />
                    <Route path="bio" component={BandInfo} />
                    <Route path="shows" component={BandInfo} />
                </Route>

