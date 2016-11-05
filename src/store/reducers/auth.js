// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

const initialState = {
  logged: false,
  user: {
    name: 'Guest'
  },
  scope: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        logged: true,
        user: action.payload
      };
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
}
