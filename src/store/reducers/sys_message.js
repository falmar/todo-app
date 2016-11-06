// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import * as types from './../constants/sys_message';

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case types.ADD_MESSAGE:
            return [
                action.payload,
                ...state.filter(elm => elm.title !== action.payload.title)
            ];
        case types.REMOVE_MESSAGE:
            return state.filter(msg => msg.title !== action.payload);
        default:
            return state;
    }
}
