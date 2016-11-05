// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {signOut} from './../store/actions/auth';
import {isActiveLink} from './../utility/misc';
import {removeAuthHeader} from './../utility/auth';

const Access = ({welcome, button}) => {
    const welcomeStyle = {
        whiteSpace: 'nowrap'
    };

    return (
        <div className='row'>
          <div className='hide-for-small-only column align-self-middle' style={welcomeStyle}>
            {welcome}
          </div>
          <div className='column'>
            <ul className='menu'>
              {button}
            </ul>
          </div>
        </div>
    )
}

Access.propTypes = {
  welcome: PropTypes.string.isRequired,
  button: PropTypes.node.isRequired
}

class AccessContainer extends Component {
  constructor(props) {
    super(props);

    this.getWelcome = this.getWelcome.bind(this);
    this.getMenu = this.getMenu.bind(this);
  }

  getWelcome() {
    const name = this.props.isLoggedIn ? this.props.name : 'Guest';

    return `Welcome, ${name}!`;
  }

  getMenu () {
      const {isLoggedIn, onLogout, currentPath} = this.props;
      const text = isLoggedIn ? 'Sign Out' : 'Sign In';
      const cb =  isLoggedIn ? () => onLogout : () => null;

      // menu / sign in / out
      return  <li className={isActiveLink(currentPath, /^\/login/) ? 'active' : ''}>
                  <Link onClick={cb()} to='/login'>{text}</Link>
              </li>
  }

  render() {
    return <Access welcome={this.getWelcome()} button={this.getMenu()} />
  }
}

AccessContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    currentPath: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

const mapStateToProps = ({auth}) => {
  return {
    isLoggedIn: auth.logged,
    name: auth.user.name
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            removeAuthHeader();
            dispatch(signOut());
            browserHistory.push('/')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessContainer);
