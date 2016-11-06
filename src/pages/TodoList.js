// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import withLoading from './../containers/WithLoading';
import * as todoActions from './../store/actions/todo';

const Todo = ({edit, del, data}) => {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td>{data.completed ? 'Yes' : 'No'}</td>
            <td className='show-for-medium'>{moment(data.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td className='show-for-medium'>{moment(data.updated_at).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>
                <button onClick={edit} className='button warning small' type='button'><i className='fa fa-pencil'></i></button>
                &nbsp;
                <button onClick={del} className='button alert small' type='button'><i className='fa fa-trash'></i></button>
            </td>
        </tr>
    )
}

Todo.propTypes = {
    data: PropTypes.object.isRequired,
    edit: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired
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
                                    <Link className='button small' to='/todos/new/'><i className='fa fa-plus'/> Add TODO</Link>
                                    &nbsp;
                                    <button className='button small' type='button'><i className='fa fa-refresh'/> Refresh</button>
                                </div>
                                <div className='shrink column'>
                                    {pagination}
                                </div>
                            </div>

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

    )
}

TodoList.propTypes = {
    todos: PropTypes.node.isRequired,
    pagination: PropTypes.node.isRequired
}

class TodoListContainer extends Component {
    componentWillMount() {
        const {fetchedAt} = this.props;

        if (!fetchedAt || !moment().isBefore(moment(fetchedAt).add(5, 'm'))) {
            this.props.getTodos().catch(() => {
                // error ocurred
            });
        }
    }

    onEdit(id) {
        return () => {
            browserHistory.push(`/todos/${id}/edit`)
        }
    }

    getTodos() {
        return this.props.todos.map(todo => {
            return <Todo
                key={todo.id}
                data={todo}
                edit={this.onEdit(todo.id)}
                del={() => this.props.deleteTodo(todo.id)}
                />
        })
    }

    render() {
        const elm = () => <TodoList
        todos={this.getTodos()}
        pagination={<div />}
            />

        return withLoading(elm, this.props.loading)
    }
}

TodoListContainer.propTypes = {
    getTodos: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    fetchedAt: PropTypes.object,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({todos}) => {
    return {
        loading: todos.isFetching,
        fetchedAt: todos.fetchedAt,
        todos: todos.todos,
        pagination: todos.pagination
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTodos: () => dispatch(todoActions.getTodos()),
        deleteTodo: id => dispatch(todoActions.deleteTodo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
