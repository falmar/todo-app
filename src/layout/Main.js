// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React from 'react'

const Main = ({children}) => <div> {children} </div>

export default Main

Main.propTypes = {
    children: React.PropTypes.node
}
