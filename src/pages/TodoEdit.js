// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import withLoading from './../containers/WithLoading';
import * as todoActions from './../store/actions/todo';

const TodoEdit = ({completedOptions, change, submit, todo}) => {
    return (
        <div className='row align-center'>
            <div className='small-12 medium-6 large-4 column'>
                <div className='box'>
                    <div>
                        <h3>Edit Todo</h3>
                        <form onSubmit={submit}>
                            <label>
                                Title:
                                <input type='text' value={todo.title} onChange={change('title')}  />
                            </label>

                            <label>
                                Completed:
                                <select value={todo.completed} onChange={change('completed')} >
                                    {completedOptions}
                                </select>
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
        </div>
    )
}

TodoEdit.propTypes = {
    change: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    completedOptions: PropTypes.node.isRequired
}

class TodoEditContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        this.props.getTodo(
            this.props.todoId
        ).then((response) => {
            this.setState({
                title: response.data.todo.title,
                completed: response.data.todo.completed
            })
        }).catch(() => {
            // error ocurred
        })
    }

    onChange(key) {
        return event => {
            const val = event.currentTarget.value;

            this.setState({
                [key]: key === 'completed' ? val === 'true' : val
            });
        }
    }

    onSubmit(event) {
        event.preventDefault();

        // execute save todo
        this.props.updateTodo(this.props.todo.id, {
            title: this.state.title,
            completed: this.state.completed
        }).then(() => {
            this.setState({title: '', completed: false});
            browserHistory.push('/todos/');
        }).catch(() => {
            // error ocurred
        })
    }

    getCompletedOptions() {
        return [true, false].map((elm, index) => {
            return <option key={index} value={elm}>{elm ? 'Yes' : 'No'}</option>
        })
    }

    render() {
        const box = <TodoEdit key={"my_key"}
            submit={this.onSubmit}
            change={this.onChange}
            loading={this.props.loading}
            todo={{
                title: '',
                completed: false,
                ...this.props.todo,
                ...this.state
            }}
            completedOptions={this.getCompletedOptions()}/>

        return withLoading(box, this.props.loading)
    }
}

TodoEditContainer.propTypes = {
    updateTodo: PropTypes.func.isRequired,
    getTodo: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    todoId: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({todos}, ownProps) => ({
    todo: todos.current,
    todoId: parseInt(ownProps.params.id, 10),
    loading: todos.isGetting
})

const mapDispatchToProps = dispatch => ({
    updateTodo: (id, todo) => dispatch(todoActions.updateTodo(id, todo)),
    getTodo: id => dispatch(todoActions.getTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditContainer);
