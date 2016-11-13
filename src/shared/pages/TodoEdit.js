// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import withLoading from './../containers/WithLoading'
import * as todoActions from './../store/actions/todo'

import Form, {Input, Select} from './../components/Form'
const titleInput = {type: 'text', name: 'title', label: 'Title'}
const completedSelect = {name: 'completed', label: 'Completed'}

const TodoEdit = ({completed, title, loading, submit, cancel, todoId}) => {
  return (
    <div className='row align-center'>
      <div className='small-12 medium-6 large-4 column'>
        <div className='box'>
          <div>
            <Form submit={submit} loading={loading} cancel={cancel}>
              {`Edit Todo #${todoId}`}
              <Input {...title} />
              <Select {...completed} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

TodoEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  completed: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  todoId: PropTypes.number.isRequired
}

class TodoEditContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
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

  onChange (key) {
    return event => {
      const val = event.currentTarget.value

      this.setState({
        [key]: key === 'completed' ? val === 'true' : val
      })
    }
  }

  onSubmit (event) {
    event.preventDefault()

        // execute save todo
    this.props.updateTodo(this.props.todo.id, {
      title: this.state.title,
      completed: this.state.completed
    }).then(() => {
      this.setState({title: '', completed: false})
      browserHistory.push('/todos/')
    }).catch(() => {
            // error ocurred
    })
  }

  getOptions () {
    return [true, false].map((elm) => ({id: elm, value: elm ? 'Yes' : 'No'}))
  }

  onCancel () {
    browserHistory.push('/todos/')
  }

  render () {
    const {todoId, todo, loading, updating} = this.props
    const values = {title: '', completed: false, ...todo, ...this.state}

    const box = <TodoEdit
      todoId={todoId}
      cancel={this.onCancel}
      submit={this.onSubmit}
      loading={updating}
      title={{...titleInput, value: values.title, change: this.onChange}}
      completed={{
        ...completedSelect,
        value: values.completed,
        change: this.onChange,
        options: this.getOptions()
      }}
            />

    return withLoading(box, loading)
  }
}

TodoEditContainer.propTypes = {
  updateTodo: PropTypes.func.isRequired,
  getTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  todoId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired
}

const mapStateToProps = ({todos}, ownProps) => ({
  todo: todos.current,
  todoId: parseInt(ownProps.params.id, 10),
  loading: todos.isFetching,
  updating: todos.isUpdating
})

const mapDispatchToProps = dispatch => ({
  updateTodo: (id, todo) => dispatch(todoActions.updateTodo(id, todo)),
  getTodo: id => dispatch(todoActions.getTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditContainer)
