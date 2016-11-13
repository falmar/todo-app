// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import * as authActions from './../store/actions/auth'

import Form, {Input} from './../components/Form'

const nameInput = {type: 'text', name: 'name', label: 'Name', value: ''}
const emailInput = {type: 'email', name: 'email', label: 'Email', value: ''}
const passwordInput = {type: 'password', name: 'password', label: 'Password', value: ''}

const SignUp = ({loading, submit, name, email, password}) => {
  return (
    <div className='row align-center'>
      <div className='small-12 medium-8 large-6 column'>
        <div className='box'>
          <Form submit={submit} loading={loading} header='Sign Up'>
            <Input {...name} />
            <Input {...email} />
            <Input {...password} />
          </Form>
        </div>
      </div>
    </div>
  )
}

SignUp.propTypes = {
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

class SignUpContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (key) {
    return event => {
      this.setState({[key]: event.target.value})
    }
  }

  onSubmit (event) {
    event.preventDefault()

        // execute sign up
    this.props.signUp(this.state).then(() => {
      this.setState({name: '', email: '', password: ''})
      browserHistory.push('/login/')
    }).catch(() => {
            // error ocurred
      this.setState({password: ''})
    })
  }

  render () {
    return <SignUp
      loading={this.props.loading}
      change={this.onChange}
      submit={this.onSubmit}
      email={{...emailInput, change: this.onChange, value: this.state.email}}
      password={{...passwordInput, change: this.onChange, value: this.state.password}}
      name={{...nameInput, change: this.onChange, value: this.state.name}}
            />
  }
}

SignUpContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired
}

const mapStateToProps = ({auth}) => {
  return {
    loading: auth.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (body) => dispatch(authActions.signUp(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
