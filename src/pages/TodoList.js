// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

const Todo = ({data}) => {
    return (
        <tr>
            <td>{data.title}</td>
            <td>{data.completed}</td>
            <td>{data.created_at}</td>
            <td>{data.updated_at}</td>
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
                                    <button className='button' type='button'><i className='fa fa-plus'/> Add TODO</button>
                                </div>
                                <div className='shrink column'>
                                    {pagination}
                                </div>
                            </div>

                            <div style={{overflow: 'hidden', overflowX: 'auto'}}>
                                <table>
                                    <thead>
                                        <tr>
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
    render() {
        return (
            <TodoList
                todos={<tr />}
                pagination={<div />}
                />
        )
    }
}

TodoListContainer.propTypes = {
    todos: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
}

const mapStateToProps = () => {
    return {
        todos: [],
        pagination: {}
    }
}

export default connect(mapStateToProps)(TodoListContainer);
