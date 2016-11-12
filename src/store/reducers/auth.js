// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/auth';

const initialState = {
  loading: false,
  logged: false,
  user: {
    name: 'Guest'
  },
  scope: [],
  token: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.SIGN_UP_PENDING:
        return {
            ...state,
            loading: true
        }
    case types.SIGN_UP_FULFILLED:
    case types.SIGN_UP_REJECTED:
        return {
            ...state,
            loading: false
        }
    case types.SIGN_IN_PENDING:
      return {
        ...state,
        loading: true
      }
    case types.SIGN_IN_FULFILLED:
      return {
        ...state,
        loading: false,
        logged: true,
        user: action.payload.user,
        scope: action.payload.scope,
        token: action.payload.token
      };
    case types.SIGN_IN_REJECTED:
    case types.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
