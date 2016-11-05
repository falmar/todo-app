// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const Access = ({welcome, button}) => {
    const welcomeStyle = {
        whiteSpace: 'nowrap'
    };

    return (
        <div className='row'>
          <div className='column align-self-middle' style={welcomeStyle}>
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
    this.getButton = this.getButton.bind(this);
  }

  getWelcome() {
    const name = this.props.isLogged ? 'User' : 'Guest';

    return `Welcome, ${name}!`;
  }

  getButton() {
      const text = this.props.isLogged ? 'Sign out' : 'Sign in';

      return <li><a>{text}</a></li>;
  }

  render() {
    return <Access welcome={this.getWelcome()} button={this.getButton()} />
  }
}

AccessContainer.propTypes = {
    isLogged: PropTypes.bool.isRequired
}

const mapStateToProps = ({auth}) => {
  return {
    isLogged: auth.logged
  }
}


export default connect(mapStateToProps)(AccessContainer);
