// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import * as authActions from './../store/actions/auth';

const SignUp = ({disabled, change, submit, name, email, password}) => {
    const bc = `button ${disabled}`

    return (
        <div className='row align-center'>
            <div className='small-12 medium-8 large-6 column'>
                <div className='box'>
                    <form onSubmit={submit}>
                        <h3>Sign Up</h3>

                        <label>
                            Name:
                            <input type='text' onChange={change('name')} value={name} />
                        </label>

                        <label>
                            Email:
                            <input type='email' onChange={change('email')} value={email} />
                        </label>

                        <label>
                            Password:
                            <input type='password' onChange={change('password')} value={password} />
                        </label>

                        <div className='row text-center'>
                            <div className='column'>
                                <button type='submit' className={bc}>Sign Up!</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

SignUp.propTypes = {
    change: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    disabled: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

class SignUpContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(key) {
        return event => {
            this.setState({[key]: event.target.value});
        }
    }

    onSubmit(event) {
        event.preventDefault();

        // execute sign up
        this.props.signUp(this.state).then(() => {
            this.setState({name: '', email: '', password: ''});
            browserHistory.push('/login')
        }).catch(() => {
            // error ocurred
            this.setState({password: ''});
        })
    }

    render() {
        const disabled = this.props.logged ? 'disabled' : '';

        return <SignUp
            disabled={disabled}
            change={this.onChange}
            submit={this.onSubmit}
            {...this.state} />
    }
}

SignUpContainer.propTypes = {
    logged: PropTypes.bool.isRequired,
    signUp: PropTypes.func.isRequired
}

const mapStateToProps = ({auth}) => {
    return {
        logged: auth.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (body) => dispatch(authActions.signUp(body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
