import React, { Component, PropTypes } from 'react'
import TodoApp from './TodoApp'
import PageContainer from './PageContainer'
import StandardReportForm from './StandardReportForm'
import Page2 from './Page2'
import Nested from './Nested'
import NotFound from './NotFound'

import { Router, Route, IndexRoute, Link } from 'react-router'
import history from '../history';

export default class App extends Component {
  render() {

    return (
      <Router history={ history }>
        <Route path="/" component={ PageContainer }>
          <IndexRoute component={ StandardReportForm } />
          <Route path="page2" component={ Page2 }>
            <Route path="/page2/nested" component={ Nested } />
          </Route>
          <Route path="todoapp" component={ TodoApp } />
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
      )
  }
}