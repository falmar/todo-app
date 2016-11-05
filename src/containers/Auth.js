// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export default(Comp) => {
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

            if (!isLoggedIn) {
                browserHistory.push('/login');
            }
        }

        render() {
            const {props} = this;

            if (props.isLoggedIn) {
                return <Comp {...props}>{this.children}</Comp>;
            }

            return <div/>
        }
    }

    AuthContainer.propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    }

    const mapStateToProps = ({auth}) => {
        return {isLoggedIn: auth.logged}
    }

    return connect(mapStateToProps)(AuthContainer);
}
