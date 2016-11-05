// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';

const Login = ({submit, change, email, password}) => {

    return (
        <div className='row align-center'>
            <div className='small-12 medium-8 large-6 column'>
                <div className='login-box'>
                    <form method='POST' onSubmit={submit}>
                        <h3 className='text-center'>Sign In</h3>

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
                                <button type='submit' className='button'>Submit</button>
                            </div>
                            <div className='column'>
                                <button type='button' className='button secondary'>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

Login.propTypes = {
    submit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

class LoginContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(key) {
        return event => {
            this.setState({[key]: event.target.value})
        }
    }

    onSubmit(event) {
        event.preventDefault();

        // execute sign in
    }

    render() {
        return <Login submit={this.onSubmit} change={this.onChange} {...this.state} />
    }
}

export default LoginContainer;
