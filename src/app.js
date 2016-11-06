// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// store
import store from './store/store';

// Views
import Main from './layout/Main';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TodoList from './pages/TodoList';
import TodoNew from './pages/TodoNew';
import TodoEdit from './pages/TodoEdit';

// Container
import requireAuth from './containers/Auth';
import withRouter from './containers/WithRouter';

// misc
import {setAxiosInterceptors} from './utility/api';
import {checkToken} from './utility/auth';

setAxiosInterceptors(store.dispatch, axios);

const render = () => {
  ReactDOM.render(
        <Provider store={store}>
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
        </Provider>,
        document.getElementById('app')
    )
}

checkToken(store.dispatch).then(() => {
    render();
})
