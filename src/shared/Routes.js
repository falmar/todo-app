// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// Views
import Main from './../shared/layout/Main';
import Home from './../shared/pages/Home';
import SignIn from './../shared/pages/SignIn';
import SignUp from './../shared/pages/SignUp';
import TodoList from './../shared/pages/TodoList';
import TodoNew from './../shared/pages/TodoNew';
import TodoEdit from './../shared/pages/TodoEdit';

// Container
import requireAuth from './../shared/containers/Auth';
import withRouter from './../shared/containers/WithRouter';

const Routes = () => {
    return (
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={Home}/>
                <Route path='login/' component={requireAuth(SignIn, false)}/>
                <Route path='signup/' component={requireAuth(SignUp, false)}/>

                <Route path='todos/'>
                    <IndexRoute component={requireAuth(TodoList)}/>
                    <Route path='new/' component={requireAuth(TodoNew)}/>
                    <Route path=':id/edit' component={withRouter(requireAuth(TodoEdit))}/>
                </Route>
            </Route>
        </Router>
    )
}

export default Routes;
