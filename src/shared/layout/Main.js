// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {PropTypes} from 'react';

import TopbarContainer from './../components/Topbar';
import SysMessages from './../components/SysMessages';

const Main = (props) => {

    return (
        <div>
            <TopbarContainer {...props} />
            <SysMessages />
            {props.children}
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node
}

export default Main
