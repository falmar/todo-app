// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default(Comp, hide = true) => {
    class AuthContainer extends Component {
        constructor(props) {
            super(props);

            this.checkAuth = this.checkAuth.bind(this);
        }

        componentWillMount() {
            this.checkAuth()
        }

        componentWillUpdate() {
            this.checkAuth()
        }

        checkAuth() {
            const {isLoggedIn} = this.props;
            const {router} = this.context;

            if (!isLoggedIn && hide) {
                router.push({pathname: '/login/'});
            } else if (isLoggedIn && !hide) {
                router.push({pathname: '/'});
            }
        }

        render() {
            const {isLoggedIn} = this.props;

            if ((isLoggedIn && hide) || (!isLoggedIn && !hide)) {
                return <Comp {...this.props}>{this.children}</Comp>;
            }

            return <div/>
        }
    }

    AuthContainer.propTypes = {
        children: PropTypes.node,
        isLoggedIn: PropTypes.bool.isRequired
    }

    AuthContainer.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = ({auth}) => {
        return {isLoggedIn: auth.logged}
    }

    return connect(mapStateToProps)(AuthContainer);
}
