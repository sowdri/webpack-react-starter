import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class QueryFilter extends Component {

  state = {
    
  };

  render() {
    return (
      <div></div>
      )
  }
}

QueryFilter.propTypes = {
};

QueryFilter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default connect(select)(QueryFilter)