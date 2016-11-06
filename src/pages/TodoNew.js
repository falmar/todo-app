// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import * as todoActions from './../store/actions/todo';

const TodoNew = ({change, submit, title}) => {
    return (
        <div className='row align-center'>
            <div className='small-12 medium-6 large-4 column'>
                <div className='box'>
                    <h3>New Todo</h3>
                    <form onSubmit={submit}>
                        <label>
                            Title:
                            <input type='text' onChange={change('title')} value={title} />
                        </label>

                        <div className='row text-center'>
                            <div className=' column'>
                                <button className='button' type='submit'>Save</button>
                            </div>
                            <div className=' column'>
                                <Link to='/todos/' className='button secondary'>Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

TodoNew.propTypes = {
    change: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}

class TodoNewContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onChange(key) {
        return event => {
            this.setState({[key]: event.currentTarget.value});
        }
    }

    onSubmit(event) {
        event.preventDefault();

        // execute save todo
        this.props.addTodo(
            this.state.title
        ).then(() => {
            this.setState({title: ''});
            browserHistory.push('/todos/');
        }).catch(() => {
            // error ocurred
        })
    }

    render() {
        return <TodoNew
            submit={this.onSubmit}
            change={this.onChange}
            {...this.state}/>
    }
}

TodoNewContainer.propTypes = {
    addTodo: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: (title) => dispatch(todoActions.addTodo(title))
    }
}

export default connect(null, mapDispatchToProps)(TodoNewContainer);
