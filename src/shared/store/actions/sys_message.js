// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/sys_message'

export const addMessage = payload => {
  return {
    type: types.ADD_MESSAGE,
    payload
  }
}

export const removeMessage = payload => {
  return {
    type: types.REMOVE_MESSAGE,
    payload
  }
}
