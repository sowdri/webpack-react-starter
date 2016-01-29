import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PrimaryFilters from './filters/PrimaryFilters';
import SecondaryFilters from './filters/SecondaryFilters';
import TertiaryFilters from './filters/TertiaryFilters';
import Dimensions from './dimensions/Dimensions';
import Metrics from './metrics/Metrics';

class StandardReportForm extends Component {

  state = {
    
  };

  render() {

    return (
      <div>
        <PrimaryFilters />
        <SecondaryFilters />
        <TertiaryFilters />
        <Dimensions />
        <Metrics />
        <br />
        <br />
        <br />
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