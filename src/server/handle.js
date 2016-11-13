// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React from 'react'
import ReactDOM from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {Routes} from './../shared/Routes'

// import store reducers
import App from './../shared/store/App'

// store middleware
const middleware = applyMiddleware(thunk, logger())

const template = (html, preloadedState) => `
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TODO App</title>
    <link rel="stylesheet" href="/css/pace.css">
    <link href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/app.min.css">
  </head>
  <body>
    <div id="app">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
    </script>
    <script src="/js/pace.min.js"></script>
    <script src="/app.min.js"></script>
  </body>
</html>
`

export default (next) => (req, res) => {
  match({routes: Routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      return res.status(500).send('opps')
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search)
    } else if (props) {
            // create store
      const store = createStore(App, middleware)
      const html = ReactDOM.renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      )

      const preloadedState = store.getState()

      return res.send(template(html, preloadedState))
    }

    return next(req, res)
  })
}
