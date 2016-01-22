import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './filters/Filter';
import PrimaryFilters from './filters/PrimaryFilters';

class StandardReportForm extends Component {

  state = {
    
  };

  render() {

    const filter = {
      "name": "campaign_state",
      "label": "Campaign State",
      "parameter": "campaign_state",
      "source": "static",
      "type": "single_select",
      "values": [
        {
          "label": "Pre-Campaign",
          "value": "pre_campaign"
        },
        {
          "label": "Mid-Campaign",
          "value": "mid_campaign"
        }
      ]
    };

    return (
      <PrimaryFilters />
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