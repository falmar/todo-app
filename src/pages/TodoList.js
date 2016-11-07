// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import Pagination from './../components/Pagination';
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

const TodoList = ({todos, pagination, changePageSize, pageSize, reload}) => {

    return (
        <div className='row'>
            <div className='column'>
                <div className='box'>

                    <div className='row'>
                        <div className='column'>
                            <div className='row align-justify'>
                                <div className='shrink column align-self-middle'>
                                    <Link className='button small' to='/todos/new/'><i className='fa fa-plus'/> Add TODO</Link>
                                    &nbsp;
                                    <button onClick={reload} className='button small' type='button'><i className='fa fa-refresh'/> Refresh</button>
                                </div>
                                <div className='shrink column'>
                                    <div className='row'>
                                        <div className='column'>
                                            <div className='row'>
                                                <div className='columns'>
                                                  <label htmlFor='middle-label' className='text-right middle'>PageSize:</label>
                                                </div>
                                                <div className='columns'>
                                                    <select onChange={changePageSize} value={pageSize}>
                                                        <option>1</option>
                                                        <option>5</option>
                                                        <option>15</option>
                                                        <option>30</option>
                                                        <option>50</option>
                                                    </select>
                                                </div>
                                            </div>


                                        </div>
                                        <div className='column align-self-middle' style={{whiteSpace: 'nowrap'}}>
                                            {pagination}
                                        </div>
                                    </div>
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

                                <tbody>{todos}</tbody>
                            </table>

                            <div className='row align-right'>
                                <div className='shrink column'>
                                    {pagination}
                                </div>
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
    pagination: PropTypes.node.isRequired,
    loading: PropTypes.bool.isRequired,
    pageSize: PropTypes.number.isRequired,
    changePageSize: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired
}

class TodoListContainer extends Component {
    constructor(props) {
        super(props)

        this.onChangePageSize = this.onChangePageSize.bind(this)
    }
    componentWillMount() {
        this.loadTodos()
    }

    componentDidUpdate() {
        this.loadTodos()
    }

    loadTodos() {
        const {fetchedAt, fetchError, pagination, filters, reload} = this.props;
        const loadByTime = !fetchedAt || !moment().isBefore(moment(fetchedAt).add(5, 'm'))
        const pageChanged = pagination.current_page !== filters.currentPage
        const sizeChanged = pagination.page_size !== filters.pageSize

        if (!fetchError && (loadByTime || pageChanged || sizeChanged || reload)) {
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
        const {todos, loading, fetchError} = this.props;

        if(loading) {
            return  <tr>
                        <td colSpan='6'><h3 className='text-center'>Loading...</h3></td>
                    </tr>
        }

        if(todos.length === 0 || fetchError) {
            return  <tr>
                        <td colSpan='6' className='text-center'>No rows found</td>
                    </tr>
        }

        return this.props.todos.map(todo => {
            return <Todo
                key={todo.id}
                data={todo}
                edit={this.onEdit(todo.id)}
                del={() => this.props.deleteTodo(todo.id)}
                />
        })
    }

    getPagination() {
        return <Pagination
                    pagination={this.props.pagination}
                    change={this.props.changePage}
                    />
    }

    onChangePageSize(event) {
        this.props.changePageSize(parseInt(event.target.value, 10))
    }

    render() {
        return <TodoList
                todos={this.getTodos()}
                pagination={this.getPagination()}
                loading={this.props.loading}
                changePageSize={this.onChangePageSize}
                pageSize={this.props.filters.pageSize}
                reload={this.props.reloadTodos}
                    />
    }
}

TodoListContainer.propTypes = {
    changePageSize: PropTypes.func.isRequired,
    getTodos: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    fetchedAt: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    changePage: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    reloadTodos: PropTypes.func.isRequired,
    reload: PropTypes.bool.isRequired
}

const mapStateToProps = ({todos}) => {
    return {
        loading: todos.isFetching,
        fetchedAt: todos.fetchedAt,
        todos: todos.todos,
        pagination: todos.pagination,
        filters: todos.filters,
        fetchError: todos.error,
        reload: todos.reload
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTodos: () => dispatch(todoActions.getTodos()),
        reloadTodos: () => dispatch(todoActions.reload()),
        deleteTodo: id => dispatch(todoActions.deleteTodo(id)),
        changePage: page => dispatch(todoActions.changePage(page)),
        changePageSize: size => dispatch(todoActions.changePageSize(size))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
