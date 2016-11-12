// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';

const basicPropsValidation = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    options: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ])
}

const InlineSelect = ({change, options, label, value}) => {
    return (
        <div className='row'>
            <div className='small-12 medium-3 column'>
                <label className='middle text-right'>{label}</label>
            </div>
            <div className='small-12 medium-9 column'>
                <select onChange={change(name)} value={value}>
                    {options}
                </select>
            </div>
        </div>
    )
}

InlineSelect.propTypes = basicPropsValidation

const Select = ({change, name, options, label, value}) => {
    return (
        <label>
            {label}
            <select onChange={change(name)} value={value}>
                {options}
            </select>
        </label>
    )
}

Select.propTypes = basicPropsValidation

class SelectContainer extends Component {
    getOptions() {
        const {options} = this.props;

        return options.map((elm, index) => <option key={`${elm.value}-${index}`} value={elm.id}>{elm.value}</option>)
    }

    render() {
        const {props} = this;

        return props.inline
        ? <InlineSelect {...props} options={this.getOptions()} />
    : <Select {...props} options={this.getOptions()} />
    }
}

SelectContainer.propTypes = {
    ...basicPropsValidation,
    options: PropTypes.array.isRequired,
    inline: PropTypes.bool
}

export default SelectContainer;
