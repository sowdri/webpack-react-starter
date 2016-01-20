import React, { Component, PropTypes } from 'react'
import NavBar from './NavBar'

export default class PageContainer extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          { this.props.children }
        </div>
      </div>
      )
  }
}