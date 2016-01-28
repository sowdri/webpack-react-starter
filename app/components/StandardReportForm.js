import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './filters/Filter';
import PrimaryFilters from './filters/PrimaryFilters';
import SecondaryFilters from './filters/SecondaryFilters';
import TertiaryFilters from './filters/TertiaryFilters';

class StandardReportForm extends Component {

  state = {
    
  };

  render() {

    return (
      <div>
        <PrimaryFilters />
        <SecondaryFilters />
        <TertiaryFilters />
      </div>
      )
  }
}

StandardReportForm.propTypes = {
};

StandardReportForm.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default connect(select)(StandardReportForm)