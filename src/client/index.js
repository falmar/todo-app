// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

// routes
import Routes from './../shared/Routes';

// import store reducers
import app from './../shared/store/app';

// misc
import {setAxiosInterceptors} from './../shared/utility/api';
import {checkToken} from './../shared/utility/auth';

// store middleware
const middleware = applyMiddleware(thunk, logger());

// store initial state
const initialState = {};

// create store
const store = createStore(app, initialState, middleware);

setAxiosInterceptors(store.dispatch, axios);

const render = () => {
  ReactDOM.render(
        <Provider store={store}>
            <Routes />
        </Provider>,
        document.getElementById('app')
    )
}

checkToken(store.dispatch).then(() => {
    render();
})
