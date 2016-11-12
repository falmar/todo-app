// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';

const basicPropsValidation = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const InlineInput = ({change, type, label, value}) => {
    return (
        <div className='row'>
            <div className='small-12 medium-3 column'>
                <label className='middle text-right'>{label}</label>
            </div>
            <div className='small-12 medium-9 column'>
                <input onChange={change} type={type} value={value} />
            </div>
        </div>
    )
}

InlineInput.propTypes = basicPropsValidation

const Input = ({change, name, type, label, value}) => {
    return (
        <label>
            {label}
            <input onChange={change(name)} type={type} value={value} />
        </label>
    )
}

Input.propTypes = basicPropsValidation

class InputContainer extends Component {
    render() {
        const {props} = this;

        return props.inline ? <InlineInput {...props} /> : <Input {...props} />
    }
}

InputContainer.propTypes = {
    ...basicPropsValidation,
    inline: PropTypes.bool
}

export default InputContainer;
