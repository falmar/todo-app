// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import * as todoActions from './../store/actions/todo'

import Form, {Input} from './../components/Form'

const titleInput = {
  label: 'Title',
  name: 'title',
  type: 'text'
}

const TodoNew = ({cancel, loading, submit, title}) => {
  return (
    <div className='row align-center'>
      <div className='small-12 medium-6 large-4 column'>
        <div className='box'>
          <Form
            loading={loading}
            submit={submit}
            cancel={cancel}
            header='New Todo'>
            <Input {...title} />
          </Form>
        </div>
      </div>
    </div>
  )
}

TodoNew.propTypes = {
  cancel: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

class TodoNewContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (key) {
    return event => {
      this.setState({[key]: event.currentTarget.value})
    }
  }

  onSubmit (event) {
    event.preventDefault()

        // execute save todo
    this.props.addTodo(
            this.state.title
        ).then(() => {
          this.setState({title: ''})
          browserHistory.push('/todos/')
        }).catch(() => {
            // error ocurred
        })
  }

  onCancel () {
    browserHistory.push('/todos/')
  }

  render () {
    return <TodoNew
      loading={this.props.loading}
      submit={this.onSubmit}
      change={this.onChange}
      cancel={this.onCancel}
      title={{
        ...titleInput,
        change: this.onChange,
        value: this.state.title
      }}
            />
  }
}

TodoNewContainer.propTypes = {
  addTodo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({todos}) => ({
  loading: todos.isAdding
})

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (title) => dispatch(todoActions.addTodo(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoNewContainer)
