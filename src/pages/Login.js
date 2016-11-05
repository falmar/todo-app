// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import * as authActions from './../store/actions/auth';
import {setAuthHeader} from './../utility/auth';

const Login = ({disabled, submit, change, email, password}) => {
    const cn = `button ${disabled}`;

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
                                <button type='submit' className={cn}>Submit</button>
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
    disabled: PropTypes.string.isRequired,
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

        const {email, password} = this.state;

        // execute sign in
        const prom = this.props.signIn(email, password);

        this.setState({email: '', password: ''});

        prom.then(({data}) => {
            setAuthHeader(data.token)
            browserHistory.push('/');
        }).catch(() => {
            // error ocurred
        })
    }

    render() {
        const {loading} = this.props;

        const disabled = loading ? 'disabled' : '';

        return <Login
            disabled={disabled}
            submit={this.onSubmit}
            change={this.onChange}
            {...this.state} />
    }
}

LoginContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired
}

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => dispatch(authActions.signIn(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
