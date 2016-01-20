import React, { Component, PropTypes } from 'react'
import { Router, Route, Link } from 'react-router'

class NavBar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Brand</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Page1</Link>
                </li>
                <li>
                  <Link to="/page2">Page2</Link>
                </li>
                <li>
                  <Link to="/page2/nested">Nested</Link>
                </li>
                <li>
                  <Link to="/todoapp">Todo App (Redux)</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        { this.props.children }
      </div>
      );
  }
}

export default NavBar;