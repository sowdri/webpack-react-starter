import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import filterConfig from '../../meta/filterconfig.json';
import R from 'ramda';

class PrimaryFilters extends Component {

  state = {
    
  };

  render() {

    const dsp = R.find(R.propEq('name', 'dsp'))(filterConfig.filters);
    const dataLevel = R.find(R.propEq('name', 'data_level'))(filterConfig.filters);
    const channel = R.find(R.propEq('name', 'channel'))(filterConfig.filters);
    const campaignState = R.find(R.propEq('name', 'campaign_state'))(filterConfig.filters);

    console.log(dsp);
    console.log(dataLevel);
    console.log(channel);
    console.log(campaignState);

    return (
      <div className="row">
        <div className="col-md-3">
          <Filter {...dsp} />
        </div>
        <div className="col-md-3">
          <Filter {...dataLevel} />
        </div>
        <div className="col-md-3">
          <Filter {...channel} />
        </div>
        <div className="col-md-3">
          <Filter {...campaignState} />
        </div>
      </div>
      )
  }
}

PrimaryFilters.propTypes = {
};

PrimaryFilters.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default connect(select)(PrimaryFilters)