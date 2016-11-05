// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as messagesAction from './../store/actions/sys_message';

const SysMessages = ({messages}) => {
    return (
        <div className='row'>
            <div className='column'>
                {messages}
            </div>
        </div>
    )
};

SysMessages.propTypes = {
    messages: PropTypes.array.isRequired
}


class SysMessagesContainer extends Component {

    getMessages() {
        const getByType = type => {
            switch(type) {
                case 'ERROR':
                    return 'alert';
                default:
                    return type.toLowerCase();
            }
        }

        const onClose = title => {
            return event => {
                event.currentTarget.parentElement.classList.add('closed');

                setTimeout(() => {
                    this.props.onClose(title)
                }, 400);
            }
        }

        return this.props.messages.map((msg, index) => {
            const cn = `callout sys-message ${getByType(msg.type)}`;
            const style = {
                marginTop: index === 0 ? '5px' : ''
            }

            return (
                <div key={index} className={cn} data-closable style={style}>
                  <p>{msg.title}</p>
                  <button className='close-button' type='button' onClick={onClose(msg.title)}>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
            )
        });
    }

    render() {
        return <SysMessages messages={this.getMessages()}/>
    }
}

SysMessagesContainer.propTypes = {
    messages: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
}

const mapStateToProps = ({messages}) => {
    return {
        messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: (title) => dispatch(messagesAction.removeMessage(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SysMessagesContainer);
