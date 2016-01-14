import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../redux/actions'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'

import { Router, Route, Link } from 'react-router'

class TodoApp extends Component {
  render() {
    // Injected by connect() call:
    const {dispatch, visibleTodos, visibilityFilter} = this.props
    return (
      <div>
        <ul>
          <li>
            <Link to="/page1">Page1</Link>
          </li>
          <li>
            <Link to="/page2">Page2</Link>
          </li>
          <li>
            <Link to="/page2/nested">Page2 Nested</Link>
          </li>
        </ul>
        <AddTodo onAddClick={ text => dispatch(addTodo(text)) } />
        <TodoList todos={ visibleTodos } onTodoClick={ id => dispatch(completeTodo(id)) } />
        <Footer filter={ visibilityFilter } onFilterChange={ nextFilter => dispatch(setVisibilityFilter(nextFilter)) } />
        { this.props.children }
      </div>
      )
  }
}

TodoApp.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TodoApp)