import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class MultiSelectFilter extends Component {

  state = {
    
  };

  render() {
    return (
      <div>MultiSelectFilter</div>
      )
  }
}

MultiSelectFilter.propTypes = {
};

MultiSelectFilter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default connect(select)(MultiSelectFilter)