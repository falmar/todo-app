// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';
import store from './../store/store';
import {signInFulfilled, signOut} from './../store/actions/auth';

import {getAPIUrl} from './api';

export const setAuthHeader = token => {
    window.localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
    window.localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = null;
};

export const checkToken = () => {
    return new Promise(resolve => {
        const {dispatch} = store;
        const token = window.localStorage.getItem('token');

        if (token === '' || token === null) {
            resolve(true)
        } else {
            axios.get(getAPIUrl('/checkToken'), {
              params: {
                token
              }
            }).then(res => {
                dispatch(signInFulfilled(res.data))
                setAuthHeader(res.data.token);
                resolve(true)
            }).catch(() => {
                dispatch(signOut())
                removeAuthHeader();
                resolve(true);
            });
        }
    });
};
