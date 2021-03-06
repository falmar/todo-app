// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios'
import moment from 'moment'

import {getAPIUrl} from './../../utility/api'
import * as types from './../constants/todo'

const fetchPending = () => {
  return {
    type: types.TODO_FETCH_PENDING
  }
}

const fetchFulfilled = payload => {
  return {
    type: types.TODO_FETCH_FULFILLED,
    payload
  }
}

const fetchRejected = payload => {
  return {
    type: types.TODO_FETCH_REJECTED,
    payload
  }
}

export const getTodos = () => {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const {isFetching, filters} = getState().todos

    if (!isFetching) {
      const filterArray = []

      if (filters.completed !== -1) {
        filterArray.push(`completed:${filters.completed}`)
      }

      dispatch(fetchPending())
      axios.get(
                getAPIUrl('/todo/'), {
                  params: {
                    page_size: filters.pageSize,
                    current_page: filters.currentPage,
                    filters: filterArray.join(',')
                  }
                }).then(response => {
                  dispatch(fetchFulfilled({
                    ...response.data,
                    fetchedAt: moment()
                  }))
                  resolve(response)
                }).catch(err => {
                  dispatch(fetchRejected({
                    fetchedAt: moment()
                  }))
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
    const {isAddding} = getState().todos

    if (!isAddding) {
      dispatch(addTodoPending())

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

const getTodoPending = () => {
  return {
    type: types.TODO_GET_PENDING
  }
}

const getTodoFulfilled = payload => {
  return {
    type: types.TODO_GET_FULFILLED,
    payload
  }
}

const getTodoRejected = () => {
  return {
    type: types.TODO_GET_REJECTED
  }
}

export const getTodo = id => {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const {isGetting} = getState().todos

    if (!isGetting) {
      dispatch(getTodoPending())

      axios.get(
                    getAPIUrl(`/todo/${id}/`)).then(response => {
                      dispatch(getTodoFulfilled(response.data))
                      resolve(response)
                    }).catch(err => {
                      dispatch(getTodoRejected())
                      reject(err)
                    })
    } else {
      reject(new Error('is getting'))
    }
  })
}

const updateTodoPending = () => {
  return {
    type: types.TODO_UPDATE_PENDING
  }
}

const updateTodoFulfilled = payload => {
  return {
    type: types.TODO_UPDATE_FULFILLED,
    payload
  }
}

const updateTodoRejected = () => {
  return {
    type: types.TODO_UPDATE_REJECTED
  }
}

export const updateTodo = (id, todo) => {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const {isGetting} = getState().todos

    if (!isGetting) {
      dispatch(updateTodoPending())

      axios.put(
                    getAPIUrl(`/todo/${id}/`),
                    todo
                ).then(response => {
                  dispatch(updateTodoFulfilled(response.data))
                  resolve(response)
                }).catch(err => {
                  dispatch(updateTodoRejected())
                  reject(err)
                })
    } else {
      reject(new Error('is updating'))
    }
  })
}

const deleteTodoPending = () => {
  return {
    type: types.TODO_DELETE_PENDING
  }
}

const deleteTodoFulfilled = payload => {
  return {
    type: types.TODO_DELETE_FULFILLED,
    payload
  }
}

const deleteTodoRejected = () => {
  return {
    type: types.TODO_DELETE_REJECTED
  }
}

export const deleteTodo = id => {
  return (dispatch, getState) => new Promise((resolve, reject) => {
    const {isDeleting} = getState().todos

    if (!isDeleting) {
      dispatch(deleteTodoPending())

      axios.delete(
                    getAPIUrl(`/todo/${id}/`)
                ).then(response => {
                  dispatch(deleteTodoFulfilled(id))
                  resolve(response)
                }).catch(err => {
                  dispatch(deleteTodoRejected())
                  reject(err)
                })
    } else {
      reject(new Error('is updating'))
    }
  })
}

export const changePage = payload => ({
  type: types.TODO_CHANGE_PAGE,
  payload
})

export const changePageSize = payload => ({
  type: types.TODO_CHANGE_PAGE_SIZE,
  payload
})

export const changeCompleted = payload => ({
  type: types.TODO_CHANGE_COMPLETED,
  payload
})

export const reload = () => ({
  type: types.TODO_RELOAD
})
