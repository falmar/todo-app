// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';

import Pagination from './../components/Pagination';
import * as todoActions from './../store/actions/todo';

const CompletedFilter = ({change, completed}) => {
    return (
        <div className='row'>
            <div className='column'>
              <label htmlFor='middle-label' className='text-right middle'>Completed:</label>
            </div>
            <div className='column'>
                <select onChange={change} value={completed}>
                    <option value='-1'>All</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                </select>
            </div>
        </div>
    )
}

CompletedFilter.propTypes = {
    change: PropTypes.func.isRequired,
    completed: PropTypes.number.isRequired
}

const PageSizeFilter = ({change, pageSize}) => {
    return (
        <div className='row'>
            <div className='columns'>
              <label htmlFor='middle-label' className='text-right middle'>PageSize:</label>
            </div>
            <div className='columns'>
                <select onChange={change} value={pageSize}>
                    {[5, 15, 30, 50].map((val, index) => <option key={index + val} value={val}>{val}</option>)}
                </select>
            </div>
        </div>
    )
}

PageSizeFilter.propTypes = {
    change: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired
}

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

const TodoList = ({completedFilter, todos, pagination, pageSizeFilter, reload}) => {

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
                                        <div className='small-12 medium-4 large-3 column'>
                                            {completedFilter}
                                        </div>
                                        <div className='small-12 medium-4 large-3 column'>
                                            {pageSizeFilter}
                                        </div>
                                        <div className='small-12 medium-4 large-3 column align-self-middle' style={{whiteSpace: 'nowrap'}}>
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
    pageSizeFilter: PropTypes.node.isRequired,
    reload: PropTypes.func.isRequired,
    completedFilter: PropTypes.node.isRequired
}

class TodoListContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {completed: -1}
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
        const completedChanged = this.state.completed !== filters.completed

        if(completedChanged) {
            this.setState({completed: filters.completed})
        }

        if (!fetchError && (loadByTime || pageChanged || sizeChanged || reload || completedChanged)) {
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

    getCompletedFilter() {
        const change = event => this.props.changeFilter(
            parseInt(event.currentTarget.value, 10)
        )

        return <CompletedFilter
            change={change}
            completed={this.props.filters.completed}
            />
    }

    getPageSizeFilter() {
        const change = event => this.props.changePageSize(
            parseInt(event.target.value, 10)
        )


        return <PageSizeFilter
            change={change}
            pageSize={this.props.filters.pageSize}
            />
    }

    render() {
        return <TodoList
                todos={this.getTodos()}
                pagination={this.getPagination()}
                loading={this.props.loading}
                pageSize={this.props.filters.pageSize}
                reload={this.props.reloadTodos}
                completedFilter={this.getCompletedFilter()}
                pageSizeFilter={this.getPageSizeFilter()}
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
    reload: PropTypes.bool.isRequired,
    changeFilter: PropTypes.func.isRequired
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
        changePageSize: size => dispatch(todoActions.changePageSize(size)),
        changeFilter: completed => dispatch(todoActions.changeCompleted(completed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
