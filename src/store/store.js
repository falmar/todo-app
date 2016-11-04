// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import login from './reducers/login';

// middleware
const middleware = applyMiddleware(thunk, logger());

const store = createStore(combineReducers({login}), middleware);

export default store;

// window.store = store;
