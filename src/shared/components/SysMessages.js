// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as messagesAction from './../store/actions/sys_message';

const Message = ({cn, style, data, close}) => {
    return (
        <div className={cn} style={style}>
            <p>{data.title}</p>
            <button className='close-button' type='button' onClick={close}>
                <span aria-hidden='true'>&times;</span>
            </button>
        </div>
    )
}

Message.propTypes = {
    cn: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired
}

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
                marginTop: index === 0 ? 16 : 0
            }

            return (
                <Message
                    key={`${msg.title}-${msg.type}`}
                    cn={cn}
                    style={style}
                    data={msg}
                    close={onClose(msg.title)} />
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
