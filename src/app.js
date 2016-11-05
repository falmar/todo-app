// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

// store
import store from './store/store';

// Views
import Main from './layout/Main';
import Home from './pages/Home';
import Login from './pages/Login';

// Container
import requireAuth from './containers/Auth';

const render = () => {
  ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route component={Main}>
                    <Route path='/' component={Home}/>
                    <Route path='/todos' component={requireAuth(Home)}/>
                    <Route path='/login' component={requireAuth(Login, false)}/>
                </Route>
            </Router>
        </Provider>,
        document.getElementById('app')
    )
}

render();
