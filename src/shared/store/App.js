// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import {combineReducers} from 'redux';

// reducers
import auth from './reducers/auth';
import messages from './reducers/sys_message';
import todos from './reducers/todo';

// return reducers
export default combineReducers({auth, messages, todos});
