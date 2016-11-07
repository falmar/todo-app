// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/todo';

const initialState = {
    todos: [],
    reload: false,
    isFetching: false,
    error: false,
    isAdding: false,
    isGetting: false,
    isUpdated: false,
    fetchedAt: null,
    pagination: {
        total_results: 0,
        current_page: 1,
        pages: [],
        links: {
            next: {},
            previous: {},
            current: {}
        }
    },
    current: {},
    filters: {
        currentPage: 1,
        pageSize: 5
    }
}

const fetchReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_FETCH_PENDING:
            return {
                ...state,
                isFetching: true,
                reload: false
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
                isFetching: false,
                fetchedAt: action.payload.fetchedAt,
                error: true
            };
        default:
            return state;
    }
}

const getReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_GET_PENDING:
            return {
                ...state,
                isGetting: true,
                current: {}
            };
        case types.TODO_GET_FULFILLED:
            return {
                ...state,
                isGetting: false,
                current: action.payload.todo
            };
        case types.TODO_GET_REJECTED:
            return {
                ...state,
                isGetting: false,
                current: {}
            };
        default:
            return state;
    }
}

const addReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_ADD_PENDING:
            return {
                ...state,
                isAdding: true
            };
        case types.TODO_ADD_FULFILLED:
            return {
                ...state,
                isAdding: false,
                reload: true
            }
        case types.TODO_ADD_REJECTED:
            return {
                ...state,
                isAdding: false
            };
        default:
            return state;
    }
}

const updateReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_UPDATE_PENDING:
            return {
                ...state,
                isUpdate: true
            };
        case types.TODO_UPDATE_FULFILLED:
            return {
                ...state,
                isUpdate: false,
                todos: state.todos.map(elm => {
                    return elm.id === action.payload.todo.id ? action.payload.todo : elm
                }),
                current: state.current.id === action.payload.todo.id ? action.payload.todo : state.current
            };
        case types.TODO_UPDATE_REJECTED:
            return {
                ...state,
                isUpdate: false
            };
        default:
            return state;
    }
}

const deleteReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_DELETE_PENDING:
            return {
                ...state,
                isDeleting: true
            };
        case types.TODO_DELETE_FULFILLED:
            return {
                ...state,
                isDeleting: false,
                reload: true,
                current: state.current.id === action.payload ? {} : state.current
            };
        case types.TODO_DELETE_REJECTED:
            return {
                ...state,
                isDeleting: false
            };
        default:
            return state;
    }
}

const miscReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_RELOAD:
            return {
                ...state,
                reload: true
            }
        default:
        return state;
    }
}

const filterReducer = (state, action) => {
    switch(action.type) {
        case types.TODO_CHANGE_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case types.TODO_CHANGE_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.payload
            }
        case types.TODO_FETCH_FULFILLED:
            return {
                ...state,
                currentPage: action.payload.pagination.current_page,
                currentSize: action.payload.pagination.page_size
            }
        default:
            return state;
    }
}

export default  (state = initialState, action) => {
    let newState = state;

    [
        fetchReducer,
        getReducer,
        addReducer,
        updateReducer,
        deleteReducer,
        miscReducer
    ].forEach(reducer => {
        newState = reducer(newState, action)
    })

    return {
        ...newState,
        filters: filterReducer(newState.filters, action)
    };
}
