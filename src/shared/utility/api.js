// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

// return the full url by appending the path
export const getAPIUrl = (url) => `${process.env.API_URL}${url}`

import {addMessage} from './../store/actions/sys_message'

export const setAxiosInterceptors = (dispatch, axios) => {
  const checkForMessage = res => {
    if (res instanceof Object && res.data && res.data.message) {
      dispatch(addMessage(res.data.message))
    }
  }

    // Add a request interceptor
  axios.interceptors.request.use(config => {
        // Do something before request is sent
    return config
  }, error => {
        // Do something with request error
    checkForMessage(error)

    return Promise.reject(error)
  })

    // Add a response interceptor
  axios.interceptors.response.use(response => {
        // Do something with response data
    checkForMessage(response)

    return response
  }, error => {
        // Do something with response error
    checkForMessage(error)

    return Promise.reject(error)
  })
}
