import React, { Component, PropTypes } from 'react'
import TodoApp from './TodoApp'
import Page1 from './Page1'
import Page2 from './Page2'
import Nested from './Nested'
import NotFound from './NotFound'

import { Router, Route, Link } from 'react-router'

export default class App extends Component {
  render() {

    return (
      <Router>
        <Route path="/" component={ TodoApp }>
          <Route path="page1" component={ Page1 } />
          <Route path="page2" component={ Page2 }>
            <Route path="/page2/nested" component={ Nested } />
          </Route>
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
      )
  }
}