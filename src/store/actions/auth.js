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
            } else {
                reject(new Error('it is loading'));
            }
        });
    }
}

const signOut = () => {
  return {
    type: types.SIGN_OUT
  }
}

export {signInFulfilled, signIn, signOut}

const signUpPending = () => {
    return {
        type: types.SIGN_UP_PENDING
    }
}

const signUpFulfilled = () => {
    return {
        type: types.SIGN_UP_FULFILLED
    }
}

const signUpRejected = () => {
    return {
        type: types.SIGN_UP_REJECTED
    }
}

const signUp = (body) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const {loading} = getState().auth;

            if(!loading) {
                dispatch(signUpPending());

                axios.post(
                    getAPIUrl('/user/'),
                    body
                ).then((response) => {
                    dispatch(signUpFulfilled())
                    resolve(response);
                }).catch((err) => {
                    dispatch(signUpRejected())
                    reject(err);
                })
            } else {
                reject(new Error('it is loading'));
            }
        });
    }
}

export {signUp}
