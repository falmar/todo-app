// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Access from './Access';

import {isActiveLink} from './../utility/misc';

const Topbar = ({menu, access}) => {
  return (
    <div className='row'>
        <div className='column'>
            <div className='topbar'>
                <div className='row align-justify'>
                    <div className='shrink column'>
                        <ul className='menu'>
                            {menu}
                        </ul>

                    </div>
                    <div className='shrink column'>
                        {access}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

Topbar.propTypes = {
    menu: PropTypes.node.isRequired,
    access: PropTypes.node.isRequired
}

class TopbarContainer extends Component {
    constructor(props) {
        super(props)

        // bind method
        this.getMenu = this.getMenu.bind(this);
        this.getMenuArray = this.getMenuArray.bind(this);
    }

    // top left menu; left to right order
    getMenuArray() {
        return [
            {
                to: '/',
                regex: /^\/$/,
                text: 'Home'
            }, {
                to: '/todos',
                regex: /^\/todos/,
                text: 'Manage TODOs'
            }
        ]
    }

    // map the MenuArray into Router Links
    // menu that match the current path add class active
    // and change its style font weigth to bold
    getMenu(currentPath) {
        return this.getMenuArray().map((menu, index) => {
            const active = isActiveLink(currentPath, menu.regex);
            const style = active
                ? {
                    fontWeight: 'bold'
                }
                : null

            return (
                <li key={index} className={active
                    ? 'active'
                    : ''} style={style}>
                    <Link to={menu.to}>{menu.text}</Link>
                </li>
            )
        });
    }


    render() {
      const {pathname} = this.props.location
      const ac = () => <Access />

        return (
            <Topbar menu={this.getMenu(pathname)} access={ac()}/>
        )
  }
}

TopbarContainer.propTypes = {
    location: PropTypes.object.isRequired
}

export default TopbarContainer;
