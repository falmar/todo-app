// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// reducers
import auth from './reducers/auth';
import messages from './reducers/sys_message';
import todos from './reducers/todo';

// middleware
const middleware = applyMiddleware(thunk, logger());

// initial state
const initialState = {};

const store = createStore(combineReducers({auth, messages, todos}), initialState, middleware);

export default store;

// window.store = store;
