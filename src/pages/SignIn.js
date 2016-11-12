// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import * as authActions from './../store/actions/auth';
import {setAuthHeader} from './../utility/auth';

import Form, {Input} from './../components/Form';

const emailInput = {type: 'email', name: 'email', label: 'Email', value: ''}
const passwordInput = {type: 'password', name: 'password', label: 'Password', value: ''}

const SignIn = ({loading, submit, email, password}) => {
    return (
        <div className='row align-center'>
            <div className='small-12 medium-8 large-6 column'>
                <div className='box'>
                    <Form submit={submit} loading={loading} header='Sign In'>
                        <Input {...email} />
                        <Input {...password} />
                    </Form>
                </div>
            </div>
        </div>
    )
};

SignIn.propTypes = {
    submit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    email: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

class SignInContainer extends Component {
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

        return <SignIn
            loading={loading}
            submit={this.onSubmit}
            change={this.onChange}
            email={{
                ...emailInput, change: this.onChange, value: this.state.email
            }}
            password={{
                ...passwordInput, change: this.onChange, value: this.state.password
            }} />
    }
}

SignInContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
