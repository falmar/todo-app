// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';

const Form = ({header, submit, children, cancel}) => {
    return (
        <form onSubmit={submit}>
            {header}
            {children}
            <div className='row text-center'>
                <div className='column'>
                    <button className='button' type='submit'>Submit</button>
                </div>
                {cancel}
            </div>
        </form>
    )
}

Form.propTypes = {
    header: PropTypes.node,
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.node,
    reset: PropTypes.node,
    children: PropTypes.node.isRequired
}

class FormContainer extends Component {
    getHeader() {
        const {props} = this;

        return typeof props.header === 'string' && props.header.length > 0
        ? <h3>{props.header}</h3>
        : ''
    }

    getResetButton() {
        const {props} = this;

        return props.reset instanceof Function
            ? <div className='column'>
                <button
                type='button'
                className='button warning'
                onClick={props.reset}
                >Reset</button>
            </div>
            : null
    }

    getCancelButton() {
        const {props} = this;

        return props.cancel instanceof Function
            ? <div className='column'>
                <button
                    type='button'
                    className='button secondary'
                    onClick={props.cancel}
                    >Cancel</button>
            </div>
            : null
    }


    render() {
        const {props} = this;

        return <Form
            submit={props.submit}
            cancel={this.getCancelButton()}
            reset={this.getResetButton()}
            header={this.getHeader()}
            children={props.children}
            />
    }
}

FormContainer.propTypes = {
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func,
    reset: PropTypes.func,
    children: PropTypes.node.isRequired,
    header: PropTypes.string
}

export default FormContainer;
