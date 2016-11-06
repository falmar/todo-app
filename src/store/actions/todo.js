// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';
import moment from 'moment';

import {getAPIUrl} from './../../utility/api';
import * as types from './../constants/todo';

const fetchPending = () => {
    return {
        type: types.TODO_FETCH_PENDING
    }
}

const fetchFulfilled = (payload) => {
    return {
        type: types.TODO_FETCH_FULFILLED,
        payload
    }
}

const fetchRejected = () => {
    return {
        type: types.TODO_FETCH_REJECTED
    }
}

export const getTodos = () => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        const {isFetching} = getState().todos;

        if(!isFetching) {
            dispatch(fetchPending());
            axios.get(
                getAPIUrl('/todo/')
            ).then(response => {
                dispatch(fetchFulfilled({
                    ...response.data,
                    fetchedAt: moment()
                }))
                resolve(response)
            }).catch(err => {
                dispatch(fetchRejected())
                reject(err)
            })
        } else {
            reject(new Error('it is fetching'))
        }
    })
}

const addTodoPending = () => {
    return {
        type: types.TODO_ADD_PENDING
    }
}

const addTodoFulfilled = payload => {
    return {
        type: types.TODO_ADD_FULFILLED,
        payload
    }
}

const addTodoRejected = () => {
    return {
        type: types.TODO_ADD_REJECTED
    }
}

export const addTodo = title => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
            const {isFetching} = getState().todos;

            if(!isFetching) {
                dispatch(addTodoPending());

                axios.post(
                    getAPIUrl('/todo/'), {
                    title,
                    completed: false
                }).then(response => {
                    dispatch(addTodoFulfilled(response.data))
                    resolve(response)
                }).catch(err => {
                    dispatch(addTodoRejected())
                    reject(err)
                })
            }
    })
}
