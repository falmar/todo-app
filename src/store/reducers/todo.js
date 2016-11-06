// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/todo';

const initialState = {
    todos: [],
    isFetching: false,
    fetchedAt: null,
    pagination: {}
}

export default  (state = initialState, action) => {
    switch(action.type) {
        case types.TODO_FETCH_PENDING:
            return {
                ...state,
                isFetching: true
            };
        case types.TODO_FETCH_FULFILLED:
            return {
                ...state,
                isFetching: false,
                fetchedAt: action.payload.fetchedAt,
                todos: action.payload.todos,
                pagination: action.payload.pagination
            };
        case types.TODO_FETCH_REJECTED:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
}
