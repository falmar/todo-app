// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';

import {getAPIUrl} from './../../utility/api';
import * as types from './../constants/auth';

const signInPending = () => {
  return {
    type: types.SIGN_IN_PENDING
  }
}

const signInFulfilled = (response) => {
  return {
    type: types.SIGN_IN_FULFILLED,
    payload: {
      user: response.claims.user,
      scope: response.claims.scope,
      token: response.token
    }
  }
}

const signInRejected = () => {
  return {
    type: types.SIGN_IN_REJECTED
  }
}

const signIn = (email, password) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const {auth} = getState();

      if(!auth.loading) {
        dispatch(signInPending);

        axios.post(getAPIUrl('/login/'), {
          email,
          password
        }).then(response => {
          dispatch(signInFulfilled(response.data));

          return resolve(response);
        }).catch(err => {
          dispatch(signInRejected());

          return reject(err);
        });
      }

    })
  }
}

const signOut = () => {
  return {
    type: types.SIGN_OUT
  }
}

export {signIn, signOut}
