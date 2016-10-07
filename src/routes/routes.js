import React from 'react';
import { IndexRoute, Route } from 'react-router';

import BandInfo from '../info/BandInfo'

import App from '../App'

export default  <Route>
                    <Route path="/" component={App}>
                        <IndexRoute component={App} />
                        <Route path="/test" component={BandInfo} />
                    </Route>
                </Route>
