// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as todoActions from './../store/actions/todo';
import moment from 'moment';

const Todo = ({data}) => {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td>{data.completed ? 'Yes' : 'No'}</td>
            <td>{moment(data.created_at).format('YYYY-MM-DD h:m')}</td>
            <td>{moment(data.updated_at).format('YYYY-MM-DD h:m')}</td>
            <td>
                <button className='button warning small' type='button'><i className='fa fa-pencil'></i></button>
                &nbsp;
                <button className='button alert small' type='button'><i className='fa fa-trash'></i></button>
            </td>
        </tr>
    )
}

Todo.propTypes = {
    data: PropTypes.object.isRequired
}

const TodoList = ({todos, pagination}) => {
    return (
        <div className='row'>
            <div className='column'>
                <div className='box'>

                    <div className='row'>
                        <div className='column'>
                            <div className='row align-justify'>
                                <div className='shrink column'>
                                    <button className='button small' type='button'><i className='fa fa-plus'/> Add TODO</button>
                                    &nbsp;
                                    <button className='button small' type='button'><i className='fa fa-refresh'/> Refresh</button>
                                </div>
                                <div className='shrink column'>
                                    {pagination}
                                </div>
                            </div>

                            <div style={{overflow: 'hidden', overflowX: 'auto'}}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th  className='text-center'>#</th>
                                            <th  className='text-center'>Title</th>
                                            <th  className='text-center'>Completed</th>
                                            <th  className='text-center show-for-medium'>Created At</th>
                                            <th  className='text-center show-for-medium'>Updated At</th>
                                            <th  className='text-center'>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todos}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

TodoList.propTypes = {
    todos: PropTypes.node.isRequired,
    pagination: PropTypes.node.isRequired
}

class TodoListContainer extends Component {

    componentDidMount() {
        this.props.getTodos().catch(() => {
            // error ocurred
        });
    }

    getTodos() {
        return this.props.todos.map(todo => {
            return <Todo key={todo.id} data={todo} />
        })
    }

    render() {
        return (
            <TodoList
                todos={this.getTodos()}
                pagination={<div />}
                />
        )
    }
}

TodoListContainer.propTypes = {
    getTodos: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
}

const mapStateToProps = ({todos}) => {
    return {
        todos: todos.todos,
        pagination: todos.pagination
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTodos: () => dispatch(todoActions.getTodos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
